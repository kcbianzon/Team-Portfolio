import { useCallback, useEffect, useLayoutEffect, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Mail, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siReact, siJavascript, siTypescript, siGsap, siThreedotjs, siHtml5, siCss, siFirebase, siMongodb, siShopify, siPostman, siPython, siOpenjdk, type SimpleIcon } from 'simple-icons';
import { CosmicCanvas } from './components/CosmicCanvas';
import { work, type Work as Project } from './components/ConstellationProjects';

gsap.registerPlugin(ScrollTrigger);

type Route = '/' | '/work' | '/about' | '/contact';
type Navigate = (path: Route, hash?: string) => void;
const routes: Route[] = ['/', '/work', '/about', '/contact'];
const featured = work.slice(0, 4);
const skills: { name: string; icon: SimpleIcon; category: string }[] = [
  { name: 'React', icon: siReact, category: 'FRONT-END' },
  { name: 'JavaScript', icon: siJavascript, category: 'FRONT-END' },
  { name: 'TypeScript', icon: siTypescript, category: 'FRONT-END' },
  { name: 'HTML5', icon: siHtml5, category: 'FRONT-END' },
  { name: 'CSS', icon: siCss, category: 'FRONT-END' },
  { name: 'GSAP', icon: siGsap, category: 'MOTION & 3D' },
  { name: 'Three.js', icon: siThreedotjs, category: 'MOTION & 3D' },
  { name: 'Firebase', icon: siFirebase, category: 'DATA & SERVICES' },
  { name: 'MongoDB', icon: siMongodb, category: 'DATA & SERVICES' },
  { name: 'Shopify', icon: siShopify, category: 'DATA & SERVICES' },
  { name: 'API integration', icon: siPostman, category: 'DATA & SERVICES' },
  { name: 'Python', icon: siPython, category: 'PROGRAMMING' },
  { name: 'Java', icon: siOpenjdk, category: 'PROGRAMMING' },
];

function RouteLink({ href, navigate, children, className, onClick, ...props }: { href: Route; navigate: Navigate; children: ReactNode; className?: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  };
  return <a href={href} className={className} {...props} onClick={handleClick}>{children}</a>;
}

function CornerIdentity({ route, navigate }: { route: Route; navigate: Navigate }) {
  return <div className="corner-identity">
    <RouteLink href="/" navigate={navigate} className="corner-monogram" aria-label="Back to Kenneth’s constellation">K<span>C</span>B<span className="identity-period">.</span></RouteLink>
    {route === '/' ? <span className="corner-caption">KENNETH CYRUS BIANZON<br />DEVELOPER / CREATIVE BUILDER</span> : <span className="corner-caption">PORTFOLIO / 2026<br />{route.slice(1).toUpperCase()}</span>}
  </div>;
}

function FieldLink({ label, kicker, x, y, href, navigate, section, navIndex }: { label: string; kicker: string; x: number; y: number; href: Route; navigate: Navigate; section?: string; navIndex: number }) {
  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href, section);
  };
  const setActive = (index: number) => window.dispatchEvent(new CustomEvent('portfolio-nav-hover', { detail: index }));
  return <a className="field-link" href={href + (section ?? '')} style={{ left: `${x}%`, top: `${y}%` }} onClick={click} onPointerEnter={() => setActive(navIndex)} onPointerLeave={() => setActive(-1)} onFocus={() => setActive(navIndex)} onBlur={() => setActive(-1)}>
    <span className="field-link-float"><i className="field-link-point" /><span className="field-link-copy"><small>{kicker}</small><strong>{label}</strong></span></span>
  </a>;
}

const fieldLinks = [
  { label: 'WORK', kicker: '01 / SELECTED', x: 27, y: 8, href: '/work' as Route },
  { label: 'EXPERIENCE', kicker: '02 / THE PATH', x: 19, y: 26, href: '/about' as Route, section: '#experience' },
  { label: 'ABOUT', kicker: '03 / THE PERSON', x: 27, y: 65, href: '/about' as Route },
  { label: 'SKILLS', kicker: '04 / THE TOOLKIT', x: 44, y: 29, href: '/about' as Route, section: '#skills' },
  { label: 'APPROACH', kicker: '05 / THE PROCESS', x: 55, y: 46, href: '/about' as Route, section: '#approach' },
  { label: 'CONTACT', kicker: '06 / SAY HELLO', x: 48, y: 76, href: '/contact' as Route },
  { label: 'BACKGROUND', kicker: '07 / THE FOUNDATION', x: 76, y: 37, href: '/about' as Route, section: '#background' },
];

function Home({ navigate }: { navigate: Navigate }) {
  return <div className="portfolio-page home-page">
    <section className="constellation-stage home-field" aria-label="Portfolio constellation">
      <div className="field-topline"><span>INDEPENDENT DIGITAL PRACTICE</span><span>DRAG YOUR EYES / SCROLL TO TRAVEL</span></div>
      <div className="field-index" aria-hidden="true">01<span>—</span>04</div>
      <nav className="field-links" aria-label="Portfolio sections">
        {fieldLinks.map((item, index) => <FieldLink key={item.label} {...item} navIndex={index} navigate={navigate} />)}
      </nav>
      <div className="field-center-mark" aria-hidden="true"><span>K</span><i /></div>
      <div className="field-bottomline"><span>FULL-STACK DEVELOPER&nbsp; · &nbsp;PHILIPPINES</span><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span></div>
      <div className="field-scrollbar" aria-hidden="true"><i /></div>
    </section>

    <section className="manifesto chapter" id="approach">
      <div className="chapter-index" data-scroll><span>01</span><i /> A LITTLE ABOUT MY WORK</div>
      <div className="manifesto-copy"><p className="manifesto-label" data-scroll>GOOD DIGITAL WORK SHOULD</p><h1 className="manifesto-title"><span data-scroll>MAKE SENSE.</span><span data-scroll>FEEL ALIVE.</span></h1>
        <p className="manifesto-aside" data-scroll>I’m Kenneth—a full-stack developer who cares about the feeling of an interface as much as the systems that make it work.</p>
      </div>
      <div className="manifesto-foot" data-scroll><span>DESIGN THINKING / FRONT-END / THE DETAILS IN BETWEEN</span><ArrowDownRight size={20} /></div>
    </section>

    <section className="case-reel" aria-label="Selected projects">
      <div className="reel-heading"><div className="chapter-index"><span>02</span><i /> SELECTED WORK</div><RouteLink href="/work" navigate={navigate} className="text-arrow">ALL PROJECTS <ArrowUpRight size={15} /></RouteLink></div>
      <div className="case-track">
        {featured.map((project, index) => <ProjectPanel key={project.title} project={project} index={index} navigate={navigate} />)}
      </div>
    </section>

    <section className="skills-chapter chapter" id="skills">
      <div className="chapter-index" data-scroll><span>03</span><i /> TOOLKIT / THINKING TOOLS</div>
      <h2 className="skills-heading" data-scroll>A few things I use<br /><span>to make things happen.</span></h2>
      <div className="skill-cloud" aria-label="Skills and technologies">{skills.map((skill) => <TechBadge key={skill.name} tech={skill} />)}</div>
      <RouteLink href="/about" navigate={navigate} className="text-arrow skills-more">MORE ABOUT MY APPROACH <ArrowUpRight size={15} /></RouteLink>
    </section>

    <section className="closing-field chapter">
      <div className="chapter-index" data-scroll><span>04</span><i /> THE NEXT GOOD THING</div>
      <div className="closing-copy" data-scroll><p>HAVE A PROJECT IN MIND?</p><RouteLink href="/contact" navigate={navigate}>LET’S MAKE<br /><span>IT REAL.</span><ArrowUpRight size={40} /></RouteLink></div>
      <Footer navigate={navigate} />
    </section>
  </div>;
}

function ProjectPanel({ project, index, navigate }: { project: Project; index: number; navigate: Navigate }) {
  const external = Boolean(project.url);
  return <article className={`case-panel case-panel-${index + 1}`}>
    <div className="case-panel-visual">
      {project.image ? <img src={`/assets/projects/${project.image}`} alt={`${project.title} interface preview`} loading="lazy" data-parallax-image /> : <div className="nextlevel-cover"><span>NEXT LEVEL</span><b>GAMING<br />& NOVELTIES</b><i>EVENTS / IMMERSIVE EXPERIENCES</i></div>}
      <span className="case-panel-number">0{index + 1} / 0{featured.length}</span><span className="case-panel-cross">↗</span>
    </div>
    <div className="case-panel-info"><div><small>{project.group} / {external ? 'LIVE WEBSITE' : 'SELECTED PROJECT'}</small><h3>{project.title}</h3><p>{project.description}</p></div>
      {external ? <a className="text-arrow" href={project.url} target="_blank" rel="noreferrer">VISIT LIVE PROJECT <ArrowUpRight size={15} /></a> : <RouteLink href="/work" navigate={navigate} className="text-arrow">EXPLORE THE PROJECT <ArrowUpRight size={15} /></RouteLink>}
    </div>
  </article>;
}

function TechBadge({ tech }: { tech: { name: string; icon: SimpleIcon; category: string } }) {
  return <span className="tech-badge" title={tech.category}>
    <span className="tech-badge-logo" style={{ color: `#${tech.icon.hex}` }} aria-hidden="true"><svg viewBox="0 0 24 24"><path d={tech.icon.path} /></svg></span>
    <span>{tech.name}</span>
  </span>;
}

const getProjectPosition = (index: number) => ({
  x: 8 + ((index * 37 + Math.floor(index / 4) * 11) % 84),
  y: 12 + ((index * 29 + Math.floor(index / 5) * 17) % 75),
});

function ProjectConstellation({ onOpen }: { onOpen: (project: Project) => void }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const cursorPreview = useRef<HTMLDivElement>(null);
  const quick = useRef<{ x?: (value: number) => void; y?: (value: number) => void }>({});
  useEffect(() => {
    const el = cursorPreview.current;
    if (!el) return;
    quick.current = { x: gsap.quickTo(el, 'x', { duration: 0.36, ease: 'power3.out' }), y: gsap.quickTo(el, 'y', { duration: 0.36, ease: 'power3.out' }) };
    return () => { gsap.killTweensOf(el); quick.current = {}; };
  }, []);
  const place = (clientX: number, clientY: number) => {
    const x = clientX > window.innerWidth - 310 ? clientX - 286 : clientX + 22;
    const y = clientY > window.innerHeight - 230 ? clientY - 211 : clientY + 22;
    quick.current.x?.(x); quick.current.y?.(y);
  };
  const follow = (event: ReactPointerEvent<HTMLDivElement>) => place(event.clientX, event.clientY);

  return <div className={`project-constellation${hovered ? ' has-hover' : ''}`} onPointerMove={follow} onPointerLeave={() => setHovered(null)}>
    <div className="work-orbit-label"><span>30</span> WORKS / BUILDS / STUDIES</div>
    <div className="project-stars" role="group" aria-label="Projects. Hover a point for a preview; activate it to see details.">
      {work.map((project, index) => {
        const pos = getProjectPosition(index);
        return <button type="button" role="listitem" key={project.title} className={`project-star${hovered === project ? ' is-active' : ''}`} style={{ left: `${pos.x}%`, top: `${pos.y}%`, '--star-delay': `${-(index % 9) * 0.38}s` } as React.CSSProperties} onPointerEnter={() => setHovered(project)} onFocus={(event) => { setHovered(project); const rect = event.currentTarget.getBoundingClientRect(); place(rect.x + rect.width / 2, rect.y + rect.height / 2); }} onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}><i /><span className="sr-only">{project.title}</span></button>;
      })}
    </div>
    <div className="project-cursor-card" ref={cursorPreview} aria-hidden="true">
      {hovered && <>
        <div className="cursor-card-image">{hovered.image ? <img src={`/assets/projects/${hovered.image}`} alt="" /> : <div className="nextlevel-cover"><span>NEXT LEVEL</span><b>GAMING<br />& NOVELTIES</b><i>EVENTS / IMMERSIVE EXPERIENCES</i></div>}</div>
        <div className="cursor-card-label"><span>{hovered.group} / PROJECT</span><ArrowUpRight size={14} /></div><strong>{hovered.title}</strong><small>CLICK TO OPEN</small>
      </>}
    </div>
    <div className="work-field-bottom"><span>HOVER A STAR&nbsp; / &nbsp;CLICK TO OPEN</span><span>30 SELECTED PIECES</span></div>
  </div>;
}

function WorkPage({ navigate }: { navigate: Navigate }) {
  const [opened, setOpened] = useState<Project | null>(null);
  useEffect(() => {
    if (!opened) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpened(null); };
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', close); };
  }, [opened]);
  return <div className="portfolio-page work-page">
    <section className="constellation-stage work-field-stage">
      <div className="subpage-return"><RouteLink href="/" navigate={navigate}><span>←</span> BACK TO THE FIELD</RouteLink><span>WORK / 30</span></div>
      <div className="work-field-title"><small>SELECTED WORK & EXPERIMENTS</small><h1>EVERY DOT<br /><span>HAS A STORY.</span></h1></div>
      <ProjectConstellation onOpen={setOpened} />
      <div className="field-bottomline"><span>PROJECTS / INTERFACES / EXPERIMENTS</span><span>SCROLL TO GO DEEPER <ArrowDown size={13} /></span></div>
    </section>
    <section className="work-stories chapter" id="stories"><div className="chapter-index" data-scroll><span>01</span><i /> A FEW STORIES FROM THE FIELD</div>
      {featured.map((project, index) => <article className="story-row" key={project.title} data-scroll><span className="story-number">0{index + 1}</span><div className="story-copy"><small>{project.group} / {project.url ? 'LIVE PROJECT' : 'SELECTED BUILD'}</small><h2>{project.title}</h2><p>{project.description}</p>{project.url ? <a href={project.url} target="_blank" rel="noreferrer" className="text-arrow">OPEN LIVE PROJECT <ArrowUpRight size={15} /></a> : <span className="story-credit">{index === 1 ? 'FREELANCE PROJECT' : 'TEAM PROJECT / CONTRIBUTION DETAILS IN PROGRESS'}</span>}</div><div className="story-image">{project.image ? <img src={`/assets/projects/${project.image}`} alt={`${project.title} project`} loading="lazy" data-parallax-image /> : <div className="nextlevel-cover"><span>NEXT LEVEL</span><b>GAMING<br />& NOVELTIES</b><i>EVENTS / IMMERSIVE EXPERIENCES</i></div>}</div></article>)}
      <RouteLink href="/contact" navigate={navigate} className="text-arrow work-end-link">HAVE A PROJECT? LET’S TALK <ArrowUpRight size={15} /></RouteLink>
    </section>
    {opened && <div className="project-modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpened(null); }}><article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={() => setOpened(null)} aria-label="Close project"><X size={21} /></button>
      <div className="modal-art">{opened.image ? <img src={`/assets/projects/${opened.image}`} alt={`${opened.title} preview`} /> : <div className="nextlevel-cover"><span>NEXT LEVEL</span><b>GAMING<br />& NOVELTIES</b><i>EVENTS / IMMERSIVE EXPERIENCES</i></div>}</div>
      <div className="modal-copy"><small>{opened.group} / {opened.url ? 'LIVE PROJECT' : 'SELECTED WORK'}</small><h2 id="modal-title">{opened.title}</h2><p>{opened.description}</p>{opened.url && <a className="text-arrow" href={opened.url} target="_blank" rel="noreferrer">VISIT LIVE PROJECT <ArrowUpRight size={15} /></a>}<span className="modal-index">PROJECT&nbsp; / &nbsp;{String(work.indexOf(opened) + 1).padStart(2, '0')}</span></div>
    </article></div>}
  </div>;
}

function AboutPage({ navigate }: { navigate: Navigate }) {
  return <div className="portfolio-page about-page">
    <section className="subpage-intro chapter" id="approach"><div className="subpage-return"><RouteLink href="/" navigate={navigate}><span>←</span> BACK TO THE FIELD</RouteLink><span>ABOUT / KENNETH</span></div><div className="about-heading"><small>ABOUT / APPROACH / THE DETAILS</small><h1>BUILT WITH<br /><span>INTENTION.</span></h1><p>I’m Kenneth Cyrus Bianzon. I like making thoughtful interfaces, then bringing them to life with code that works.</p></div><div className="about-scroll-cue">A LITTLE MORE ABOUT ME <ArrowDown size={14} /></div></section>
    <section className="about-intro-section chapter" data-scroll><div className="about-portrait"><img src="/assets/kenneth.png" alt="Portrait of Kenneth Cyrus Bianzon" /><span>KENNETH / PHILIPPINES</span></div><div className="about-statement"><small>ONE PERSON / MANY INTERESTS</small><h2>DESIGN, CODE,<br /><span>AND HOW THEY FEEL.</span></h2><p>I’m a full-stack developer with a design-minded approach. I enjoy the complete process: understanding the idea, shaping the experience, and connecting the front end to the systems behind it.</p><p>My background in ICT and computer engineering gives me a practical foundation in the way systems fit together. I’m always learning by building.</p></div></section>
    <section className="about-timeline chapter" id="experience"><div className="chapter-index" data-scroll><span>01</span><i /> EXPERIENCE / THE PATH SO FAR</div><div className="timeline-entry" data-scroll><small>MAR — APR 2026</small><div><h2>Freelance Web Developer</h2><p className="timeline-company">MAGNIFY VISION MEDIA</p><p>Developed responsive client websites and translated brand direction and business goals into usable web experiences.</p><div className="timeline-tags"><span>REACT</span><span>SHOPIFY</span><span>MONGODB</span><span>FIREBASE</span><span>API INTEGRATION</span></div></div><span className="timeline-index">01</span></div><div className="timeline-entry" data-scroll><small>2025</small><div><h2>Mechatronics Servicing NC II Trainee</h2><p className="timeline-company">TESDA</p><p>Built practical foundations in mechatronic systems, technical drawings, installation, maintenance, and troubleshooting.</p><div className="timeline-tags"><span>SYSTEMS THINKING</span><span>TECHNICAL LITERACY</span><span>TROUBLESHOOTING</span></div></div><span className="timeline-index">02</span></div></section>
    <section className="about-skills chapter" id="skills"><div className="chapter-index" data-scroll><span>02</span><i /> TOOLKIT / CRAFT</div><h2 data-scroll>I KEEP A LOT<br />OF TOOLS <span>IN REACH.</span></h2><div className="about-skill-list">{[
      ['01', 'FRONT-END'],
      ['02', 'MOTION & 3D'],
      ['03', 'DATA & SERVICES'],
      ['04', 'PROGRAMMING'],
    ].map(([index, title]) => <div className="about-skill-row" key={index} data-scroll><span>{index}</span><h3>{title}</h3><div className="about-tech-badges">{skills.filter((skill) => skill.category === title).map((skill) => <TechBadge key={skill.name} tech={skill} />)}</div><ArrowUpRight size={17} /></div>)}</div></section>
    <section className="background-note chapter" id="background"><div className="chapter-index" data-scroll><span>03</span><i /> BACKGROUND</div><p data-scroll>Curious about the space between <span>design and engineering</span>—and always building toward the next thing.</p><RouteLink href="/contact" navigate={navigate} className="text-arrow">START A CONVERSATION <ArrowUpRight size={15} /></RouteLink></section>
    <Footer navigate={navigate} />
  </div>;
}

function ContactPage({ navigate }: { navigate: Navigate }) {
  return <div className="portfolio-page contact-page"><section className="contact-stage chapter"><div className="subpage-return"><RouteLink href="/" navigate={navigate}><span>←</span> BACK TO THE FIELD</RouteLink><span>CONTACT / OPEN</span></div><div className="contact-copy" data-scroll><small>HAVE A GOOD ONE IN MIND?</small><h1>LET’S MAKE<br /><span>IT MOVE.</span></h1><p>For projects, collaborations, or a good conversation about what could be next.</p><a className="contact-email" href="mailto:kcbianzon@gmail.com">KCBIANZON@GMAIL.COM <ArrowUpRight size={24} /></a></div><div className="contact-links" data-scroll><a href="https://github.com/kcbianzon" target="_blank" rel="noreferrer"><Code2 size={15} /> GITHUB <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/kenneth-cyrus-bianzon-344a62428/" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={13} /></a><a href="/resumes/kenneth.pdf" target="_blank" rel="noreferrer">RÉSUMÉ <ArrowUpRight size={13} /></a></div><Footer navigate={navigate} /></section></div>;
}

function Footer({ navigate }: { navigate: Navigate }) {
  return <footer className="site-footer"><RouteLink href="/" navigate={navigate}>KCB<span>© {new Date().getFullYear()}</span></RouteLink><span>MADE WITH CURIOSITY / PH</span><a href="mailto:kcbianzon@gmail.com">SAY HELLO <ArrowUpRight size={12} /></a></footer>;
}

function App() {
  const [route, setRoute] = useState<Route>(() => routes.includes((window.location.pathname.replace(/\/$/, '') || '/') as Route) ? (window.location.pathname.replace(/\/$/, '') || '/') as Route : '/');
  const [scrollProgress, setScrollProgress] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useCallback<Navigate>((path, hash) => {
    const target = path + (hash ?? '');
    if (path === route) {
      if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }));
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', target);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 90);
  }, [route]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    const pop = () => { const path = window.location.pathname.replace(/\/$/, '') || '/'; setRoute(routes.includes(path as Route) ? path as Route : '/'); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('popstate', pop);
    update();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); window.removeEventListener('popstate', pop); };
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const timer = window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 160);
    return () => window.clearTimeout(timer);
  }, [route]);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', wide: '(min-width: 760px)' }, (context) => {
      const { reduceMotion, wide } = context.conditions as { reduceMotion: boolean; wide: boolean };
      if (!reduceMotion) {
        gsap.fromTo('.field-link', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', delay: 0.35 });
        gsap.fromTo('.field-center-mark', { scale: 0.55, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: 'elastic.out(1, 0.6)', delay: 0.25 });
        gsap.utils.toArray<HTMLElement>('[data-scroll]', page).forEach((element) => gsap.fromTo(element, { y: 54, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top 92%', end: 'top 58%', scrub: 0.75 } }));
        gsap.utils.toArray<HTMLElement>('[data-parallax-image]', page).forEach((image) => gsap.fromTo(image, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } }));
        const track = page.querySelector<HTMLElement>('.case-track');
        const reel = page.querySelector<HTMLElement>('.case-reel');
        if (track && reel && wide) gsap.to(track, { x: () => Math.min(0, window.innerWidth - track.scrollWidth), ease: 'none', scrollTrigger: { trigger: reel, start: 'top top', end: () => `+=${Math.max(900, track.scrollWidth - window.innerWidth)}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      } else {
        gsap.set('[data-scroll]', { clearProps: 'all' });
      }
      const pulse = page.querySelector<HTMLElement>('.field-center-mark');
      if (pulse && !reduceMotion) gsap.to(pulse, { scale: 1.06, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => mm.revert();
  }, [route]);

  return <div className={`universe route-${route.slice(1) || 'home'}`}>
    <CosmicCanvas scrollProgress={scrollProgress} />
    <CornerIdentity route={route} navigate={navigate} />
    {route !== '/' && <div className="reading-progress" aria-hidden="true"><i style={{ transform: `scaleY(${scrollProgress})` }} /></div>}
    <main className="site-main" ref={pageRef} key={route}>
      {route === '/work' ? <WorkPage navigate={navigate} /> : route === '/about' ? <AboutPage navigate={navigate} /> : route === '/contact' ? <ContactPage navigate={navigate} /> : <Home navigate={navigate} />}
    </main>
  </div>;
}

export default App;
