"use client";

import { useState, useEffect } from "react";

const SECTIONS = ["about", "experience", "research", "projects", "contact"];

const NAV_LABELS: Record<string, string> = {
  about: "About",
  experience: "Experience",
  research: "Research",
  projects: "Projects",
  contact: "Contact",
};

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const fullTitle = "Software Engineer & Researcher";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Set Page Title
  useEffect(() => {
    document.title = "Kailash Shankar";
  }, []);

  // Robust Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY;

      // 1. Forced Bottom Check
      if (currentScroll + viewportHeight >= scrollHeight - 60) {
        setActive("contact");
        return;
      }

      // 2. Proximity Check
      const offset = 160;
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          if (currentScroll >= el.offsetTop - offset) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

        :root {
          --bg: #0a0a08;
          --bg2: #111110;
          --bg3: #1a1a17;
          --gold: #c9a84c;
          --gold-light: #e8c96e;
          --amber: #f59e0b;
          --cream: #f5f0e8;
          --muted: #7a7870;
          --border: rgba(201,168,76,0.18);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--cream);
          font-family: 'Crimson Pro', Georgia, serif;
          overflow-x: hidden;
        }

        /* Noise texture overlay */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--gold); }

        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.03em; }
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        .font-body { font-family: 'Crimson Pro', serif; }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .anim-underline {
          position: relative;
          display: inline-block;
        }
        .anim-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.35s ease;
        }
        .anim-underline:hover::after { width: 100%; }

        .impact-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .impact-card:hover {
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(201,168,76,0.12);
        }

        .tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          padding: 2px 8px;
          border: 1px solid var(--border);
          border-radius: 2px;
          color: var(--gold);
          background: rgba(201,168,76,0.06);
          letter-spacing: 0.05em;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--gold);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.15s; opacity: 0; }
        .delay-2 { animation-delay: 0.3s; opacity: 0; }
        .delay-3 { animation-delay: 0.45s; opacity: 0; }
        .delay-4 { animation-delay: 0.6s; opacity: 0; }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .gold-text {
          background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--amber));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .impact-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--gold-light);
          text-transform: uppercase;
        }

        .btn-gold {
          display: inline-block;
          padding: 10px 28px;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.25s;
          cursor: pointer;
          background: transparent;
          text-decoration: none;
        }
        .btn-gold:hover {
          background: var(--gold);
          color: var(--bg);
        }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 0;
        }

        .marquee-inner {
          display: flex;
          animation: marquee 22s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .mobile-menu {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 260px;
          background: var(--bg2);
          border-left: 1px solid var(--border);
          z-index: 200;
          padding: 80px 32px 32px;
          transform: translateX(100%);
          transition: transform 0.35s ease;
        }
        .mobile-menu.open { transform: translateX(0); }

        @media (max-width: 850px) {
          .desktop-nav { display: none; }
          .hero-content { flex-direction: column; text-align: center; }
          .hero-text { order: 1; }
          .hero-image { order: 2; margin-top: 32px; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrollY > 60 ? "rgba(10,10,8,0.92)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(201,168,76,0.1)" : "none",
          transition: "all 0.35s ease",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 10px var(--gold)" }} />
          <span className="font-mono" style={{ color: "var(--gold)", fontSize: "0.82rem", letterSpacing: "0.1em" }}>KS</span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="anim-underline font-mono"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === s ? "var(--gold)" : "var(--muted)",
                fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: 0,
              }}
            >
              {NAV_LABELS[s]}
            </button>
          ))}
          <a href="Shankar_Kailash_Resume_2_21_26.pdf" download className="btn-gold" style={{ padding: "6px 16px", fontSize: "0.7rem" }}>
            Resume
          </a>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold)", fontSize: "1.4rem" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-mono"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === s ? "var(--gold)" : "var(--cream)",
                fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase",
                textAlign: "left",
              }}
            >
              {NAV_LABELS[s]}
            </button>
          ))}
          <a href="/resume.pdf" download className="btn-gold" style={{ textAlign: "center", marginTop: 10 }}>Resume</a>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="grid-lines" />
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(201,168,76,0.07)", top: "-100px", right: "-100px" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(194,65,12,0.05)", bottom: "100px", left: "-50px" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 48px 80px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }} className="hero-content">
          <div className="hero-text" style={{ flex: 1 }}>
            <div className="fade-up" style={{ marginBottom: 28 }}><span className="impact-badge">Open to Opportunities · Summer 2026</span></div>
            <div className="fade-up delay-1" style={{ marginBottom: 4 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(3rem, 8vw, 7.5rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1, letterSpacing: "-0.01em", background: "linear-gradient(160deg, #f5f0e8 30%, #c9a84c 60%, #e8c96e 80%, #a07830 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 4px 32px rgba(201,168,76,0.22))" }}>Kailash Shankar</h2>
            </div>
            <h1 className="font-display fade-up delay-2" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 0.92, color: "var(--cream)", marginBottom: 8, marginTop: 10 }}>BUILDING<br /><span className="gold-text">TECHNOLOGY</span><br />THAT MATTERS</h1>
            <p className="font-body fade-up delay-3" style={{ fontSize: "1.3rem", color: "var(--muted)", marginTop: 28, maxWidth: 560, lineHeight: 1.6, fontStyle: "italic" }}>
              <span style={{ color: "var(--cream)" }}>{typed}</span><span className="cursor" /><br />University of Florida · CS + Linguistics · GPA 4.0
            </p>
            <div className="fade-up delay-4" style={{ display: "flex", gap: 24, marginTop: 44, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => scrollTo("projects")} className="btn-gold">View My Work</button>
              <a href="mailto:kailashshankar@ufl.edu" className="anim-underline" style={{ color: "var(--gold)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.1em", textDecoration: "none" }}>kailashshankar@ufl.edu →</a>
            </div>
          </div>
          <div className="hero-image fade-up delay-2" style={{ flexShrink: 0 }}>
             <img src="profile_pic.jpg" alt="Profile" style={{ width: "clamp(280px, 35vw, 480px)", height: "clamp(280px, 35vw, 480px)", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(201,168,76,0.2)" }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <div style={{ background: "var(--gold)", overflow: "hidden", padding: "10px 0" }}>
        <div className="marquee-inner">
          {Array(2).fill(null).map((_, i) => (
            <span key={i} className="font-display" style={{ color: "var(--bg)", fontSize: "1.1rem", letterSpacing: "0.08em" }}>
              {["REAL-WORLD IMPACT", "SOFTWARE ENGINEERING", "COMPUTATIONAL LINGUISTICS", "AI/ML RESEARCH", "FULL-STACK DEVELOPMENT"].map((t) => (
                <span key={t} style={{ marginRight: 48 }}>{t} ✦</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">02 — Experience</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ExperienceBlock
              date="May – Jun 2025"
              org="EDU Africa"
              location="Cape Town, South Africa"
              role="Software Engineering Intern"
              tags={["MERN Stack", "React", "Leaflet", "REST API", "Node.js"]}
              impact="30+ settlements connected · 100+ MAU"
              emoji="🌍"
              description="Working with a non-profit in Cape Town, I built an interactive mapping application giving residents of underprivileged neighborhoods direct access to local government contacts and a channel to report critical housing issues. Built on a MERN stack with a custom REST API, the platform serves 100+ monthly active users across 30+ informal settlements."
            />
            <ExperienceBlock
              date="Sep 2025 – Present"
              org="UF GatorAI Club"
              location="Gainesville, FL"
              role="Machine Learning Engineer"
              tags={["Next.js", "FastAPI", "Gemini 2.0", "RAG", "ChromaDB"]}
              impact="95% accuracy · 30% ↓ hallucinations"
              emoji="💻"
              description="Built an AI Teaching Assistant that deploys course-specific chatbot instances for 50+ students. Engineered a RAG pipeline with ChromaDB achieving sub-500ms semantic retrieval across 1,000+ academic documents."
            />
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── RESEARCH ────────────────────────────────────────────────── */}
      <section id="research" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">03 — Research</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>
          <div className="impact-card" style={{ padding: "48px" }}>
            <span className="impact-badge" style={{ marginBottom: 16, display: "inline-block" }}>Aug 2025 – Present</span>
            <h3 className="font-serif" style={{ fontSize: "1.9rem", color: "var(--cream)", marginBottom: 8 }}>Computational Linguistics Lab</h3>
            <p className="font-mono" style={{ color: "var(--gold)", fontSize: "0.78rem", marginBottom: 24 }}>University of Florida · Advisor: Dr. Zoey Liu</p>
            <p className="font-body" style={{ fontSize: "1.15rem", lineHeight: 1.75, color: "var(--cream)", marginBottom: 24, maxWidth: 800 }}>
              Working with Dr. Zoey Liu, I investigate how <em style={{ color: "var(--gold-light)" }}>data partitioning strategies on LLM training data</em> impact model generalization across the world's linguistic diversity, with a particular focus on low-resource languages. Benchmarking OLMo-2 across 2,000 languages on UF's HiPerGator supercomputer.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Zero-Shot Transfer", "Cross-Lingual NLP", "OLMo-2", "HiPerGator HPC"].map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">04 — Projects</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>
          
          {/* Lingua Hero Project */}
          <div className="impact-card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginBottom: 24 }}>
            <div style={{ padding: "48px", borderRight: "1px solid var(--border)" }}>
              <span className="impact-badge" style={{ marginBottom: 20, display: "inline-block" }}>Jan 2025 – Present</span>
              <h2 className="font-display" style={{ fontSize: "3rem", color: "var(--cream)", marginBottom: 8 }}>LINGUA</h2>
              <p className="font-body" style={{ color: "#b8b4aa", marginBottom: 24 }}>AI-powered language learning platform where students practice authentic conversations with distinct AI characters, featuring real-time teacher analytics.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {["Next.js", "Supabase", "Gemini Flash", "PostgreSQL"].map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <a href="https://github.com/Kailash-Shankar" target="_blank" className="btn-gold">GitHub →</a>
            </div>
            <div style={{ padding: "48px", background: "var(--bg3)" }}>
               <p className="section-label" style={{ marginBottom: 20 }}>Core Features</p>
               <ul className="font-body" style={{ listStyle: "none", display: "grid", gap: 12, color: "var(--muted)" }}>
                 <li>✦ Distinct AI Persona Architecture</li>
                 <li>✦ Teacher Dashboard & Assignment Studio</li>
                 <li>✦ Real-time Grammar Feedback Engine</li>
                 <li>✦ RBAC Secure Data Layer</li>
               </ul>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <ProjectSmall id="career" title="AI Career Coach" date="2025" tags={["NeonDB", "Prisma", "Inngest"]} emoji="💼" desc="ATS-compliant resume generator and interview simulator with weekly skill trend updates." />
            <ProjectSmall id="housing" title="Home Price Estimator" date="2025" tags={["C++", "React", "Data Structures"]} emoji="🏠" desc="Full-stack app using Red-Black Trees to query 100k+ records in O(log n) time." />
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "120px 0", textAlign: "center", position: "relative" }}>
        <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(201,168,76,0.04)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px", position: "relative" }}>
          <span className="section-label" style={{ marginBottom: 20, display: "block" }}>05 — Get In Touch</span>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--cream)", marginBottom: 32 }}>REAL PROBLEMS.<br /><span className="gold-text">REAL SOLUTIONS.</span></h2>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:kailashshankar@ufl.edu" className="btn-gold">kailashshankar@ufl.edu</a>
            <a href="https://linkedin.com/in/kailash-shankar" target="_blank" className="btn-gold">LinkedIn ↗</a>
          </div>
          <p className="font-mono" style={{ color: "var(--muted)", fontSize: "0.7rem", marginTop: 64 }}>© 2026 KAILASH SHANKAR · GAINESVILLE, FL</p>
        </div>
      </section>
    </>
  );
}

function ExperienceBlock({ date, org, location, role, tags, impact, emoji, description }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="impact-card" style={{ padding: "40px 48px", cursor: "pointer", marginBottom: 2 }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ fontSize: "2rem" }}>{emoji}</div>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem" }}>{org}</h3>
            <div className="font-mono" style={{ color: "var(--gold)", fontSize: "0.78rem" }}>{role}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}><span className="impact-badge">{impact}</span><div className="font-mono" style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 6 }}>{date}</div></div>
      </div>
      {open && (
        <div style={{ marginTop: 20, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <p className="font-body" style={{ color: "#b8b4aa", marginBottom: 16 }}>{description}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{tags.map((t: string) => <span key={t} className="tag">{t}</span>)}</div>
        </div>
      )}
    </div>
  );
}

function ProjectSmall({ title, date, tags, emoji, desc }: any) {
  return (
    <div className="impact-card" style={{ padding: "40px" }}>
      <div style={{ fontSize: "2rem", marginBottom: 16 }}>{emoji}</div>
      <h3 className="font-display" style={{ fontSize: "2rem" }}>{title}</h3>
      <p className="font-body" style={{ color: "var(--muted)", margin: "12px 0 20px", fontSize: "1rem" }}>{desc}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{tags.map((t: string) => <span key={t} className="tag">{t}</span>)}</div>
    </div>
  );
}