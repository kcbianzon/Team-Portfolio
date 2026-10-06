import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';

export type Work = { title: string; group: 'Sites' | 'Mobile' | 'Web design' | 'Experiments'; image: string; description: string; index?: number; url?: string };

export const work: Work[] = [
  { title: 'Next Level Gaming & Novelties', group: 'Sites', image: '', url: 'https://nextlevelgaming-events.web.app/', description: 'An event experience website for gaming, entertainment, and interactive productions. The design pairs immersive photography, bold display type, and clear paths through the company’s experiences.' },
  { title: 'Magnify Vision Media', group: 'Sites', image: 'project1-1.png', index: 0, description: "Developed a premium corporate website for Magnify Vision Media, a digital marketing agency specializing in social media strategy, paid advertising, and brand growth. The website emphasizes modern branding, responsive design, and interactive frontend experiences while following the company's official brand identity." },
  { title: 'Bun & Bite', group: 'Sites', image: 'project2-1.png', index: 1, description: 'Bun & Bite is a modern full-stack food ordering web application built to deliver a seamless online ordering experience. The platform lets customers browse menu items, customize products, choose between delivery or pickup, securely manage their accounts, and complete online payments through an intuitive, responsive interface — backed by a scalable cloud architecture that priorizes security, performance, and maintainability.' },
  { title: 'NewDay Child Coaching', group: 'Sites', image: 'project3-1.png', index: 2, description: 'Developed a professional coaching website that presents educational resources, coaching services, and the PATHWise™ framework through a clean and conversion-focused interface.' },
  { title: 'VIBE//TIX', group: 'Sites', image: 'herosection1-1.png', index: 3, description: 'An immersive ticketing platform for curated live music. Grab your passes to the best underground and alternative shows across the globe.' },
  { title: 'AIRE Digital', group: 'Sites', image: 'webdesign1-1.png', index: 4, description: 'Developed a modern B2B lead generation and digital business services website for AIRE Digital, specializing in lead generation, prospect research, data enrichment, and business development solutions. The website focuses on professional service presentation, clear conversion paths, and a clean, international business-oriented design.' },
  { title: 'Buy-Coffe', group: 'Sites', image: 'project4-1.png', description: 'Buy-Coffe is a creator-support landing page inspired by the “buy me a coffee” model, designed for the Analyze concept to help creators share their work, invite community support, and turn appreciation into recurring encouragement. The design focuses on storytelling, social proof, and a low-friction path for supporters to contribute.' },
  { title: 'e-Sweets', group: 'Sites', image: 'website6-1.png', description: 'An elegant e-commerce platform for a boutique bakery. Customers can seamlessly browse a curated selection of freshly prepared cakes and pastries, or easily request custom orders for special celebrations.' },
  { title: 'Novara Real Estate', group: 'Sites', image: 'project5-1.png', description: 'A better place to belong. Novara Real Estates is a modern full-stack real estate web application designed for discovering, searching, and managing residential and luxury properties. The platform allows users to browse listings, apply advanced filters, view detailed property information, save favorites, contact agents, explore property locations, and calculate estimated mortgage payments through a responsive and intuitive interface.' },
  { title: 'FlowDesk', group: 'Sites', image: 'project6-1.png', description: 'A focused SaaS landing page for an all-in-one small-business workspace. It clearly presents tools for sales, inventory, expenses, customers, reporting, and team management, supported by product previews, pricing, and conversion-focused calls to action.' },
  { title: 'Signalcraft', group: 'Sites', image: 'project7-1.png', description: 'A bold B2B landing page for a decision-intelligence platform that turns scattered research into clear, collaborative next steps. The narrative guides visitors through signal discovery, workflow orchestration, review, security, and real-world use cases.' },

  { title: 'PathWise Mobile Project', group: 'Mobile', image: 'mobiledesign1-1.png', description: 'Designed a comprehensive mobile application emphasizing usability, accessibility, and scalable UI components.' },
  { title: 'Everpeak Mobile Project', group: 'Mobile', image: 'mobiledesign2-1.png', description: 'Designed a comprehensive mobile application emphasizing usability, accessibility, and scalable UI components.' },
  { title: 'Empty Mobile Project', group: 'Mobile', image: 'mobiledesign3-1.png', description: 'Designed a comprehensive mobile application emphasizing usability, accessibility, and scalable UI components.' },
  { title: 'Rooma AI', group: 'Mobile', image: 'rooma-ai-mobile-app.png', description: 'Designed an AI-powered interior-design companion that helps people turn inspiration into livable spaces through guided tools, room photography, and personalized visual ideas.' },

  { title: 'Where to Know', group: 'Web design', image: 'webdesign1-1.png', description: 'Designed a business intelligence dashboard for hotel monthly reporting and competitive analysis, transforming complex data into clear and actionable visual reports.' },
  { title: 'Cyclo', group: 'Web design', image: 'webdesign2-1.png', description: 'Designed a modern, premium e-commerce landing page for an electric bike brand. The layout focuses on high-impact product imagery, clean typography, and a seamless shopping experience to effectively highlight the bike’s engineering and specifications.' },
  { title: 'Fusion', group: 'Web design', image: 'fusion-fashion-web-design.png', description: 'Designed an editorial fashion storefront for Fusion, balancing expressive campaign imagery with a clear path to browse products, discover collections, and shop everyday essentials.' },
  { title: 'Smila', group: 'Web design', image: 'smila-skincare-web-design.png', description: 'Created a premium skincare experience for Smila that turns a beauty routine into a calm, confident journey through products, rituals, and ingredient-led storytelling.' },
  { title: 'Roocn', group: 'Web design', image: 'roocn-roofing-web-design.png', description: 'Designed a trustworthy roofing-services website for Roocn, combining proof-led messaging, service clarity, and strong local calls to action for homeowners and commercial customers.' },

  { title: 'Cognita AI', group: 'Experiments', image: 'herosection1-1.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Sonix Audio', group: 'Experiments', image: 'herosection2-1.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Workli', group: 'Experiments', image: 'herosection3-1.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Aerix', group: 'Experiments', image: 'herosection4-1.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Velor', group: 'Experiments', image: 'herosection5-1.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Outride', group: 'Experiments', image: 'herosection6.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Payora', group: 'Experiments', image: 'herosection7.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Nexride', group: 'Experiments', image: 'herosection8.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Industera', group: 'Experiments', image: 'herosection9.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
  { title: 'Signet', group: 'Experiments', image: 'herosection10.png', description: 'A set of standalone hero section explorations across different industries and moods. Tap any tile to view the full design.' },
];

const filters = ['All', 'Sites', 'Mobile', 'Web design', 'Experiments'] as const;
const coords = [
  [16, 20], [34, 13], [56, 24], [81, 17], [22, 48], [44, 42], [70, 47], [90, 38], [11, 76], [34, 71], [57, 79], [80, 69], [96, 83], [4, 40], [28, 30], [49, 60], [72, 22], [91, 56], [15, 60], [40, 31], [63, 65], [85, 29], [7, 88], [27, 85], [49, 91], [66, 9], [88, 94], [97, 12], [55, 50],
];

export function ConstellationProjects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [hovered, setHovered] = useState<Work | null>(null);
  const [opened, setOpened] = useState<Work | null>(null);
  const cursorPreview = useRef<HTMLDivElement>(null);
  const movePreview = useRef<((value: number) => void)[]>([]);
  const visible = useMemo(() => filter === 'All' ? work : work.filter((project) => project.group === filter), [filter]);

  useEffect(() => {
    const card = cursorPreview.current;
    if (!card) return;
    movePreview.current = [gsap.quickTo(card, 'x', { duration: 0.34, ease: 'power3.out' }), gsap.quickTo(card, 'y', { duration: 0.34, ease: 'power3.out' })];
    return () => { gsap.killTweensOf(card); movePreview.current = []; };
  }, []);

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const offsetX = event.clientX > window.innerWidth - 310 ? -286 : 24;
    const offsetY = event.clientY > window.innerHeight - 220 ? -202 : 22;
    movePreview.current[0]?.(event.clientX + offsetX);
    movePreview.current[1]?.(event.clientY + offsetY);
  };

  useEffect(() => {
    if (!opened) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpened(null); };
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('keydown', close);
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  const focusProject = (project: Work, target?: HTMLButtonElement) => {
    setHovered(project);
    if (target) {
      const bounds = target.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const offsetX = x > window.innerWidth - 310 ? -286 : 24;
      const offsetY = y > window.innerHeight - 220 ? -202 : 22;
      movePreview.current[0]?.(x + offsetX);
      movePreview.current[1]?.(y + offsetY);
    }
  };

  return <div className="constellation-wrap">
    <div className="constellation-topline"><p>29 PROJECTS, ONE CURIOUS MIND.</p><span>HOVER A POINT TO PREVIEW&nbsp; / &nbsp;CLICK TO OPEN <i /></span></div>
    <div className="sky-map" onPointerMove={trackPointer} onPointerLeave={() => setHovered(null)}>
      <div className="sky-nebula" aria-hidden="true" />
      <svg className="sky-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {visible.map((project, index) => {
          const a = coords[work.indexOf(project)];
          const b = coords[work.indexOf(visible[(index + 1) % visible.length])];
          return <line key={`${project.title}-line`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={hovered === project ? 'line-lit' : ''} />;
        })}
        {hovered && visible.filter((item) => item !== hovered).slice(0, 3).map((item) => {
          const a = coords[work.indexOf(hovered)]; const b = coords[work.indexOf(item)];
          return <line key={`${item.title}-tether`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="line-tether" />;
        })}
      </svg>
      {visible.map((project) => {
        const index = work.indexOf(project); const [x, y] = coords[index]; const selected = hovered?.title === project.title;
        return <button key={project.title} type="button" className={`star-point ${selected ? 'star-point-active' : ''}`} style={{ left: `${x}%`, top: `${y}%`, '--star-delay': `${(index % 7) * -0.45}s` } as CSSProperties} onMouseEnter={() => focusProject(project)} onFocus={(event) => focusProject(project, event.currentTarget)} onClick={() => { focusProject(project); setOpened(project); }} aria-label={`Explore ${project.title}`}>
          <span className="star-aura" /><span className="star-core" /><span className="star-name">{project.title}</span>
        </button>;
      })}
      <div ref={cursorPreview} className={`project-cursor-preview${hovered ? ' is-visible' : ''}`} aria-hidden="true">
        {hovered && <><div className="cursor-preview-image"><img src={`/assets/projects/${hovered.image}`} alt="" /></div><div className="cursor-preview-meta"><span>{hovered.group}</span><ArrowUpRight size={14} /></div><strong>{hovered.title}</strong><small>CLICK TO EXPLORE</small></>}
      </div>
      <div className="sky-coordinates">α 19h 42m &nbsp; / &nbsp; δ +12° 18′</div>
      <div className="sky-count">{String(visible.length).padStart(2, '0')} / {String(work.length).padStart(2, '0')}</div>
    </div>
    <div className="project-filters" role="group" aria-label="Filter projects">{filters.map((name) => <button type="button" key={name} onClick={() => { setFilter(name); setHovered(null); }} className={filter === name ? 'filter-active' : ''}>{name}<span>{name === 'All' ? work.length : work.filter((project) => project.group === name).length}</span></button>)}</div>
    {opened && <div className="work-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpened(null); }}>
      <article className="work-dialog" data-native-scroll role="dialog" aria-modal="true" aria-labelledby="work-dialog-title">
        <button type="button" className="dialog-close" onClick={() => setOpened(null)} aria-label="Close project"><X size={20} /></button>
        <div className="dialog-visual"><img src={`/assets/projects/${opened.image}`} alt={`${opened.title} project preview`} /></div>
        <div className="dialog-copy"><span className="preview-type">{opened.group} <i /> KENNETH BIANZON</span><h2 id="work-dialog-title">{opened.title}</h2><p>{opened.description}</p><span className="dialog-number">PROJECT&nbsp; / &nbsp;{String(work.indexOf(opened) + 1).padStart(2, '0')}</span></div>
      </article>
    </div>}
  </div>;
}

export default ConstellationProjects;
