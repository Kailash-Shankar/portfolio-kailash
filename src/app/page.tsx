"use client";

import { useState, useEffect } from "react";
import DotGrid from "../components/DotGrid";


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

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Kailash Shankar";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const viewportHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY;
      if (currentScroll + viewportHeight >= scrollHeight - 60) {
        setActive("contact");
        return;
      }
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
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
        @media (min-width: 851px) {
          .mobile-menu { display: none; }
          .hamburger { display: none; }
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
          <a href="Shankar_Kailash_Resume_2_21_26.pdf" download className="btn-gold" style={{ textAlign: "center", marginTop: 10 }}>Resume</a>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="grid-lines" />
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(201,168,76,0.07)", top: "-100px", right: "-100px" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(194,65,12,0.05)", bottom: "100px", left: "-50px" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 48px 80px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }} className="hero-content">
          <div className="hero-text" style={{ flex: 1 }}>
            <div className="fade-up" style={{ marginBottom: 28 }}>
              <span className="impact-badge">Open to Opportunities · Summer 2026</span>
            </div>

            <div className="fade-up delay-1" style={{ marginBottom: 4 }}>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(3rem, 8vw, 7.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                background: "linear-gradient(160deg, #f5f0e8 30%, #c9a84c 60%, #e8c96e 80%, #a07830 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 4px 32px rgba(201,168,76,0.22))",
              }}>
                Kailash Shankar
              </h2>
            </div>

            <h1 className="font-display fade-up delay-2"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 0.92, color: "var(--cream)", marginBottom: 8, marginTop: 10 }}>
              BUILDING<br />
              <span className="gold-text">TECHNOLOGY</span><br />
              THAT MATTERS
            </h1>

            <p className="font-body fade-up delay-3"
              style={{ fontSize: "1.3rem", color: "var(--muted)", marginTop: 28, maxWidth: 560, lineHeight: 1.6, fontStyle: "italic" }}>
              <span style={{ color: "var(--cream)" }}>{typed}</span>
              <span className="cursor" />
              <br />
              University of Florida · CS + Linguistics · GPA 4.0
            </p>

            <div className="fade-up delay-4" style={{ display: "flex", gap: 24, marginTop: 44, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => scrollTo("projects")} className="btn-gold">View My Work</button>
              <a href="mailto:kailashshankar@ufl.edu"
                style={{ color: "var(--gold)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.1em", textDecoration: "none" }}
                className="anim-underline">
                kailashshankar@ufl.edu →
              </a>
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
              {["REAL-WORLD IMPACT", "SOFTWARE ENGINEERING", "COMPUTATIONAL LINGUISTICS", "AI/ML RESEARCH", "FULL-STACK DEVELOPMENT", "LANGUAGE & TECHNOLOGY"].map((t) => (
                <span key={t} style={{ marginRight: 48 }}>{t} ✦</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">Experience</span>
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
              emoji=""
              description="Working with a non-profit in Cape Town, I built an interactive mapping application giving residents of underprivileged neighborhoods direct access to local government contacts and a channel to report critical housing issues — from evictions to power outages and water shortages. Every pin on that map represents a family that now has a voice. Built on a MERN stack with a custom REST API, the platform serves 100+ monthly active users across 30+ informal settlements in the Western Cape."
            />
            <ExperienceBlock
              date="Sep 2025 – Present"
              org="UF GatorAI Club"
              location="Gainesville, FL"
              role="Machine Learning Engineer"
              tags={["Next.js", "FastAPI", "Gemini 2.0", "RAG", "ChromaDB"]}
              impact="95% accuracy · 30% ↓ hallucinations · <500ms retrieval"
              emoji=""
              description="Built an AI Teaching Assistant that deploys course-specific chatbot instances for 50+ students, with Gemini 2.0 orchestration and custom guardrails that cut hallucination rates by 30% while maintaining academic integrity. Engineered a RAG pipeline with ChromaDB achieving sub-500ms semantic retrieval across 1,000+ academic documents."
            />
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── RESEARCH ────────────────────────────────────────────────── */}
      <section id="research" style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">Research</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <div className="impact-card" style={{ padding: "48px", gridColumn: "1 / -1", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
                <div>
                  <span className="impact-badge" style={{ marginBottom: 16, display: "inline-block" }}>Aug 2025 – Present</span>
                  <h3 className="font-serif" style={{ fontSize: "1.9rem", color: "var(--cream)", marginBottom: 8 }}>Computational Linguistics Lab</h3>
                  <p className="font-mono" style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.08em" }}>University of Florida · Advisor: Dr. Zoey Liu</p>
                </div>
                <div style={{ textAlign: "right" }} />
              </div>
              <div className="gold-divider" style={{ margin: "32px 0" }} />
              <p className="font-body" style={{ fontSize: "1.15rem", lineHeight: 1.75, color: "var(--cream)", marginBottom: 24, maxWidth: 760 }}>
                Language shapes how we see the world — yet most of today's AI speaks only a handful of them fluently. Working with Dr. Zoey Liu, I investigate how <em style={{ color: "var(--gold-light)" }}>data partitioning strategies on LLM training data</em> impact model generalization across the world's linguistic diversity, with a particular focus on low-resource languages that are systematically underrepresented in modern AI.
              </p>
              <p className="font-body" style={{ fontSize: "1.15rem", lineHeight: 1.75, color: "var(--muted)", maxWidth: 760 }}>
                My current work quantifies a fundamental trade-off: <strong style={{ color: "var(--cream)" }}>how much does annotation quality matter when data is scarce?</strong> By systematically injecting controlled annotation noise into training sets and benchmarking OLMo-2 across 2,000 languages on UF's HiPerGator supercomputer, I'm building an empirical map of where AI breaks down — and how to fix it.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                {["Zero-Shot Transfer", "Cross-Lingual NLP", "Data Partitioning", "OLMo-2 (1B)", "HiPerGator HPC", "Low-Resource Languages", "Annotation Noise"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            {[
              { icon: "", title: "Quality vs. Quantity", body: "Systematically modeling the trade-off between dataset scale and annotation fidelity — a fundamental question with outsized implications for languages where data is precious." },
              { icon: "", title: "2,000 Languages Tested", body: "Benchmarking across a typologically diverse language set to understand how massive multilingual scale affects cross-linguistic transfer beyond high-resource language clusters." },
              { icon: "", title: "Morphological Segmentation", body: "Investigating cross-lingual partitioning of morphologically segmented data across language families to improve zero-shot performance for understudied tongues." },
            ].map((c) => (
              <div key={c.title} className="impact-card" style={{ padding: "32px", background: "var(--bg3)" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 14 }}>{c.icon}</div>
                <h4 className="font-serif" style={{ fontSize: "1.2rem", color: "var(--cream)", marginBottom: 10 }}>{c.title}</h4>
                <p className="font-body" style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.65 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">Projects</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>

          <div className="impact-card" style={{ padding: "0", marginBottom: 24, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "56px 48px", borderRight: "1px solid var(--border)", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold), var(--amber))" }} />
              <span className="impact-badge" style={{ marginBottom: 20, display: "inline-block" }}>Jan 2025 – Present · Featured</span>
              <h2 className="font-display" style={{ fontSize: "3.8rem", color: "var(--cream)", lineHeight: 1, marginBottom: 8 }}>LINGUA</h2>
              <p className="font-serif" style={{ color: "var(--gold)", fontSize: "1.15rem", fontStyle: "italic", marginBottom: 24 }}>AI Language Learning Platform</p>
              <p className="font-body" style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--muted)", marginBottom: 28 }}>
                Students get just one hour of language class a day — nowhere near enough to build real-world fluency. Lingua changes that. An AI-powered platform where high schoolers practice authentic conversations with distinct AI characters, receive real-time feedback on grammar and vocabulary, and teachers get holistic insights into what their entire class is struggling with.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {["React", "Next.js", "Supabase", "Gemini Flash", "Tailwind", "PostgreSQL", "RBAC", "REST API"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <a href="https://github.com/Kailash-Shankar" target="_blank" rel="noreferrer" className="btn-gold">View on GitHub →</a>
            </div>
            <div style={{ padding: "56px 48px", background: "var(--bg3)" }}>
              <p className="section-label" style={{ marginBottom: 28 }}>Platform Features</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { icon: "", title: "AI Conversation Characters", body: "Each character has a distinct personality and life story, enabling contextually rich, authentic language practice." },
                  { icon: "", title: "Teacher Assignment Studio", body: "Teachers define topic, theme, depth, key vocabulary, and grammar tenses — then let students take it from there." },
                  { icon: "", title: "Real-Time Performance Insights", body: "Multi-dimensional AI feedback after every conversation — what you did well, what to improve, tracked over time." },
                  { icon: "", title: "Secure Role-Based Access", body: "Supabase Auth + Row Level Security cleanly separates student and teacher experiences with zero data bleed." },
                ].map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ fontSize: "1.3rem", marginTop: 2 }}>{f.icon}</div>
                    <div>
                      <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--gold)", letterSpacing: "0.06em", marginBottom: 4 }}>{f.title}</div>
                      <p className="font-body" style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.6 }}>{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              { id: "career", title: "AI Career Coach", date: "Nov – Dec 2025", subtitle: "Resume Optimizer & Interview Simulator", description: "End-to-end AI career prep tool: Gemini-powered ATS-compliant resume generation, mock interview engine with performance persistence, and automated weekly industry skill & salary trend updates via Inngest workflows.", tags: ["Next.js", "NeonDB", "Prisma", "Inngest", "Gemini Flash"], emoji: "" },
              { id: "housing", title: "Home Price Estimator", date: "Oct – Nov 2025", subtitle: "Data Structures · Full-Stack", description: "Full-stack web app delivering neighborhood housing price estimates at 98% accuracy. Implements Red-Black Tree and B-Tree structures to query 100,000+ records in O(log n) time — a C++ backend connected to a React frontend via Next.js.", tags: ["React", "Next.js", "C++", "httplib", "Red-Black Tree"], emoji: "" },
            ].map((p) => (
              <div key={p.id} className="impact-card"
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ padding: "40px", cursor: "default", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: hoveredProject === p.id ? "linear-gradient(90deg, var(--gold), var(--amber))" : "transparent", transition: "background 0.3s" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontSize: "2rem" }}>{p.emoji}</span>
                  <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{p.date}</span>
                </div>
                <h3 className="font-display" style={{ fontSize: "2rem", color: "var(--cream)", marginBottom: 4 }}>{p.title}</h3>
                <p className="font-mono" style={{ color: "var(--gold)", fontSize: "0.72rem", letterSpacing: "0.06em", marginBottom: 16 }}>{p.subtitle}</p>
                <p className="font-body" style={{ fontSize: "1.02rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 24 }}>{p.description}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── SKILLS ──────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
            <span className="section-label">Technical Arsenal</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
            {[
              { cat: "Languages",  items: ["Python", "C/C++", "JavaScript", "HTML/CSS", "MATLAB"] },
              { cat: "Frameworks", items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind CSS"] },
              { cat: "AI/ML",      items: ["Gemini 2.0", "RAG / ChromaDB", "OLMo-2", "Hugging Face"] },
              { cat: "Databases",  items: ["PostgreSQL", "MongoDB", "Supabase", "NeonDB"] },
              { cat: "Tools",      items: ["Docker", "Git", "Linux", "Prisma", "Inngest", "HiPerGator"] },
            ].map((cat) => (
              <div key={cat.cat} className="impact-card" style={{ padding: "28px 24px" }}>
                <div className="font-mono" style={{ fontSize: "0.68rem", color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{cat.cat}</div>
                {cat.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", opacity: 0.5 }} />
                    <span className="font-body" style={{ fontSize: "1rem", color: "var(--cream)" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "120px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        {/* ReactBits DotGrid background */}
        <DotGrid
          dotSize={3}
          gap={22}
          dotColor="rgba(201,168,76,0.3)"
          hoverColor="#e8c96e"
          hoverRadius={100}
        />
        <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(201,168,76,0.04)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <span className="section-label" style={{ display: "block", marginBottom: 20 }}>Let's Build Something</span>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--cream)", lineHeight: 0.95, marginBottom: 32 }}>
            REAL PROBLEMS.<br />
            <span className="gold-text">REAL SOLUTIONS.</span>
          </h2>
          <p className="font-body" style={{ fontSize: "1.2rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 48, fontStyle: "italic" }}>
            I'm looking for opportunities where I can keep doing what I love — building technology that has a genuine impact on real people's lives. Whether that's a full-time role, a research collaboration, or an internship for Summer 2026, let's talk.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:kailashshankar@ufl.edu" className="btn-gold">kailashshankar@ufl.edu</a>
            <a href="https://linkedin.com/in/kailash-shankar" target="_blank" rel="noreferrer" className="btn-gold">LinkedIn ↗</a>
            <a href="https://github.com/Kailash-Shankar" target="_blank" rel="noreferrer" className="btn-gold">GitHub ↗</a>
          </div>
          <div className="gold-divider" style={{ margin: "64px 0 32px" }} />
          <p className="font-mono" style={{ color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
            © 2026 KAILASH SHANKAR · GAINESVILLE, FL
          </p>
        </div>
      </section>
    </>
  );
}

// ── ExperienceBlock ──────────────────────────────────────────────────────────

function ExperienceBlock({ date, org, location, role, tags, impact, emoji, description }: {
  date: string; org: string; location: string; role: string;
  tags: string[]; impact: string; emoji: string; description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="impact-card" style={{ padding: "40px 48px", cursor: "pointer", marginBottom: 2 }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ fontSize: "2rem", marginTop: 4 }}>{emoji}</div>
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4 }}>
              <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--cream)" }}>{org}</h3>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{location}</span>
            </div>
            <div className="font-mono" style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.06em" }}>{role}</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="font-mono" style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 6 }}>{date}</div>
          <span className="impact-badge">{impact}</span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 28 }}>
          <div className="gold-divider" style={{ marginBottom: 24 }} />
          <p className="font-body" style={{ fontSize: "1.1rem", lineHeight: 1.78, color: "var(--muted)", marginBottom: 24 }}>{description}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      )}
      <div className="font-mono" style={{ color: "var(--muted)", fontSize: "0.68rem", marginTop: 16, letterSpacing: "0.08em" }}>
        {open ? "▲ collapse" : "▼ read more"}
      </div>
    </div>
  );
}