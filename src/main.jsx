import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, ArrowRight, Star, Check, Plus, Trash2, Search, Sparkles } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'Styling', 'DevOps', 'Tools'];

function Brand({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#home" aria-label="DevStack home">
      <span className="brand-mark">DS</span>
      {!compact && <span className="brand-name">Dev<span>Stack</span></span>}
    </a>
  );
}

function TechnologyIcon({ technology, className = '' }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <span className={`tech-icon-fallback ${className}`} aria-label={`${technology.name} logo`}>{technology.name.slice(0, 2).toUpperCase()}</span>
    : <img className={className} src={technology.icon} alt={`${technology.name} logo`} loading="lazy" onError={() => setFailed(true)} />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ['Home', 'Technologies', 'Projects', 'About', 'Contact'];
  return (
    <header className="site-header">
      <nav className="nav shell">
        <button className="icon-button menu-button" aria-label="Open navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Brand />
        <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
        </div>
        <div className="nav-actions">
          <button className="sign-in">Sign In</button>
          <button className="button button-small button-primary">Sign Up</button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> A clearer way to choose your stack</div>
        <h1>Build your ideal<br /><span>development stack.</span></h1>
        <p>Explore the tools behind great products, compare them side by side, and save a stack that fits your next project.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#technologies">Explore technologies <ArrowRight size={17} /></a>
          <a className="button button-outline" href="#about">How it works</a>
        </div>
        <div className="hero-proof"><div className="proof-avatars"><span>R</span><span>N</span><span>TS</span></div><span>Curated for modern builders</span></div>
      </div>
      <div className="hero-art-wrap">
        <div className="art-glow" />
        <img className="hero-art" src="/assets/banner-stack.png" alt="A colorful layered illustration representing a technology stack" />
        <div className="floating-note note-top"><Sparkles size={14} /> Build with intention</div>
        <div className="floating-note note-bottom"><span className="mini-status" /> 12 tools, one clear plan</div>
      </div>
    </section>
  );
}

function TechCard({ technology, selected, onAdd }) {
  return (
    <article className={`tech-card ${selected ? 'tech-card-selected' : ''}`}>
      <div className="card-topline">
        <div className="tech-icon"><TechnologyIcon technology={technology} /></div>
        <span className={`badge badge-${technology.category.toLowerCase()}`}>{technology.badge}</span>
      </div>
      <h3>{technology.name}</h3>
      <p>{technology.description}</p>
      <div className="card-meta"><span className="category-chip">{technology.category}</span><span>{technology.difficulty}</span><span className="rating"><Star size={13} fill="currentColor" /> {technology.rating}</span></div>
      <button className={`add-button ${selected ? 'add-button-selected' : ''}`} aria-pressed={selected} disabled={selected} onClick={() => onAdd(technology)}>
        {selected ? <><Check size={15} /> Added to stack</> : <><Plus size={15} /> Add to stack</>}
      </button>
    </article>
  );
}

function StackPanel({ stack, onRemove, onRemoveAll }) {
  const coreCategories = ['Frontend', 'Backend', 'Database'];
  const missingCategories = coreCategories.filter((category) => !stack.some((item) => item.category === category));
  const stackHealth = stack.length === 0
    ? 'Start with a frontend tool, then add the services your idea needs.'
    : missingCategories.length === 0
      ? 'Balanced foundation: your stack covers the three core layers.'
      : `You are ${missingCategories.length} core layer${missingCategories.length > 1 ? 's' : ''} away from a balanced foundation.`;
  return (
    <aside className="stack-panel" aria-label="Your selected technology stack">
      <div className="stack-heading"><div><h2>Your stack</h2><p>{stack.length === 0 ? 'No technologies selected yet.' : `${stack.length} ${stack.length === 1 ? 'technology' : 'technologies'} selected`}</p></div><span className="stack-count">{String(stack.length).padStart(2, '0')}</span></div>
      {stack.length === 0 ? <div className="empty-stack"><div className="empty-icon"><Plus size={19} /></div><p>Your stack is empty.</p><span>Add tools from the library to start shaping your next build.</span></div> : <div className="stack-items">{stack.map((item) => <div className="stack-item" key={item.id}><TechnologyIcon technology={item} /><div><strong>{item.name}</strong><small>{item.category}</small></div><button className="remove-item" aria-label={`Remove ${item.name}`} onClick={() => onRemove(item)}><X size={16} /></button></div>)}</div>}
      <button className="remove-all" onClick={onRemoveAll} disabled={stack.length === 0}><Trash2 size={15} /> Remove all</button>
      <div className="stack-tip" aria-live="polite"><Sparkles size={15} /><span>{stackHealth}</span></div>
    </aside>
  );
}

function Technologies({ technologies, stack, onAdd, onRemove, onRemoveAll }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => technologies.filter((tech) => (category === 'All' || tech.category === category) && tech.name.toLowerCase().includes(query.toLowerCase())), [technologies, category, query]);
  return (
    <section className="library shell" id="technologies">
      <div className="section-heading"><div><div className="section-kicker">THE TOOLKIT</div><h2>Choose what moves your<br /><span>project forward.</span></h2><p>Browse a considered collection of technologies and save the ones that fit your idea.</p></div><div className="library-stat"><strong>{technologies.length}</strong><span>curated tools<br />to explore</span></div></div>
      <div className="library-toolbar"><div className="filters" role="tablist" aria-label="Technology categories">{categories.map((item) => <button role="tab" aria-selected={category === item} className={category === item ? 'filter-active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools" aria-label="Search technologies" /></label></div>
      <div className="library-layout"><div className="tech-grid">{filtered.length ? filtered.map((technology) => <TechCard key={technology.id} technology={technology} selected={stack.some((item) => item.id === technology.id)} onAdd={onAdd} />) : <div className="no-results"><Search size={24} /><h3>No tools found</h3><p>Try another name or category to find the right fit.</p></div>}</div><StackPanel stack={stack} onRemove={onRemove} onRemoveAll={onRemoveAll} /></div>
    </section>
  );
}

function SupportingSections() {
  return (
    <>
      <section className="insight-section shell" id="projects"><div className="insight-card"><div><div className="section-kicker">A SIMPLE WORKFLOW</div><h2>From idea to a stack<br /><span>you can trust.</span></h2></div><p>Good projects start with intentional choices. Compare the trade-offs, keep your shortlist visible, and move from exploration to execution with less guesswork.</p><a href="#technologies" className="text-link">Start building <ArrowRight size={16} /></a></div><div className="workflow"><div className="workflow-step"><span>01</span><strong>Explore</strong><p>Find tools that match the job.</p></div><div className="workflow-line" /><div className="workflow-step"><span>02</span><strong>Compare</strong><p>Balance learning curve and capability.</p></div><div className="workflow-line" /><div className="workflow-step"><span>03</span><strong>Build</strong><p>Save a stack for your next sprint.</p></div></div></section>
      <section className="about-strip" id="about"><div className="shell about-inner"><div><div className="section-kicker">BUILT FOR BETTER DECISIONS</div><h2>Less tab hopping.<br />More <span>making.</span></h2></div><p>DevStack is a focused workspace for developers who want to understand their tools before they commit to them.</p></div></section>
    </>
  );
}

function Footer() {
  return <footer className="footer" id="contact"><div className="shell footer-main"><div className="footer-brand"><Brand /><p>Curated tools for developers building thoughtful, modern software.</p><div className="socials"><a href="https://github.com" aria-label="GitHub">GH</a><a href="https://twitter.com" aria-label="Twitter">X</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a></div></div><div className="footer-links"><div><strong>Product</strong><a href="#technologies">Technologies</a><a href="#projects">How it works</a><a href="#home">Changelog</a></div><div><strong>Company</strong><a href="#about">About DevStack</a><a href="#contact">Contact</a><a href="#contact">Careers</a></div><div><strong>Legal</strong><a href="#contact">Privacy policy</a><a href="#contact">Terms of service</a><a href="#contact">Accessibility</a></div></div></div><div className="shell footer-bottom"><span>© 2026 DevStack. Built for the next idea.</span><div><a href="#contact">Privacy</a><a href="#contact">Terms</a></div></div></footer>;
}

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devstack-selection') || '[]'); }
    catch { return []; }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/data/technologies.json')
      .then((response) => { if (!response.ok) throw new Error('Could not load technology data.'); return response.json(); })
      .then(setTechnologies)
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem('devstack-selection', JSON.stringify(stack));
  }, [stack]);

  const addToStack = (technology) => {
    if (stack.some((item) => item.id === technology.id)) { toast.warn(`${technology.name} is already in your stack.`); return; }
    setStack((current) => [...current, technology]);
    toast.success(`${technology.name} added to your stack.`);
  };
  const removeFromStack = (technology) => { setStack((current) => current.filter((item) => item.id !== technology.id)); toast.info(`${technology.name} removed from your stack.`); };
  const removeAll = () => { if (!stack.length) return; setStack([]); toast.info('Your stack has been cleared.'); };

  return <><Navbar /><main>{loading ? <div className="loading-state"><div className="spinner" /><p>Loading your technology library...</p></div> : error ? <div className="error-state"><h2>We could not load the library.</h2><p>{error}</p></div> : <><Hero /><Technologies technologies={technologies} stack={stack} onAdd={addToStack} onRemove={removeFromStack} onRemoveAll={removeAll} /><SupportingSections /></>}</main><Footer /><ToastContainer position="bottom-right" autoClose={2600} newestOnTop theme="light" /> </>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
