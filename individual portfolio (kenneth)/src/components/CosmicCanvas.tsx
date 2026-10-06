import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props { scrollProgress: number }

/** A live star map: points drift, links breathe, and the field leans into the pointer. */
export function CosmicCanvas({ scrollProgress }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const progress = useRef(scrollProgress);
  useEffect(() => { progress.current = scrollProgress; }, [scrollProgress]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-10, 10, 6, -6, 0.1, 100);
    camera.position.z = 24;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.25 : 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const field = new THREE.Group();
    scene.add(field);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 700;
    let seed = 872731;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    const starCount = mobile ? 580 : 1500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = (random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (random() - 0.5) * 32;
      starPositions[i * 3 + 2] = -12 - random() * 24;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xc8c8c8, size: 1.25, sizeAttenuation: false, transparent: true, opacity: 0.62, depthWrite: false }));
    field.add(stars);

    const count = mobile ? 70 : window.innerWidth > 1400 ? 168 : 112;
    const width = () => 12 * (window.innerWidth / Math.max(1, window.innerHeight));
    const nodes = Array.from({ length: count }, () => ({
      x: (random() - 0.5) * (width() - 1.2),
      y: (random() - 0.5) * 10.5,
      z: -2 - random() * 2,
      phase: random() * Math.PI * 2,
      // Large enough to read as motion at a glance, while keeping the map legible.
      drift: 0.34 + random() * 0.52,
    }));

    // The first seven mesh nodes are the actual navigation anchors. The DOM
    // labels are repositioned from these same nodes every frame below.
    const navLinks = Array.from(document.querySelectorAll<HTMLElement>('.field-link')).slice(0, 7);
    const navBindings = navLinks.map((element, index) => {
      const rect = element.getBoundingClientRect();
      const ratioX = (rect.left + 7.5) / Math.max(1, window.innerWidth);
      const ratioY = (rect.top + rect.height / 2) / Math.max(1, window.innerHeight);
      nodes[index].x = (ratioX - 0.5) * width();
      nodes[index].y = (0.5 - ratioY) * 12;
      return { element, index, ratioX, ratioY };
    });

    // Build a stable nearest-neighbour mesh. Only positions animate each frame.
    const edgeSet = new Set<string>();
    const edges: [number, number][] = [];
    nodes.forEach((node, index) => {
      const closest = nodes.map((other, otherIndex) => ({ otherIndex, distance: Math.hypot(node.x - other.x, node.y - other.y) }))
        .filter((entry) => entry.otherIndex !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6);
      closest.forEach(({ otherIndex }) => {
        const key = `${Math.min(index, otherIndex)}:${Math.max(index, otherIndex)}`;
        if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([index, otherIndex]); }
      });
    });

    const nodePositions = new Float32Array(count * 3);
    const nodeGeometry = new THREE.BufferGeometry();
    const nodeAttribute = new THREE.BufferAttribute(nodePositions, 3);
    nodeAttribute.setUsage(THREE.DynamicDrawUsage);
    nodeGeometry.setAttribute('position', nodeAttribute);
    const nodeMaterial = new THREE.PointsMaterial({ color: 0xe5e5e5, size: 2.8, sizeAttenuation: false, transparent: true, opacity: 0.88, depthWrite: false });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    field.add(nodePoints);

    const linePositions = new Float32Array(edges.length * 6);
    const lineGeometry = new THREE.BufferGeometry();
    const lineAttribute = new THREE.BufferAttribute(linePositions, 3);
    lineAttribute.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute('position', lineAttribute);
    const connections = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0xb5b5b5, transparent: true, opacity: 0.19, depthWrite: false }));
    field.add(connections);

    const highlightPositions = new Float32Array(edges.length * 6);
    const highlightGeometry = new THREE.BufferGeometry();
    const highlightAttribute = new THREE.BufferAttribute(highlightPositions, 3);
    highlightAttribute.setUsage(THREE.DynamicDrawUsage);
    highlightGeometry.setAttribute('position', highlightAttribute);
    highlightGeometry.setDrawRange(0, 0);
    const highlightLines = new THREE.LineSegments(highlightGeometry, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.98, depthWrite: false }));
    field.add(highlightLines);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, dragX: 0, dragY: 0, targetDragX: 0, targetDragY: 0, dragging: false, lastX: 0, lastY: 0 };
    let activeNavIndex = -1;
    const resize = () => {
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      camera.left = -6 * aspect; camera.right = 6 * aspect; camera.top = 6; camera.bottom = -6;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.25 : 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight);
      navBindings.forEach(({ index, ratioX, ratioY }) => {
        nodes[index].x = (ratioX - 0.5) * width();
        nodes[index].y = (0.5 - ratioY) * 12;
      });
    };
    const navHover = (event: Event) => { activeNavIndex = (event as CustomEvent<number>).detail; };
    const move = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * width();
      pointer.targetY = (0.5 - event.clientY / window.innerHeight) * 12;
      if (pointer.dragging && !reduced) {
        pointer.targetDragX = THREE.MathUtils.clamp(pointer.targetDragX + (event.clientX - pointer.lastX) / window.innerWidth * width(), -3.4, 3.4);
        pointer.targetDragY = THREE.MathUtils.clamp(pointer.targetDragY - (event.clientY - pointer.lastY) / window.innerHeight * 12, -2.7, 2.7);
      }
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };
    const startDrag = (event: PointerEvent) => {
      if (event.button !== 0 || (event.target instanceof Element && event.target.closest('a, button'))) return;
      pointer.dragging = true;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };
    const endDrag = () => { pointer.dragging = false; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', startDrag, { passive: true });
    window.addEventListener('pointerup', endDrag, { passive: true });
    window.addEventListener('pointercancel', endDrag, { passive: true });
    window.addEventListener('portfolio-nav-hover', navHover);

    const clock = new THREE.Clock();
    let frame = 0;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      const elapsed = clock.getElapsedTime();
      const aspectWidth = width();
      const scroll = reduced ? 0 : progress.current;
      const pointerEase = reduced ? 0 : 1;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      pointer.dragX += (pointer.targetDragX - pointer.dragX) * 0.08;
      pointer.dragY += (pointer.targetDragY - pointer.dragY) * 0.08;
      field.position.x = reduced ? 0 : pointer.dragX;
      field.position.y = reduced ? 0 : pointer.dragY;
      nodes.forEach((node, index) => {
        const ripple = Math.max(0, 1 - Math.hypot(pointer.x - node.x, pointer.y - node.y) / 9.5) * pointerEase;
        const x = node.x + Math.sin(elapsed * 0.34 + node.phase) * node.drift
          + Math.sin(elapsed * 0.19 + node.phase * 2.4) * node.drift * 0.28
          + (pointer.x - node.x) * ripple * 0.12;
        const y = node.y + Math.cos(elapsed * 0.29 + node.phase * 1.3) * node.drift
          + Math.sin(elapsed * 0.16 + node.phase * 0.7) * node.drift * 0.3
          + (pointer.y - node.y) * ripple * 0.12;
        nodePositions[index * 3] = x;
        nodePositions[index * 3 + 1] = y;
        nodePositions[index * 3 + 2] = node.z;
      });
      nodeAttribute.needsUpdate = true;
      edges.forEach(([a, b], index) => {
        const offset = index * 6;
        linePositions[offset] = nodePositions[a * 3];
        linePositions[offset + 1] = nodePositions[a * 3 + 1];
        linePositions[offset + 2] = nodePositions[a * 3 + 2];
        linePositions[offset + 3] = nodePositions[b * 3];
        linePositions[offset + 4] = nodePositions[b * 3 + 1];
        linePositions[offset + 5] = nodePositions[b * 3 + 2];
      });
      lineAttribute.needsUpdate = true;
      let glowingVertexCount = 0;
      if (activeNavIndex >= 0) {
        edges.forEach(([a, b]) => {
          if (a !== activeNavIndex && b !== activeNavIndex) return;
          const source = a === activeNavIndex ? b : a;
          const offset = glowingVertexCount * 3;
          for (let axis = 0; axis < 3; axis += 1) {
            highlightPositions[offset + axis] = nodePositions[activeNavIndex * 3 + axis];
            highlightPositions[offset + 3 + axis] = nodePositions[source * 3 + axis];
          }
          glowingVertexCount += 2;
        });
        highlightAttribute.needsUpdate = true;
      }
      highlightGeometry.setDrawRange(0, glowingVertexCount);

      field.updateMatrixWorld(true);
      Array.from(document.querySelectorAll<HTMLElement>('.field-link')).slice(0, 7).forEach((element, index) => {
        const point = new THREE.Vector3(nodePositions[index * 3], nodePositions[index * 3 + 1], nodePositions[index * 3 + 2]);
        field.localToWorld(point).project(camera);
        element.style.setProperty('left', `${(point.x * 0.5 + 0.5) * window.innerWidth - 2.5}px`, 'important');
        element.style.setProperty('top', `${(-point.y * 0.5 + 0.5) * window.innerHeight}px`, 'important');
      });
      stars.rotation.y = reduced ? 0 : pointer.x * -0.001 + elapsed * 0.004;
      field.rotation.y = reduced ? 0 : (pointer.x / Math.max(aspectWidth, 1)) * -0.11 + scroll * 0.16 + Math.sin(elapsed * 0.13) * 0.035;
      field.rotation.x = reduced ? 0 : pointer.y * 0.008 - scroll * 0.045 + Math.sin(elapsed * 0.17) * 0.018;
      field.rotation.z = reduced ? 0 : Math.sin(elapsed * 0.1) * 0.016;
      renderer.render(scene, camera);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', startDrag);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      window.removeEventListener('portfolio-nav-hover', navHover);
      starGeometry.dispose(); stars.material.dispose();
      nodeGeometry.dispose(); nodeMaterial.dispose();
      lineGeometry.dispose(); connections.material.dispose();
      highlightGeometry.dispose(); highlightLines.material.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="network-canvas" ref={mount} aria-hidden="true" />;
}

export default CosmicCanvas;
