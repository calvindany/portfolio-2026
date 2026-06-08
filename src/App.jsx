import { useState, useEffect, useRef } from "react";
import data from "./data/portfolio.json";

// ─── Devicon URL helper ────────────────────────────────────────────────────────
// Maps skill/stack keys (lowercase) to devicons slugs + color variant
const ICON_MAP = {
  javascript: { slug: "javascript", variant: "plain", label: "JavaScript" },
  typescript: { slug: "typescript", variant: "plain", label: "TypeScript" },
  go: { slug: "go", variant: "original", label: "Go" },
  python: { slug: "python", variant: "plain", label: "Python" },
  php: { slug: "php", variant: "original", label: "PHP" },
  bash: { slug: "bash", variant: "plain", label: "Bash" },
  sql: { slug: "mysql", variant: "plain", label: "SQL" },
  nodejs: { slug: "nodejs", variant: "plain-wordmark", label: "Node.js" },
  express: { slug: "express", variant: "original", label: "Express" },
  nestjs: { slug: "nestjs", variant: "original", label: "NestJS" },
  fastify: { slug: "fastify", variant: "plain", label: "Fastify" },
  laravel: { slug: "laravel", variant: "original", label: "Laravel" },
  react: { slug: "react", variant: "original", label: "React" },
  nextjs: { slug: "nextjs", variant: "plain", label: "Next.js" },
  tailwindcss: { slug: "tailwindcss", variant: "original", label: "Tailwind" },
  postgresql: { slug: "postgresql", variant: "plain", label: "PostgreSQL" },
  mysql: { slug: "mysql", variant: "original", label: "MySQL" },
  mongodb: { slug: "mongodb", variant: "plain", label: "MongoDB" },
  redis: { slug: "redis", variant: "plain", label: "Redis" },
  docker: { slug: "docker", variant: "plain", label: "Docker" },
  nginx: { slug: "nginx", variant: "original", label: "Nginx" },
  githubactions: { slug: "githubactions", variant: "plain", label: "GH Actions" },
  aws: { slug: "amazonwebservices", variant: "plain-wordmark", label: "AWS" },
  vercel: { slug: "vercel", variant: "original", label: "Vercel" },
  git: { slug: "git", variant: "plain", label: "Git" },
  postman: { slug: "postman", variant: "plain", label: "Postman" },
  prisma: { slug: "prisma", variant: "original", label: "Prisma" },
  dotnet: { slug: "dotnetcore", variant: "plain", label: ".NET" },
  flutter: { slug: "flutter", variant: "plain", label: "Flutter" },
  vue: { slug: "vuejs", variant: "plain", label: "Vue.js" },
  gcp: { slug: "googlecloud", variant: "plain", label: "GCP" },
  html: { slug: "html5", variant: "plain", label: "HTML" },
  css: { slug: "css3", variant: "plain", label: "CSS" },
  gitlabci: { slug: "gitlab", variant: "original", label: "GitLab CI" },
  googlecloud: { slug: "googlecloud", variant: "original", label: "Google Cloud" },
  pm2: { slug: "pm2", variant: "original", label: "PM2" },
  microsoftsqlserver: { slug: "microsoftsqlserver", variant: "original", label: "Microsoft SQL Server" },
  proxmox: { slug: "proxmox", variant: "original", label: "Proxmox" },
  java: { slug: "java", variant: "plain", label: "Java" },
  windows8: { slug: "windows8", variant: "original", label: "Windows Server" },
  ubuntu: { slug: "ubuntu", variant: "original", label: "Ubuntu" },
  cloudflare: { slug: "cloudflare", variant: "original", label: "Cloudflare" },
  codeigniter: { slug: "codeigniter", variant: "plain", label: "Codeigniter" },
  bootstrap: { slug: "bootstrap", variant: "original", label: "Bootstrap" },
  motoko: { slug: "motoko", variant: "original", label: "Motoko" },
  icp: { slug: "bootstrap", variant: "original", label: "ICP (Internet Computer)" },
};

function TechIcon({ name, size = 32, showLabel = false }) {
  const [errored, setErrored] = useState(false);
  const info = ICON_MAP[name.toLowerCase()];
  if (!info) return (
    <span className="tech-fallback" style={{ fontSize: size * 0.4 }}>{name}</span>
  );
  const src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${info.slug}/${info.slug}-${info.variant}.svg`;
  return (
    <span className="tech-icon-wrap" title={info.label}>
      {!errored ? (
        <img
          src={src}
          alt={info.label}
          width={size}
          height={size}
          className="tech-icon-img"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="tech-fallback" style={{ fontSize: size * 0.38 }}>{info.label}</span>
      )}
      {showLabel && <span className="tech-label">{info.label}</span>}
    </span>
  );
}

// ─── Inline SVG icons ──────────────────────────────────────────────────────────
const IconNginx = () => (
  <svg viewBox="0 0 128 128">
    <path d="M24.5 50.5c-1.5 0-2.5 1.2-2.5 2.7v14.1l-15.9-16c-.8-.8-2.2-1-3.2-.6S1 52.1 1 53.2v20.7c0 1.5 1.5 2.7 3 2.7s3-1.2 3-2.7V59.8l16.1 16c.5.5 1.2.8 1.9.8.3 0 .4-.1.7-.2 1-.4 1.3-1.4 1.3-2.5V53.3c0-1.5-1-2.8-2.5-2.8zm19.7 11.8c-1.4 0-2.7 1.4-2.7 2.8s1.3 2.8 2.7 2.8l6.6.4-1.5 3.7h-8.5l-4.2-7.9 4.3-8.1H50l2.1 4h5.5L54 52.1l-.8-1.1H37.6l-.7 1.2L31 62.5l-.7 1.3.7 1.3 5.8 10.3.8 1.6h15.1l.7-1.7 4.3-9 1.9-4.3h-4.4l-11 .3zM65 50.5c-1.4 0-3 1.3-3 2.7V60h6v-6.7c0-1.5-1.6-2.8-3-2.8zm30.4.3c-1-.4-2.4-.2-3.1.6L76 67.4V53.3c0-1.5-1-2.7-2.5-2.7S71 51.8 71 53.3V74c0 1.1.7 2.1 1.7 2.5.3.1.7.2 1 .2.7 0 1.6-.3 2.1-.8l16.2-16V74c0 1.5 1 2.7 2.5 2.7S97 75.5 97 74V53.3c0-1.1-.6-2.1-1.6-2.5zm21.8 12.8l8.4-8.4c1.1-1.1 1.1-2.8 0-3.8-1.1-1.1-2.8-1.1-3.8 0l-8.4 8.4-8.4-8.4c-1.1-1.1-2.8-1.1-3.8 0-1.1 1.1-1.1 2.8 0 3.8l8.4 8.4-8.4 8.4c-1.1 1.1-1.1 2.8 0 3.8.5.5 1.2.8 1.9.8s1.4-.3 1.9-.8l8.4-8.4 8.4 8.4c.5.5 1.2.8 1.9.8s1.4-.3 1.9-.8c1.1-1.1 1.1-2.8 0-3.8l-8.4-8.4zM62 73.9c0 1.4 1.5 2.7 3 2.7 1.4 0 3-1.3 3-2.7V62h-6v11.9z" fill="#090"></path>
  </svg>
);

const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconBriefcase = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const IconImage = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// ─── Typewriter ───────────────────────────────────────────────────────────────
function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => { setDisplayed(text.slice(0, ++i)); if (i >= text.length) clearInterval(iv); }, 40);
    return () => clearInterval(iv);
  }, [started, text]);
  return <span>{displayed}{displayed.length < text.length && <span className="cursor-blink">▌</span>}</span>;
}

// ─── Section fade-in ──────────────────────────────────────────────────────────
function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`section-fade ${visible ? "visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["experience", "projects", "skills", "contact"];
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo"><span className="accent">&gt;_</span> {data.personal.name.split(" ")[0].toLowerCase()}</span>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map(l => <button key={l} onClick={() => scrollTo(l)} className="nav-link">{l}</button>)}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { personal } = data;
  return (
    <section className="hero">
      <div className="hero-bg">{Array.from({ length: 20 }).map((_, i) => <div key={i} className="grid-line" style={{ "--i": i }} />)}</div>
      <div className="container hero-content">
        <p className="hero-label"><span className="dot" /> Available for work</p>
        <h1 className="hero-name"><TypewriterText text={personal.name} delay={200} /></h1>
        <h2 className="hero-title"><TypewriterText text={personal.title} delay={800} /></h2>
        <p className="hero-tagline">{personal.tagline}</p>
        <p className="hero-bio">{personal.bio}</p>
        <div className="hero-meta">
          <span><IconPin /> {personal.location}</span>
          <span><IconMail /> {personal.email}</span>
        </div>
        <div className="hero-cta">
          <a href={personal.github} target="_blank" rel="noreferrer" className="btn btn-outline"><IconGithub /> GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><IconLinkedin /> LinkedIn</a>
          <button className="btn btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>View Projects</button>
        </div>
      </div>
      <div className="scroll-indicator"><div className="scroll-line" /></div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <Section id="experience">
      <div className="container">
        <h2 className="section-title"><span className="accent">01.</span> Experience</h2>
        <div className="timeline">
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="timeline-item" style={{ "--delay": `${i * 100}ms` }}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                {Array.isArray(exp.description) ? (
                  <ul className="exp-desc-list">
                    {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                ) : (
                  <p className="exp-desc">{exp.description}</p>
                )}
                {exp.stack.length > 0 && (
                  <div className="exp-stack">
                    {exp.stack.map(s => <TechIcon key={s} name={s} size={22} showLabel={false} />)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [active, setActive] = useState(null);

  return (
    <Section id="projects">
      <div className="container">
        <h2 className="section-title"><span className="accent">02.</span> Projects</h2>
        <div className="projects-grid">
          {data.projects.map((p, i) => (
            <div
              key={p.id}
              className={`project-card ${active === p.id ? "expanded" : ""}`}
              style={{ "--delay": `${i * 80}ms` }}
            >
              {/* Thumbnail */}
              <div className="project-thumb" onClick={() => setActive(active === p.id ? null : p.id)}>
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={`${p.name} screenshot`} className="thumb-img" />
                ) : (
                  <div className="thumb-placeholder">
                    <IconImage />
                    <span>Screenshot not available</span>
                  </div>
                )}
                <div className="thumb-overlay">
                  <span className="thumb-cta">{active === p.id ? "Close ↑" : "Details ↓"}</span>
                </div>
              </div>

              {/* Main info */}
              <div className="project-body">
                <div className="project-top">
                  <span className="project-highlight">{p.highlight}</span>
                  <div className="project-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="icon-link" title="GitHub">
                        <IconGithub />
                      </a>
                    )}
                    {p.production && (
                      <a href={p.production} target="_blank" rel="noreferrer" className="icon-link" title="Live Demo">
                        <IconExternalLink />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.description}</p>

                {/* Tech icons */}
                <div className="project-stack">
                  {p.stack.map(s => (
                    <TechIcon key={s} name={s} size={28} showLabel={false} />
                  ))}
                </div>
              </div>

              {/* Expanded: my role */}
              {active === p.id && (
                <div className="project-role-panel">
                  <p className="role-label"><IconBriefcase /> My Role</p>
                  <p className="role-text">{p.myRole}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const categories = [
    { label: "Languages", key: "languages" },
    { label: "Backend", key: "backend" },
    { label: "Frontend", key: "frontend" },
    { label: "Databases", key: "databases" },
    { label: "DevOps", key: "devops" },
    { label: "Tools", key: "tools" },
  ];
  return (
    <Section id="skills">
      <div className="container">
        <h2 className="section-title"><span className="accent">03.</span> Skills</h2>
        <div className="skills-grid">
          {categories.map(({ label, key }) => (
            <div key={key} className="skill-group">
              <h3 className="skill-category">{label}</h3>
              <div className="skill-icons">
                {data.skills[key].map(s => (
                  <TechIcon key={s} name={s} size={36} showLabel={true} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { personal } = data;
  return (
    <Section id="contact">
      <div className="container contact-inner">
        <h2 className="section-title" style={{ justifyContent: "center" }}><span className="accent">04.</span> Contact</h2>
        <p className="contact-sub">Let's build something great together.</p>
        <a href={`mailto:${personal.email}`} className="contact-email">{personal.email}</a>
        <div className="contact-links">
          <a href={personal.github} target="_blank" rel="noreferrer" className="btn btn-outline"><IconGithub /> GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><IconLinkedin /> LinkedIn</a>
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>Built by {data.personal.name} · <span className="accent">{new Date().getFullYear()}</span></p>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{css}</style>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c10;
    --surface: #0d1117;
    --surface2: #161b22;
    --border: #21262d;
    --accent: #00ff88;
    --accent2: #00c4ff;
    --text: #e6edf3;
    --muted: #768390;
    --font-mono: 'JetBrains Mono', monospace;
    --font-display: 'Syne', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-mono); line-height: 1.7; overflow-x: hidden; }
  .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
  .accent { color: var(--accent); }

  /* Nav */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 32px; transition: all .3s ease; }
  .nav-scrolled { background: rgba(8,12,16,.88); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 14px 32px; }
  .nav-inner { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: var(--font-mono); font-size: .9rem; font-weight: 700; letter-spacing: .05em; }
  .nav-links { display: flex; gap: 32px; }
  .nav-link { background: none; border: none; color: var(--muted); font-family: var(--font-mono); font-size: .78rem; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; transition: color .2s; }
  .nav-link:hover { color: var(--accent); }
  .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); transition: .3s; }
  @media (max-width: 600px) {
    .hamburger { display: flex; }
    .nav-links { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border); padding: 20px 32px; gap: 16px; }
    .nav-links.open { display: flex; }
  }

  /* Hero */
  .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 120px 0 80px; }
  .hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .grid-line { position: absolute; top: 0; bottom: 0; left: calc(var(--i) * 5%); width: 1px; background: linear-gradient(to bottom, transparent, rgba(0,255,136,.04), transparent); }
  .hero-content { position: relative; z-index: 1; }
  .hero-label { display: flex; align-items: center; gap: 8px; font-size: .75rem; color: var(--accent); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 24px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
  .hero-name { font-family: var(--font-display); font-size: clamp(2.5rem, 8vw, 5.5rem); font-weight: 800; line-height: 1.05; margin-bottom: 12px; background: linear-gradient(135deg, #fff 60%, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-title { font-family: var(--font-mono); font-size: clamp(1rem, 3vw, 1.5rem); font-weight: 500; color: var(--accent2); margin-bottom: 20px; min-height: 1.8em; }
  .hero-tagline { font-size: .9rem; color: var(--muted); font-style: italic; margin-bottom: 20px; }
  .hero-bio { max-width: 580px; color: #aab; font-size: .88rem; line-height: 1.8; margin-bottom: 24px; }
  .hero-meta { display: flex; gap: 24px; flex-wrap: wrap; color: var(--muted); font-size: .78rem; margin-bottom: 36px; }
  .hero-meta span { display: flex; align-items: center; gap: 6px; }
  .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
  .cursor-blink { animation: blink .8s step-end infinite; color: var(--accent); }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
  .scroll-indicator { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); }
  .scroll-line { width: 1px; height: 60px; background: linear-gradient(to bottom, var(--accent), transparent); animation: scrollDown 2s ease-in-out infinite; }
  @keyframes scrollDown { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform: scaleY(1); transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

  /* Buttons */
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 4px; font-family: var(--font-mono); font-size: .8rem; font-weight: 500; letter-spacing: .05em; cursor: pointer; transition: all .2s; text-decoration: none; border: none; }
  .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); box-shadow: 0 0 16px rgba(0,255,136,.15); }
  .btn-primary { background: var(--accent); color: #000; font-weight: 700; }
  .btn-primary:hover { background: #00e07a; box-shadow: 0 0 20px rgba(0,255,136,.4); }

  /* Sections */
  .section-fade { opacity: 0; transform: translateY(30px); transition: opacity .6s ease, transform .6s ease; padding: 100px 0; }
  .section-fade.visible { opacity: 1; transform: none; }
  .section-title { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; margin-bottom: 48px; display: flex; align-items: center; gap: 12px; }
  .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 260px; }

  /* Timeline */
  .timeline { position: relative; padding-left: 32px; }
  .timeline::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--accent), var(--border)); }
  .timeline-item { position: relative; margin-bottom: 32px; }
  .timeline-dot { position: absolute; left: -28px; top: 20px; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); border: 2px solid var(--bg); }
  .timeline-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 24px; transition: border-color .2s, box-shadow .2s; }
  .timeline-card:hover { border-color: rgba(0,255,136,.3); box-shadow: 0 0 24px rgba(0,255,136,.06); }
  .timeline-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .exp-role { font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; }
  .exp-company { color: var(--accent); font-size: .82rem; margin-top: 2px; }
  .exp-period { font-size: .75rem; color: var(--muted); white-space: nowrap; }
  .exp-desc { font-size: .83rem; color: #aab; margin-bottom: 14px; line-height: 1.7; }
  .exp-desc-list { font-size: .83rem; color: #aab; margin-bottom: 14px; line-height: 1.8; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .exp-desc-list li { display: flex; gap: 8px; }
  .exp-desc-list li::before { content: '›'; color: var(--accent); flex-shrink: 0; font-weight: 700; }
  .exp-stack { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 12px; }
  .tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-size: .72rem; padding: 3px 10px; border-radius: 3px; background: rgba(0,196,255,.07); color: var(--accent2); border: 1px solid rgba(0,196,255,.15); letter-spacing: .04em; }

  /* Projects */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 24px; }

  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color .25s, transform .25s, box-shadow .25s;
  }
  .project-card:hover {
    border-color: rgba(0,255,136,.35);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,.5), 0 0 20px rgba(0,255,136,.08);
  }
  .project-card.expanded { border-color: rgba(0,255,136,.5); }

  /* Thumbnail */
  .project-thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    cursor: pointer;
    overflow: hidden;
    background: var(--surface2);
  }
  .thumb-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
  .project-thumb:hover .thumb-img { transform: scale(1.04); }
  .thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--muted);
    font-size: .7rem;
    text-align: center;
    border-bottom: 1px solid var(--border);
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255,255,255,.015) 10px,
      rgba(255,255,255,.015) 20px
    );
  }
  .thumb-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10px;
    background: linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .2s;
  }
  .project-thumb:hover .thumb-overlay { opacity: 1; }
  .thumb-cta { font-size: .7rem; color: var(--accent); letter-spacing: .08em; font-family: var(--font-mono); }

  /* Project body */
  .project-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .project-top { display: flex; align-items: center; justify-content: space-between; }
  .project-highlight { font-size: .68rem; color: var(--accent); letter-spacing: .08em; text-transform: uppercase; background: rgba(0,255,136,.08); padding: 2px 8px; border-radius: 2px; border: 1px solid rgba(0,255,136,.15); }
  .project-links { display: flex; gap: 10px; }
  .icon-link { color: var(--muted); transition: color .2s; display: flex; align-items: center; }
  .icon-link:hover { color: var(--accent); }
  .project-name { font-family: var(--font-display); font-size: 1.08rem; font-weight: 700; }
  .project-desc { font-size: .82rem; color: #aab; line-height: 1.7; flex: 1; }

  /* Tech stack icons in project card */
  .project-stack { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding-top: 4px; }

  /* Expanded role panel */
  .project-role-panel {
    border-top: 1px solid var(--border);
    padding: 16px 20px;
    background: rgba(0,255,136,.03);
    animation: slideDown .25s ease;
  }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
  .role-label { display: flex; align-items: center; gap: 6px; font-size: .7rem; color: var(--accent); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 8px; font-weight: 600; }
  .role-text { font-size: .81rem; color: #aab; line-height: 1.75; }

  /* Tech icons */
  .tech-icon-wrap {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: default;
  }
  .tech-icon-img {
    display: block;
    transition: transform .2s, filter .2s;
    filter: grayscale(15%);
  }
  .tech-icon-wrap:hover .tech-icon-img { transform: translateY(-3px) scale(1.1); filter: grayscale(0%) drop-shadow(0 4px 8px rgba(0,255,136,.25)); }
  .tech-label { font-size: .62rem; color: var(--muted); text-align: center; letter-spacing: .04em; transition: color .2s; }
  .tech-icon-wrap:hover .tech-label { color: var(--accent); }
  .tech-fallback { display: inline-flex; align-items: center; justify-content: center; background: var(--surface2); color: var(--accent2); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; font-size: .65rem; white-space: nowrap; }

  /* Skills */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .skill-group { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 24px; transition: border-color .2s; }
  .skill-group:hover { border-color: rgba(0,255,136,.2); }
  .skill-category { font-size: .68rem; text-transform: uppercase; letter-spacing: .14em; color: var(--muted); margin-bottom: 18px; font-weight: 600; }
  .skill-icons { display: flex; flex-wrap: wrap; gap: 16px; }

  /* Contact */
  .contact-inner { text-align: center; max-width: 560px; margin: 0 auto; }
  .contact-sub { color: var(--muted); font-size: .88rem; margin-bottom: 24px; }
  .contact-email { display: block; font-family: var(--font-display); font-size: clamp(1.2rem, 4vw, 2rem); font-weight: 700; color: var(--text); text-decoration: none; margin-bottom: 32px; transition: color .2s; }
  .contact-email:hover { color: var(--accent); }
  .contact-links { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }

  /* Footer */
  .footer { text-align: center; padding: 32px; border-top: 1px solid var(--border); color: var(--muted); font-size: .75rem; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent); }
`;
