"use client";

import { useState, useEffect } from "react";
import { MessageCircle, BookOpen, Pencil, Mic, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

const Space3D = dynamic(() => import("./Space3D"), { ssr: false });

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
  const [show3D, setShow3D] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const fullTitle = "Software Engineer & Researcher";

  useEffect(() => {
    if (promoDismissed) return;
    const t = setTimeout(() => setShowPromo(true), 800);
    return () => clearTimeout(t);
  }, [promoDismissed]);

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

  const STARS = [
    { top: "9%",  left: "5%",   size: 56, dur: "9s",    delay: "0s",   anim: "starDrift"  },
    { top: "15%", left: "42%",  size: 26, dur: "6.5s",  delay: "1.4s", anim: "starPulse"  },
    { top: "6%",  right: "18%", size: 44, dur: "11s",   delay: "0.7s", anim: "starFloat"  },
    { top: "70%", left: "3%",   size: 36, dur: "8.5s",  delay: "2.1s", anim: "starFloat"  },
    { top: "58%", left: "26%",  size: 20, dur: "7s",    delay: "3.3s", anim: "starPulse"  },
    { top: "20%", right: "5%",  size: 64, dur: "13s",   delay: "0.3s", anim: "starDrift"  },
    { top: "78%", right: "9%",  size: 40, dur: "10s",   delay: "1.9s", anim: "starFloat"  },
    { top: "44%", left: "11%",  size: 22, dur: "5.5s",  delay: "4.2s", anim: "starPulse"  },
    { top: "86%", left: "52%",  size: 48, dur: "12s",   delay: "2.7s", anim: "starDrift"  },
    { top: "33%", right: "28%", size: 18, dur: "8s",    delay: "1.1s", anim: "starPulse"  },
    { top: "50%", right: "3%",  size: 30, dur: "9.5s",  delay: "0.5s", anim: "starFloat"  },
    { top: "3%",  left: "22%",  size: 16, dur: "6s",    delay: "2.9s", anim: "starPulse"  },
    { top: "92%", left: "8%",   size: 24, dur: "10.5s", delay: "1.6s", anim: "starDrift"  },
    { top: "38%", left: "48%",  size: 14, dur: "7.5s",  delay: "3.8s", anim: "starPulse"  },
    { top: "62%", right: "22%", size: 52, dur: "14s",   delay: "0.9s", anim: "starDrift"  },
    { top: "25%", left: "18%",  size: 18, dur: "5s",    delay: "5.1s", anim: "starPulse"  },
    { top: "74%", left: "38%",  size: 28, dur: "9s",    delay: "2.4s", anim: "starFloat"  },
    { top: "12%", right: "40%", size: 20, dur: "7s",    delay: "4.6s", anim: "starPulse"  },
    { top: "55%", left: "58%",  size: 34, dur: "11.5s", delay: "1.3s", anim: "starFloat"  },
    { top: "90%", right: "30%", size: 22, dur: "8s",    delay: "3.0s", anim: "starPulse"  },
    { top: "42%", right: "14%", size: 16, dur: "6.5s",  delay: "4.0s", anim: "starPulse"  },
    { top: "18%", left: "62%",  size: 38, dur: "12.5s", delay: "0.2s", anim: "starDrift"  },
    { top: "80%", left: "20%",  size: 20, dur: "7s",    delay: "5.5s", anim: "starPulse"  },
    { top: "30%", left: "32%",  size: 14, dur: "6s",    delay: "2.2s", anim: "starPulse"  },
    { top: "65%", right: "42%", size: 42, dur: "10s",   delay: "1.7s", anim: "starFloat"  },
    { top: "4%",  left: "72%",  size: 18, dur: "7s",    delay: "3.5s", anim: "starPulse"  },
    { top: "47%", left: "36%",  size: 12, dur: "5.5s",  delay: "6.0s", anim: "starPulse"  },
    { top: "96%", left: "44%",  size: 30, dur: "9s",    delay: "0.8s", anim: "starFloat"  },
    { top: "22%", right: "52%", size: 46, dur: "13.5s", delay: "1.0s", anim: "starDrift"  },
    { top: "68%", left: "68%",  size: 16, dur: "6.5s",  delay: "4.8s", anim: "starPulse"  },
    { top: "10%", left: "88%",  size: 34, dur: "10s",   delay: "2.0s", anim: "starFloat"  },
    { top: "83%", right: "48%", size: 20, dur: "7.5s",  delay: "3.6s", anim: "starPulse"  },
    { top: "37%", left: "78%",  size: 28, dur: "9.5s",  delay: "1.5s", anim: "starFloat"  },
    { top: "52%", right: "60%", size: 14, dur: "5s",    delay: "5.8s", anim: "starPulse"  },
    { top: "76%", left: "82%",  size: 50, dur: "12s",   delay: "0.4s", anim: "starDrift"  },
    { top: "28%", right: "70%", size: 16, dur: "6s",    delay: "4.4s", anim: "starPulse"  },
    { top: "60%", left: "14%",  size: 24, dur: "8.5s",  delay: "2.8s", anim: "starFloat"  },
    { top: "7%",  left: "54%",  size: 32, dur: "11s",   delay: "1.2s", anim: "starDrift"  },
    { top: "94%", right: "18%", size: 18, dur: "7s",    delay: "3.2s", anim: "starPulse"  },
    { top: "40%", right: "82%", size: 22, dur: "8s",    delay: "5.3s", anim: "starFloat"  },
    { top: "16%", left: "8%",   size: 14, dur: "5.5s",  delay: "6.5s", anim: "starPulse"  },
    { top: "72%", right: "65%", size: 36, dur: "10.5s", delay: "0.6s", anim: "starDrift"  },
    { top: "48%", left: "92%",  size: 20, dur: "7.5s",  delay: "3.9s", anim: "starPulse"  },
    { top: "85%", left: "62%",  size: 26, dur: "9s",    delay: "2.3s", anim: "starFloat"  },
    { top: "35%", right: "8%",  size: 16, dur: "6s",    delay: "5.0s", anim: "starPulse"  },
  ];

  const launch3D = () => {
    setShow3D(true);
    setShowPromo(false);
    setPromoDismissed(true);
  };
  const dismissPromo = () => {
    setShowPromo(false);
    setPromoDismissed(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

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
        .font-mono { font-family: 'DM Sans', system-ui, sans-serif; }
        .font-body { font-family: 'Crimson Pro', serif; }
        .font-hero {
          font-family: 'DM Serif Display', Georgia, serif;
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .lingua-link {
          position: relative;
          display: inline-block;
          color: var(--cream);
          text-decoration: none;
        }
        .lingua-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--amber));
          border-radius: 2px;
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lingua-link:hover::after { width: 100%; }

        /* ── 3D promo popup ── */
        @keyframes promoIn {
          from { opacity: 0; transform: translate(-50%, -24px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes promoOut {
          from { opacity: 1; transform: translate(-50%, 0); }
          to   { opacity: 0; transform: translate(-50%, -24px); }
        }
        .promo-3d {
          position: fixed;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 14px 18px 14px 24px;
          background: rgba(20, 18, 12, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(201, 168, 76, 0.32);
          border-radius: 999px;
          box-shadow:
            0 12px 40px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 60px rgba(201,168,76,0.18);
          animation: promoIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .promo-3d.closing {
          animation: promoOut 0.35s cubic-bezier(0.4, 0, 1, 1) both;
        }
        .promo-3d-text {
          font-family: 'Crimson Pro', Georgia, serif;
          font-style: italic;
          font-size: 1.08rem;
          color: var(--cream);
          letter-spacing: 0.005em;
          white-space: nowrap;
        }
        .promo-3d-sparkle {
          display: inline-block;
          background: linear-gradient(135deg, #e8c96e, #ffe39a, #c9a84c);
          -webkit-background-clip: text;
                  background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        .promo-3d-btn {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.86rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #1a1208;
          background: linear-gradient(135deg, #ffe39a 0%, #e8c96e 45%, #c9a84c 100%);
          border: none;
          padding: 9px 22px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          box-shadow: 0 4px 16px rgba(201,168,76,0.35);
          white-space: nowrap;
        }
        .promo-3d-btn:hover {
          transform: scale(1.05);
          filter: brightness(1.08);
          box-shadow: 0 6px 24px rgba(232,201,110,0.55), 0 0 28px rgba(255,227,154,0.4);
        }
        .promo-3d-close {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 999px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .promo-3d-close:hover {
          color: var(--cream);
          background: rgba(245,240,232,0.08);
        }
        @media (max-width: 600px) {
          .promo-3d { gap: 12px; padding: 12px 14px 12px 18px; max-width: calc(100vw - 20px); }
          .promo-3d-text { font-size: 0.95rem; white-space: normal; }
          .promo-3d-btn { font-size: 0.78rem; padding: 8px 16px; }
        }

        /* ── 'View in 3D' nav button ── */
        @keyframes nav3dPulse {
          0%, 100% {
            box-shadow:
              0 2px 12px rgba(201,168,76,0.35),
              0 0 0 0 rgba(255,227,154,0.0);
          }
          50% {
            box-shadow:
              0 4px 18px rgba(232,201,110,0.55),
              0 0 22px rgba(255,227,154,0.5);
          }
        }
        .btn-3d-nav {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #1a1208;
          background: linear-gradient(135deg, #ffe39a 0%, #e8c96e 45%, #c9a84c 100%);
          border: none;
          padding: 7px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease;
          animation: nav3dPulse 3s ease-in-out infinite;
        }
        .btn-3d-nav:hover {
          transform: scale(1.05);
          filter: brightness(1.08);
        }
        .btn-3d-nav .sparkle {
          background: linear-gradient(135deg, #6b4a14, #3a2810);
          -webkit-background-clip: text;
                  background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 0.95em;
          line-height: 1;
        }

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
          transition: width 0.08s ease;
        }
        .anim-underline:hover::after { width: 100%; }

        .impact-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          transition: all 0.08s ease;
        }
        .impact-card:hover {
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(201,168,76,0.12);
        }

        .tag {
          font-family: 'DM Sans', system-ui, sans-serif;
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
          font-family: 'DM Sans', system-ui, sans-serif;
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
          font-family: 'DM Sans', system-ui, sans-serif;
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
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.08s;
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
          transition: transform 0.08s ease;
        }
        .mobile-menu.open { transform: translateX(0); }

        /* ── Golden Stars ── */
        @keyframes starPulse {
          0%, 100% { opacity: 0.2;  transform: rotate(0deg)   scale(0.82); }
          50%       { opacity: 0.75; transform: rotate(180deg) scale(1.2);  }
        }
        @keyframes starFloat {
          0%   { opacity: 0.25; transform: translateY(0px)   rotate(0deg)   scale(1);    }
          33%  { opacity: 0.72; transform: translateY(-24px) rotate(120deg) scale(1.14); }
          66%  { opacity: 0.38; transform: translateY(10px)  rotate(240deg) scale(0.9);  }
          100% { opacity: 0.25; transform: translateY(0px)   rotate(360deg) scale(1);    }
        }
        @keyframes starDrift {
          0%   { opacity: 0.18; transform: translate(0px,   0px)   rotate(0deg)   scale(1);    }
          25%  { opacity: 0.7;  transform: translate(16px, -26px)  rotate(90deg)  scale(1.18); }
          50%  { opacity: 0.32; transform: translate(-10px,-16px)  rotate(180deg) scale(0.88); }
          75%  { opacity: 0.65; transform: translate(-18px, 12px)  rotate(270deg) scale(1.1);  }
          100% { opacity: 0.18; transform: translate(0px,   0px)   rotate(360deg) scale(1);    }
        }
        .hero-star {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        /* ── Profile pic frame + glow ── */
        @keyframes frameSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes frameSpinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .profile-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .profile-frame-outer {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: conic-gradient(
            #e8c96e 0deg,
            #c9a84c 60deg,
            transparent 90deg,
            transparent 150deg,
            #f59e0b 180deg,
            #e8c96e 210deg,
            transparent 240deg,
            transparent 300deg,
            #c9a84c 330deg,
            #e8c96e 360deg
          );
          animation: frameSpin 10s linear infinite;
          opacity: 0.7;
          transition: opacity 0.08s ease;
        }
        .profile-frame-inner {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: conic-gradient(
            transparent 0deg,
            #c9a84c 45deg,
            #e8c96e 90deg,
            transparent 135deg,
            transparent 180deg,
            #f59e0b 225deg,
            #c9a84c 270deg,
            transparent 315deg,
            transparent 360deg
          );
          animation: frameSpinReverse 7s linear infinite;
          opacity: 0.5;
          transition: opacity 0.08s ease;
        }
        .profile-frame-mask {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: var(--bg);
        }
        .profile-img {
          position: relative;
          z-index: 1;
          transition: box-shadow 0.08s ease, transform 0.08s ease;
          border: 2px solid rgba(201,168,76,0.35) !important;
        }
        .profile-wrapper:hover .profile-frame-outer { opacity: 1; }
        .profile-wrapper:hover .profile-frame-inner { opacity: 0.9; }
        .profile-wrapper:hover .profile-img {
          box-shadow:
            0 0 30px rgba(201,168,76,0.9),
            0 0 70px rgba(201,168,76,0.5),
            0 0 140px rgba(232,201,110,0.3),
            0 0 220px rgba(201,168,76,0.15);
          border-color: rgba(201,168,76,0.9) !important;
          transform: scale(1.025);
        }

        /* ── Contact Sparkles ── */
        @keyframes sparklePop {
          0%   { opacity: 0;    transform: scale(0)    rotate(0deg);   }
          20%  { opacity: 0.9;  transform: scale(1.2)  rotate(45deg);  }
          60%  { opacity: 0.6;  transform: scale(0.9)  rotate(135deg); }
          100% { opacity: 0;    transform: scale(0)    rotate(180deg); }
        }
        @keyframes sparkleFloat {
          0%   { opacity: 0;    transform: translateY(0px)   scale(0)   rotate(0deg);   }
          15%  { opacity: 0.85; transform: translateY(-8px)  scale(1.1) rotate(30deg);  }
          55%  { opacity: 0.55; transform: translateY(-20px) scale(0.8) rotate(100deg); }
          100% { opacity: 0;    transform: translateY(-36px) scale(0)   rotate(160deg); }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0;    transform: scale(0)   rotate(0deg);   }
          30%       { opacity: 0.95; transform: scale(1.3) rotate(60deg);  }
          70%       { opacity: 0.4;  transform: scale(0.7) rotate(120deg); }
        }
        .contact-sparkle {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }

        .glow-text {
          transition: none;
          cursor: default;
        }
        .glow-text:hover {
          text-shadow:
            0 0 20px rgba(245,240,232,0.8),
            0 0 50px rgba(245,240,232,0.4),
            0 0 100px rgba(201,168,76,0.3);
          filter: brightness(1.25);
        }
        .glow-text-gold {
          transition: none;
          cursor: default;
        }
        .glow-text-gold:hover {
          filter: brightness(1.4) drop-shadow(0 0 18px rgba(232,201,110,0.9)) drop-shadow(0 0 40px rgba(201,168,76,0.5));
        }

        .glow-name {
          transition: none;
          cursor: default;
          display: block;
          width: fit-content;
          filter: drop-shadow(0 4px 32px rgba(201,168,76,0.22));
        }
        .glow-name:hover {
          filter:
            drop-shadow(0 0 6px rgba(232,201,110,0.6))
            drop-shadow(0 0 18px rgba(201,168,76,0.35))
            brightness(1.08);
        }

        /* ── Responsive nav ──
           - Large (≥1100px): full desktop nav
           - Medium (900-1099px): condensed desktop nav (still horizontal, tighter)
           - Small (<900px): hamburger drawer (covers phones AND tablets in portrait)
        */
        .hamburger { display: none; }
        .mobile-menu { display: block; }
        .mobile-menu-backdrop { display: none; }

        @media (max-width: 1099px) and (min-width: 900px) {
          .nav-bar { padding: 14px 24px !important; }
          .desktop-nav { gap: 18px !important; }
          .desktop-nav .anim-underline { font-size: 0.76rem !important; letter-spacing: 0.08em !important; }
          .desktop-nav .btn-3d-nav { font-size: 0.72rem; padding: 6px 12px; gap: 5px; }
          .desktop-nav .btn-gold { font-size: 0.74rem !important; padding: 6px 14px !important; }
        }

        @media (max-width: 899px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: inline-flex !important; align-items: center; justify-content: center; }
          .nav-bar { padding: 14px 20px !important; }
          .mobile-menu-backdrop { display: block; }
        }
        @media (max-width: 760px) {
          .hero-content { flex-direction: column; text-align: center; }
          .hero-text { order: 1; }
          .hero-image { order: 2; margin-top: 32px; }
        }
        @media (min-width: 900px) {
          .mobile-menu { display: none; }
        }

        /* Mobile menu slide-in drawer */
        .mobile-menu {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 199;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-menu-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        .hamburger-btn {
          width: 44px;
          height: 44px;
          font-size: 1.6rem !important;
          line-height: 1;
          border-radius: 12px;
          transition: background 0.15s ease;
        }
        .hamburger-btn:hover, .hamburger-btn:focus-visible {
          background: rgba(201,168,76,0.10) !important;
          outline: none;
        }
        .mobile-menu-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(201,168,76,0.24);
          border-radius: 999px;
          background: rgba(10,10,8,0.42);
          color: var(--gold);
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .mobile-menu-close:hover,
        .mobile-menu-close:focus-visible {
          background: rgba(201,168,76,0.10);
          border-color: rgba(201,168,76,0.45);
          outline: none;
        }

        /* ── Organic / natural overrides for middle sections ── */
        .section-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .section-heading {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .hero-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 120px 48px 80px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }
        .hero-actions,
        .contact-actions {
          display: flex;
          flex-wrap: wrap;
        }
        .lingua-detail-grid,
        .project-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2px;
        }
        .project-card,
        .lingua-copy,
        .lingua-features {
          min-width: 0;
        }
        .mobile-menu-link {
          min-height: 44px;
          width: 100%;
        }

        @media (max-width: 760px) {
          html, body {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }
          .nav-bar {
            padding: 12px 16px !important;
            background: rgba(10,10,8,0.92) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border-bottom: 1px solid rgba(201,168,76,0.12) !important;
          }
          .mobile-menu {
            width: min(84vw, 320px) !important;
            padding: 82px 24px 28px !important;
            overflow-y: auto;
          }
          .promo-3d {
            top: 72px;
            width: calc(100vw - 24px);
            border-radius: 20px;
            align-items: flex-start;
          }
          .promo-3d-text {
            min-width: 0;
            line-height: 1.25;
          }
          #about {
            min-height: auto !important;
            padding-top: 76px;
          }
          .hero-inner {
            padding: 40px 22px 56px !important;
            flex-direction: column;
            text-align: center;
            gap: 34px !important;
          }
          .hero-text {
            width: 100%;
            min-width: 0;
          }
          .glow-name {
            width: 100% !important;
            font-size: clamp(2.55rem, 14vw, 4.8rem) !important;
            line-height: 0.98 !important;
            overflow-wrap: anywhere;
          }
          .hero-title {
            font-size: clamp(2.8rem, 16vw, 5.2rem) !important;
            line-height: 0.95 !important;
          }
          .hero-subtitle {
            font-size: 1.08rem !important;
            max-width: 100% !important;
            margin-top: 22px !important;
          }
          .hero-actions {
            justify-content: center;
            gap: 14px !important;
            margin-top: 32px !important;
          }
          .hero-actions .btn-gold,
          .contact-actions .btn-gold {
            width: 100%;
            max-width: 320px;
            text-align: center;
            padding: 11px 18px !important;
            overflow-wrap: anywhere;
          }
          .hero-link {
            font-size: 0.74rem !important;
            letter-spacing: 0.06em !important;
          }
          .hero-image {
            margin-top: 0 !important;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .profile-img {
            width: min(72vw, 300px) !important;
            height: min(72vw, 300px) !important;
          }
          .hero-star {
            opacity: 0.45;
            transform: scale(0.72);
            transform-origin: center;
          }
          .glow-orb {
            max-width: 80vw;
            max-height: 80vw;
          }
          .marquee-inner span {
            font-size: 0.9rem !important;
          }
          .section-shell {
            padding: 0 22px !important;
          }
          .organic {
            padding-top: 68px !important;
            padding-bottom: 68px !important;
          }
          .section-heading {
            gap: 14px !important;
            margin-bottom: 38px !important;
          }
          .section-label {
            font-size: 0.95rem !important;
            white-space: nowrap;
          }
          .next-up-body {
            padding: 28px 0 !important;
          }
          .gl-logo {
            width: min(84vw, 360px) !important;
          }
          .research-intro,
          .research-body {
            font-size: 1.08rem !important;
            line-height: 1.72 !important;
          }
          .research-stats {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .lingua-detail-grid,
          .project-grid {
            grid-template-columns: 1fr !important;
          }
          .lingua-copy,
          .lingua-features,
          .project-card,
          .skill-card,
          .experience-card {
            padding: 26px 22px !important;
          }
          .lingua-copy {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .lingua-title-link {
            font-size: clamp(2.4rem, 18vw, 3.3rem) !important;
          }
          .carousel {
            aspect-ratio: 4 / 3;
          }
          .carousel-arrow {
            width: 38px;
            height: 38px;
            font-size: 1.35rem;
          }
          .carousel-dots {
            bottom: 12px;
            gap: 6px;
            padding: 7px 10px;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-section {
            padding: 82px 0 !important;
          }
          .contact-inner {
            padding: 0 22px !important;
          }
          .contact-title {
            font-size: clamp(2.35rem, 14vw, 4rem) !important;
          }
          .contact-copy {
            font-size: 1.06rem !important;
            margin-bottom: 34px !important;
          }
          .contact-actions {
            align-items: center;
            flex-direction: column;
          }
          .footer-copy {
            line-height: 1.6;
            overflow-wrap: anywhere;
          }
          .experience-card-header,
          .experience-main,
          .experience-org-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .experience-date {
            text-align: left !important;
          }
          .experience-description {
            font-size: 1.02rem !important;
            line-height: 1.7 !important;
          }
        }

        @media (max-width: 430px) {
          .hero-inner {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .section-shell,
          .contact-inner {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .glow-name {
            font-size: clamp(2.35rem, 13.5vw, 3.5rem) !important;
          }
          .hero-title {
            font-size: clamp(2.45rem, 15vw, 3.9rem) !important;
          }
          .btn-gold,
          .btn-3d-nav {
            max-width: 100%;
          }
          .mobile-menu {
            width: min(88vw, 300px) !important;
          }
        }

        .organic .section-label {
          font-family: 'Crimson Pro', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.15rem;
          letter-spacing: 0;
          text-transform: none;
          color: var(--gold-light);
        }
        .organic .section-label::before {
          content: '— ';
          color: var(--gold);
          opacity: 0.7;
        }
        .organic .gold-divider {
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.28), transparent);
          opacity: 0.85;
        }
        .organic .impact-card {
          border-radius: 22px;
          border: 1px solid rgba(201,168,76,0.14);
          background: var(--bg2);
        }
        .organic .impact-card:hover {
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-3px);
          box-shadow: 0 14px 50px rgba(201,168,76,0.10);
        }
        .organic .tag {
          font-family: 'Crimson Pro', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 0.92rem;
          padding: 4px 14px;
          border-radius: 999px;
          letter-spacing: 0;
          text-transform: none;
          color: var(--gold-light);
          background: rgba(201,168,76,0.07);
          border: 1px solid rgba(201,168,76,0.2);
        }
        .organic .impact-badge {
          font-family: 'Crimson Pro', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 0.92rem;
          padding: 4px 16px;
          border-radius: 999px;
          letter-spacing: 0;
          text-transform: none;
          background: rgba(201,168,76,0.09);
          border: 1px solid rgba(201,168,76,0.25);
          color: var(--gold-light);
        }
        .organic .font-mono {
          font-family: 'Crimson Pro', Georgia, serif !important;
          font-style: italic;
          letter-spacing: 0 !important;
          text-transform: none !important;
        }
        .organic .font-display {
          font-family: 'DM Serif Display', Georgia, serif !important;
          letter-spacing: -0.005em !important;
          font-weight: 400;
        }
        .organic .btn-gold {
          font-family: 'Crimson Pro', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 1.02rem;
          letter-spacing: 0;
          text-transform: none;
          padding: 11px 28px;
          border-radius: 999px;
        }

        /* ── Carousel ── */
        .carousel {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: var(--bg3);
          overflow: hidden;
        }
        .carousel-track {
          display: flex;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .carousel-slide {
          flex-shrink: 0;
          height: 100%;
          object-fit: cover;
        }
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(10,10,8,0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.32);
          color: var(--gold-light);
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.7rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0 4px 0;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          z-index: 2;
        }
        .carousel-arrow:hover {
          background: rgba(201,168,76,0.9);
          color: var(--bg);
          border-color: var(--gold);
          transform: translateY(-50%) scale(1.06);
        }
        .carousel-dots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(10,10,8,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2;
        }
        .carousel-dot {
          height: 8px;
          width: 8px;
          border-radius: 999px;
          background: rgba(245,240,232,0.4);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease;
        }
        .carousel-dot.active {
          width: 26px;
          background: var(--gold-light);
        }

        /* ── Next Up: GlobalLogic ── */
        .gl-logo {
          width: clamp(280px, 38vw, 520px);
          aspect-ratio: 800 / 270;
          background: linear-gradient(135deg, #ffb15a 0%, #ff7a1c 45%, #ff5a00 100%);
          -webkit-mask: url('/globallogic-logo-text.png') center / contain no-repeat;
                  mask: url('/globallogic-logo-text.png') center / contain no-repeat;
          animation: glLogoGlow 3.2s ease-in-out infinite;
          transition: background 0.4s ease, transform 0.4s ease;
        }
        @keyframes glLogoGlow {
          0%, 100% {
            filter:
              drop-shadow(0 0 14px rgba(255,122,28,0.55))
              drop-shadow(0 0 40px rgba(255,100,0,0.32))
              drop-shadow(0 0 90px rgba(255,140,50,0.18));
          }
          50% {
            filter:
              drop-shadow(0 0 22px rgba(255,170,70,0.9))
              drop-shadow(0 0 60px rgba(255,122,28,0.55))
              drop-shadow(0 0 140px rgba(255,100,0,0.32));
          }
        }
        .gl-logo:hover {
          background: linear-gradient(
            100deg,
            #ff7a1c 0%,
            #ff9540 22%,
            #ffc266 44%,
            #ffe090 50%,
            #ffc266 56%,
            #ff9540 78%,
            #ff7a1c 100%
          );
          background-size: 260% 100%;
          animation:
            glLogoGlowBright 1.6s ease-in-out infinite,
            glShine 1.8s linear infinite;
          transform: scale(1.035);
        }
        @keyframes glLogoGlowBright {
          0%, 100% {
            filter:
              brightness(1.5) saturate(1.25)
              drop-shadow(0 0 24px rgba(255,160,60,1))
              drop-shadow(0 0 60px rgba(255,120,20,0.8))
              drop-shadow(0 0 140px rgba(255,100,0,0.55))
              drop-shadow(0 0 240px rgba(255,80,0,0.3));
          }
          50% {
            filter:
              brightness(1.85) saturate(1.4)
              drop-shadow(0 0 38px rgba(255,200,100,1))
              drop-shadow(0 0 95px rgba(255,150,40,0.95))
              drop-shadow(0 0 200px rgba(255,110,10,0.7))
              drop-shadow(0 0 360px rgba(255,90,0,0.45));
          }
        }
        @keyframes glShine {
          0%   { background-position: 160% 50%; }
          100% { background-position: -60% 50%; }
        }
        .gl-aura {
          position: absolute;
          inset: -200px -10vw;
          background: radial-gradient(
            ellipse 55% 65% at center,
            rgba(255,150,60,0.38) 0%,
            rgba(255,120,30,0.22) 18%,
            rgba(255,100,10,0.12) 38%,
            rgba(255,90,0,0.05) 58%,
            rgba(255,90,0,0.015) 75%,
            transparent 92%
          );
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 760px) {
          .organic .section-label {
            font-size: 1rem !important;
            line-height: 1.2;
          }
          .organic .tag {
            font-size: 0.86rem;
            padding: 4px 11px;
          }
          .organic .btn-gold {
            width: 100%;
            text-align: center;
            padding: 11px 16px;
          }
          .mobile-menu-link {
            display: flex;
            align-items: center;
          }
          .gl-aura {
            inset: -120px -40vw;
            filter: blur(48px);
          }
        }
      `}</style>

      {/* ── 3D Promo Popup ────────────────────────────────────────── */}
      {showPromo && !show3D && (
        <div className="promo-3d" role="dialog" aria-live="polite">
          <span className="promo-3d-text">
            <span className="promo-3d-sparkle">✦</span>&nbsp; View this site in <em>3D</em>?
          </span>
          <button className="promo-3d-btn" onClick={launch3D}>
            Heck, yeah →
          </button>
          <button className="promo-3d-close" onClick={dismissPromo} aria-label="Dismiss">
            ✕
          </button>
        </div>
      )}

      {/* ── 3D Space Mode (overlay) ───────────────────────────────── */}
      {show3D && <Space3D onExit={() => setShow3D(false)} />}

      <div
        className="page-warp-wrap"
        style={{
          // While in 3D: hidden (visibility:hidden removes it from the rendering pipeline so
          // its layer can't drain GPU). On exit: fades back in with a soft zoom from scale 1.04.
          visibility: show3D ? "hidden" : "visible",
          opacity: show3D ? 0 : 1,
          transform: show3D ? "scale(1.04)" : "scale(1)",
          transformOrigin: "center 30vh",
          transition: show3D
            ? "opacity 0s, transform 0s"
            : "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: show3D ? "none" : "auto",
        }}
      >

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav
        className="nav-bar"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrollY > 60 ? "rgba(10,10,8,0.92)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(201,168,76,0.1)" : "none",
          transition: "all 0.08s ease",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 10px var(--gold)" }} />
          <span className="font-mono" style={{ color: "var(--gold)", fontSize: "1rem", letterSpacing: "0.12em" }}>KS</span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <button onClick={launch3D} className="btn-3d-nav" aria-label="View site in 3D">
            <span className="sparkle">✦</span> View in 3D
          </button>
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="anim-underline font-mono"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === s ? "var(--gold)" : "var(--muted)",
                fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: 0,
              }}
            >
              {NAV_LABELS[s]}
            </button>
          ))}
          <a href="Shankar_Kailash_Resume_2_21_26.pdf" download className="btn-gold" style={{ padding: "7px 20px", fontSize: "0.82rem" }}>
            Resume
          </a>
        </div>

        <button
          className="hamburger hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold)" }}
        >
          {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
        </button>
      </nav>

      {/* Tap-to-close backdrop behind the mobile drawer */}
      <div
        className={`mobile-menu-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="mobile-menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.8} />
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <button
            onClick={() => { launch3D(); setMenuOpen(false); }}
            className="btn-3d-nav"
            style={{ justifyContent: "center", padding: "11px 18px", fontSize: "0.86rem", marginBottom: 4 }}
            aria-label="View site in 3D"
          >
            <span className="sparkle">✦</span> View in 3D
          </button>
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-mono mobile-menu-link"
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
          <a href="Shankar_Kailash_Resume_2_21_26.pdf" download className="btn-gold" style={{ textAlign: "center", marginTop: 6 }}>Resume</a>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="grid-lines" />
        <div className="glow-orb" style={{ width: 500, height: 500, background: "rgba(201,168,76,0.07)", top: "-100px", right: "-100px" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(194,65,12,0.05)", bottom: "100px", left: "-50px" }} />

        {/* ── Animated Golden Stars ── */}
        {STARS.map((s, i) => (
          <svg
            key={i}
            className="hero-star"
            width={s.size}
            height={s.size}
            viewBox="0 0 100 100"
            style={{
              top: s.top,
              left: (s as any).left,
              right: (s as any).right,
              animation: `${s.anim} ${s.dur} ease-in-out infinite ${s.delay}`,
              filter: `drop-shadow(0 0 ${Math.round(s.size * 0.3)}px rgba(201,168,76,0.9)) drop-shadow(0 0 ${Math.round(s.size * 0.7)}px rgba(232,201,110,0.4))`,
            }}
          >
            <defs>
              <linearGradient id={`sg${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#e8c96e" />
                <stop offset="50%"  stopColor="#c9a84c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            {/* Outer star outline */}
            <polygon
              points="50,2 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35"
              fill="none"
              stroke={`url(#sg${i})`}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Inner subtle fill */}
            <polygon
              points="50,18 57,38 79,38 62,50 68,71 50,59 32,71 38,50 21,38 43,38"
              fill="rgba(201,168,76,0.07)"
            />
          </svg>
        ))}

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 48px 80px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }} className="hero-content hero-inner">
          <div className="hero-text" style={{ flex: 1 }}>
            

            <div className="fade-up delay-1" style={{ marginBottom: 4 }}>
              <h2 className="glow-name" style={{
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
                width: "fit-content",
              }}>
                Kailash Shankar
              </h2>
            </div>

            <h1 className="font-hero fade-up delay-2 hero-title"
              style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)", lineHeight: 1, color: "var(--cream)", marginBottom: 8, marginTop: 10 }}>
              <span className="glow-text">Building</span><br />
              <span className="gold-text glow-text-gold">technology</span><br />
              <span className="glow-text">that matters.</span>
            </h1>

            <p className="font-body fade-up delay-3 hero-subtitle"
              style={{ fontSize: "1.3rem", color: "var(--muted)", marginTop: 28, maxWidth: 560, lineHeight: 1.6, fontStyle: "italic" }}>
              <span style={{ color: "var(--cream)" }}>{typed}</span>
              <span className="cursor" />
              <br />
              University of Florida · CS + Linguistics · GPA 4.0
            </p>

            <div className="fade-up delay-4 hero-actions" style={{ display: "flex", gap: 24, marginTop: 44, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => scrollTo("projects")} className="btn-gold">View My Work</button>
              <a href="https://www.linkedin.com/in/kailash-shankar" target="_blank" rel="noreferrer"
                style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", letterSpacing: "0.1em", textDecoration: "none" }}
                className="anim-underline hero-link">
                LinkedIn ↗
              </a>
              <a href="mailto:kailashshankar@ufl.edu"
                style={{ color: "var(--gold)", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", letterSpacing: "0.1em", textDecoration: "none" }}
                className="anim-underline hero-link">
                kailashshankar@ufl.edu →
              </a>
            </div>
          </div>
          <div className="hero-image fade-up delay-2" style={{ flexShrink: 0 }}>
            <div className="profile-wrapper">
              <div className="profile-frame-outer" />
              <div className="profile-frame-inner" />
              <div className="profile-frame-mask" />
              <img src="profile_pic.jpg" alt="Profile" className="profile-img" style={{ width: "clamp(280px, 35vw, 480px)", height: "clamp(280px, 35vw, 480px)", borderRadius: "50%", objectFit: "cover" }} />
            </div>
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

      {/* ── NEXT UP ─────────────────────────────────────────────────── */}
      <section className="organic" style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div className="section-shell" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div className="section-heading" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">Next Up</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>

          <div className="next-up-body" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0" }}>
            <div className="gl-aura" />
            <div className="gl-logo" style={{ position: "relative", zIndex: 1 }} />
            <div style={{ position: "relative", zIndex: 1, marginTop: 48, textAlign: "center" }}>
              <h3 className="font-serif" style={{ color: "var(--cream)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.005em" }}>
                AI Product Builder Intern
              </h3>
              <p className="font-body" style={{ color: "#ffb15a", fontStyle: "italic", fontSize: "1.18rem", marginTop: 12, letterSpacing: "0.04em" }}>
                Summer 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
      <section id="experience" className="organic" style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div className="section-shell" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div className="section-heading" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
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
              emoji=""
              description="Working with a non-profit in Cape Town, I built an interactive mapping application giving residents of underprivileged neighborhoods direct access to local government contacts and a channel to report critical housing issues — from evictions to power outages and water shortages. Every pin on that map represents a family that now has a voice. Built on a MERN stack with a custom REST API, the platform serves 100+ monthly active users across 30+ informal settlements in the Western Cape."
            />
            <ExperienceBlock
              date="Sep 2025 – Present"
              org="UF GatorAI Club"
              location="Gainesville, FL"
              role="Machine Learning Engineer"
              tags={["Next.js", "FastAPI", "Gemini 2.0", "RAG", "ChromaDB"]}
              emoji=""
              description="Built an AI Teaching Assistant that deploys course-specific chatbot instances for 50+ students, with Gemini 2.0 orchestration and custom guardrails that cut hallucination rates by 30% while maintaining academic integrity. Engineered a RAG pipeline with ChromaDB achieving sub-500ms semantic retrieval across 1,000+ academic documents."
            />
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── RESEARCH ────────────────────────────────────────────────── */}
      <section id="research" className="organic" style={{ padding: "120px 0", background: "var(--bg)" }}>
        <div className="section-shell" style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px" }}>
          <div className="section-heading" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 56 }}>
            <span className="section-label">Research</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>

          <p className="font-body" style={{ fontSize: "0.98rem", color: "var(--gold-light)", fontStyle: "italic", marginBottom: 14, letterSpacing: "0.01em" }}>
            Aug 2025 – Present  ·  University of Florida  ·  with Dr. Zoey Liu
          </p>

          <h3 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--cream)", lineHeight: 1.15, marginBottom: 36, fontWeight: 400, letterSpacing: "-0.01em" }}>
            Computational Linguistics Lab
          </h3>

          <p className="font-body research-intro" style={{ fontSize: "1.22rem", lineHeight: 1.8, color: "var(--cream)", marginBottom: 28 }}>
            Language shapes how we see the world — yet most of today&rsquo;s AI speaks only a handful of them fluently. Working with Dr. Zoey Liu, I investigate how <em style={{ color: "var(--gold-light)" }}>data partitioning strategies on LLM training data</em> impact model generalization across the world&rsquo;s linguistic diversity, with a particular focus on low-resource languages that are systematically underrepresented in modern AI.
          </p>

          <p className="font-body research-body" style={{ fontSize: "1.22rem", lineHeight: 1.8, color: "var(--muted)", marginBottom: 64 }}>
            My current work quantifies a fundamental trade-off: <span style={{ color: "var(--cream)" }}>how much does annotation quality matter when data is scarce?</span> By systematically injecting controlled annotation noise into training sets and benchmarking OLMo-2 across 2,000 languages on UF&rsquo;s HiPerGator supercomputer, I&rsquo;m building an empirical map of where AI breaks down — and how to fix it.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
            <span style={{ color: "var(--gold)", opacity: 0.5, fontSize: "1.4rem", letterSpacing: "0.6em" }}>✦ ✦ ✦</span>
          </div>

          <div className="research-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 64 }}>
            {[
              { title: "Quality vs. Quantity", body: "Modeling the trade-off between dataset scale and annotation fidelity — a question with outsized implications for languages where data is precious." },
              { title: "2,000 Languages", body: "Benchmarking across a typologically diverse language set to understand how multilingual scale affects cross-linguistic transfer beyond high-resource clusters." },
              { title: "Morphological Segmentation", body: "Investigating cross-lingual partitioning of morphologically segmented data across language families to improve zero-shot performance for understudied tongues." },
            ].map((c) => (
              <div key={c.title}>
                <h4 className="font-serif" style={{ fontSize: "1.25rem", color: "var(--gold-light)", marginBottom: 12, fontStyle: "italic", fontWeight: 400, letterSpacing: "0.01em" }}>{c.title}</h4>
                <p className="font-body" style={{ fontSize: "1.02rem", color: "var(--muted)", lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            {["Zero-Shot Transfer", "Cross-Lingual NLP", "Data Partitioning", "OLMo-2 (1B)", "HiPerGator HPC", "Low-Resource Languages", "Annotation Noise"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <section id="projects" className="organic" style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div className="section-shell" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div className="section-heading" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 64 }}>
            <span className="section-label">Projects</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>

          <div className="impact-card" style={{ padding: 0, marginBottom: 24, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold), var(--amber))", zIndex: 4 }} />

            <LinguaCarousel
              images={["lingua_0.png", "lingua_1.png", "lingua_2.png", "lingua_3.png", "lingua_4.png", "lingua_5.png", "lingua_6.png", "lingua_7.png"]}
            />

            <div className="lingua-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div className="lingua-copy" style={{ padding: "48px", borderRight: "1px solid var(--border)" }}>
                <p className="font-body" style={{ color: "var(--gold-light)", fontStyle: "italic", fontSize: "0.98rem", marginBottom: 16 }}>Jan 2026 – Present</p>
                <h2 style={{ marginBottom: 8, lineHeight: 1 }}>
                  <a href="https://linguaclassroom.com" target="_blank" rel="noreferrer" className="lingua-link font-display lingua-title-link" style={{ fontSize: "3.8rem", lineHeight: 1 }}>
                    LINGUA
                  </a>
                </h2>
                <p className="font-serif" style={{ color: "var(--gold)", fontSize: "1.15rem", fontStyle: "italic", marginBottom: 24 }}>AI Language Learning Platform</p>
                <p className="font-body" style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--muted)", marginBottom: 28 }}>
                  Lingua is the most powerful LMS ever created for foreign language education. Teachers spend hours upon hours creating and grading assignments - a burdensome task when you have 100+ students. Lingua reduces this to just seconds, allowing teachers to create high-quality reading, writing, listening, and speaking assignments tailored to their curriculum with just a few clicks, auto-graded by AI against their own rubrics and instructions, with personalized feedback for each student.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                  {["React", "Next.js", "Supabase", "Gemini Live & TTS", "Tailwind", "PostgreSQL", "RBAC", "REST API"].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <a href="https://linguaclassroom.com" target="_blank" rel="noreferrer" className="btn-gold">View at linguaclassroom.com →</a>
              </div>
              <div className="lingua-features" style={{ padding: "48px", background: "var(--bg3)" }}>
                <p className="section-label" style={{ marginBottom: 28 }}>Platform Features</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  {[
                    { Icon: MessageCircle, title: "AI Conversation Assignments", body: "Students converse face-to-face with distinct AI characters based on in-class topics, enabling contextually rich, authentic language practice." },
                    { Icon: BookOpen, title: "Reading & Listening Assignments", body: "Teachers create authentic passages, audios, and comprehension questions tailored to their curriculum in just seconds. Students complete them in real-time with instant scoring feedback." },
                    { Icon: Pencil, title: "Writing Assignments", body: "Prompt-based writing tasks, submitted through the platform text editor or handwritten images, are auto-graded by AI against teacher-defined rubrics, and marked up with detailed personalized feedback." },
                    { Icon: Mic, title: "Oral Examinations", body: "Students participate in presentations, conversations and discussions with the AI that are auto-graded with comprehensive feedback." },
                  ].map((f) => (
                    <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <f.Icon size={20} strokeWidth={1.6} style={{ color: "var(--gold-light)", marginTop: 4, flexShrink: 0 }} />
                      <div>
                        <div className="font-serif" style={{ fontSize: "1.02rem", color: "var(--cream)", fontStyle: "italic", marginBottom: 4, letterSpacing: "-0.005em" }}>{f.title}</div>
                        <p className="font-body" style={{ fontSize: "0.98rem", color: "var(--muted)", lineHeight: 1.6 }}>{f.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="project-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              { id: "career", title: "AI Career Coach", date: "Nov – Dec 2025", subtitle: "Resume Optimizer & Interview Simulator", description: "End-to-end AI career prep tool: Gemini-powered ATS-compliant resume generation, mock interview engine with performance persistence, and automated weekly industry skill & salary trend updates via Inngest workflows.", tags: ["Next.js", "NeonDB", "Prisma", "Inngest", "Gemini Flash"], emoji: "" },
              { id: "housing", title: "Home Price Estimator", date: "Oct – Nov 2025", subtitle: "Data Structures · Full-Stack", description: "Full-stack web app delivering neighborhood housing price estimates at 98% accuracy. Implements Red-Black Tree and B-Tree structures to query 100,000+ records in O(log n) time — a C++ backend connected to a React frontend via Next.js.", tags: ["React", "Next.js", "C++", "httplib", "Red-Black Tree"], emoji: "" },
            ].map((p) => (
              <div key={p.id} className="impact-card project-card"
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ padding: "40px", cursor: "default", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: hoveredProject === p.id ? "linear-gradient(90deg, var(--gold), var(--amber))" : "transparent", transition: "background 0.08s" }} />
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
      <section className="organic" style={{ padding: "80px 0", background: "var(--bg2)" }}>
        <div className="section-shell" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div className="section-heading" style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
            <span className="section-label">Technical Arsenal</span>
            <div className="gold-divider" style={{ flex: 1 }} />
          </div>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
            {[
              { cat: "Languages",  items: ["Python", "C/C++", "JavaScript", "HTML/CSS", "MATLAB"] },
              { cat: "Frameworks", items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind CSS"] },
              { cat: "AI/ML",      items: ["Gemini Flash, Live, TTS", "RAG / ChromaDB", "OLMo-2", "Hugging Face"] },
              { cat: "Databases",  items: ["PostgreSQL", "MongoDB", "Supabase", "NeonDB"] },
              { cat: "Tools",      items: ["Docker", "Git", "Linux", "Prisma", "Inngest", "HiPerGator"] },
            ].map((cat) => (
              <div key={cat.cat} className="impact-card skill-card" style={{ padding: "28px 24px" }}>
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
      <section id="contact" className="contact-section" style={{ padding: "120px 0", background: "var(--bg)", position: "relative", overflow: "hidden" }}>

        {/* ── Contact Sparkles ── */}
        {[
          { top: "8%",  left: "4%",   size: 28, dur: "3.5s", delay: "0s",   anim: "sparkleTwinkle" },
          { top: "12%", left: "22%",  size: 18, dur: "2.8s", delay: "0.7s", anim: "sparklePop"     },
          { top: "6%",  right: "8%",  size: 34, dur: "4s",   delay: "0.3s", anim: "sparkleFloat"   },
          { top: "20%", right: "18%", size: 22, dur: "3.2s", delay: "1.5s", anim: "sparkleTwinkle" },
          { top: "75%", left: "6%",   size: 30, dur: "3.8s", delay: "0.9s", anim: "sparkleFloat"   },
          { top: "85%", left: "28%",  size: 20, dur: "2.5s", delay: "2.1s", anim: "sparklePop"     },
          { top: "70%", right: "5%",  size: 36, dur: "4.2s", delay: "0.5s", anim: "sparkleTwinkle" },
          { top: "88%", right: "20%", size: 18, dur: "3s",   delay: "1.8s", anim: "sparklePop"     },
          { top: "40%", left: "2%",   size: 26, dur: "3.6s", delay: "3.0s", anim: "sparkleFloat"   },
          { top: "55%", right: "2%",  size: 22, dur: "2.9s", delay: "1.2s", anim: "sparkleTwinkle" },
          { top: "30%", left: "14%",  size: 16, dur: "2.4s", delay: "4.0s", anim: "sparklePop"     },
          { top: "65%", left: "42%",  size: 28, dur: "3.9s", delay: "0.6s", anim: "sparkleFloat"   },
          { top: "15%", right: "35%", size: 20, dur: "3.1s", delay: "2.5s", anim: "sparkleTwinkle" },
          { top: "92%", left: "55%",  size: 32, dur: "4.5s", delay: "1.0s", anim: "sparkleFloat"   },
          { top: "48%", right: "32%", size: 18, dur: "2.7s", delay: "3.5s", anim: "sparklePop"     },
          { top: "22%", left: "68%",  size: 24, dur: "3.4s", delay: "0.2s", anim: "sparkleTwinkle" },
          { top: "80%", left: "72%",  size: 34, dur: "4.1s", delay: "2.8s", anim: "sparkleFloat"   },
          { top: "35%", right: "48%", size: 16, dur: "2.6s", delay: "4.8s", anim: "sparklePop"     },
          { top: "58%", left: "18%",  size: 22, dur: "3.7s", delay: "1.6s", anim: "sparkleTwinkle" },
          { top: "5%",  left: "50%",  size: 28, dur: "3.3s", delay: "2.3s", anim: "sparkleFloat"   },
          { top: "45%", left: "35%",  size: 20, dur: "3.0s", delay: "5.2s", anim: "sparklePop"     },
          { top: "18%", left: "82%",  size: 26, dur: "4.3s", delay: "1.1s", anim: "sparkleFloat"   },
          { top: "62%", right: "38%", size: 18, dur: "2.9s", delay: "3.8s", anim: "sparkleTwinkle" },
          { top: "95%", left: "16%",  size: 24, dur: "3.6s", delay: "0.4s", anim: "sparklePop"     },
          { top: "28%", right: "62%", size: 30, dur: "4.0s", delay: "2.6s", anim: "sparkleFloat"   },
          { top: "72%", left: "55%",  size: 16, dur: "2.7s", delay: "5.5s", anim: "sparkleTwinkle" },
          { top: "10%", left: "38%",  size: 22, dur: "3.5s", delay: "1.9s", anim: "sparklePop"     },
          { top: "50%", left: "88%",  size: 28, dur: "4.4s", delay: "0.8s", anim: "sparkleFloat"   },
          { top: "82%", right: "55%", size: 20, dur: "3.2s", delay: "4.3s", anim: "sparkleTwinkle" },
          { top: "38%", left: "62%",  size: 18, dur: "2.8s", delay: "6.0s", anim: "sparklePop"     },
        ].map((s, i) => (
          <svg
            key={i}
            className="contact-sparkle"
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            style={{
              top: s.top,
              left: (s as any).left,
              right: (s as any).right,
              animation: `${s.anim} ${s.dur} ease-in-out infinite ${s.delay}`,
              filter: `drop-shadow(0 0 ${Math.round(s.size * 0.5)}px rgba(201,168,76,1)) drop-shadow(0 0 ${Math.round(s.size * 1.0)}px rgba(232,201,110,0.6)) drop-shadow(0 0 ${Math.round(s.size * 1.6)}px rgba(245,200,80,0.25))`,
            }}
          >
            <defs>
              <linearGradient id={`spk${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#f5f0e8" />
                <stop offset="50%"  stopColor="#e8c96e" />
                <stop offset="100%" stopColor="#c9a84c" />
              </linearGradient>
            </defs>
            {/* 4-point sparkle / diamond cross */}
            <path
              d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
              fill={`url(#spk${i})`}
              opacity="0.9"
            />
            {/* tiny inner diamond */}
            <path
              d="M12 8 L13 12 L12 16 L11 12 Z"
              fill="rgba(245,240,232,0.6)"
            />
          </svg>
        ))}
        <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(201,168,76,0.04)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div className="contact-inner" style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <span className="section-label" style={{ display: "block", marginBottom: 20 }}>Let's Build Something</span>
          <h2 className="font-hero contact-title" style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)", color: "var(--cream)", lineHeight: 1.02, marginBottom: 32 }}>
            <span className="glow-text">Real problems.</span><br />
            <span className="gold-text glow-text-gold">Real solutions.</span>
          </h2>
          <p className="font-body contact-copy" style={{ fontSize: "1.2rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 48, fontStyle: "italic" }}>
            I'm looking for opportunities where I can keep doing what I love — building technology that has a genuine impact on real people's lives.
          </p>
          <div className="contact-actions" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:kailashshankar@ufl.edu" className="btn-gold">kailashshankar@ufl.edu</a>
            <a href="https://linkedin.com/in/kailash-shankar" target="_blank" rel="noreferrer" className="btn-gold">LinkedIn ↗</a>
            <a href="https://github.com/Kailash-Shankar" target="_blank" rel="noreferrer" className="btn-gold">GitHub ↗</a>
          </div>
          <div className="gold-divider" style={{ margin: "64px 0 32px" }} />
          <p className="font-mono footer-copy" style={{ color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
            © 2026 KAILASH SHANKAR · GAINESVILLE, FL
          </p>
        </div>
      </section>

      </div>{/* /page-warp-wrap */}
    </>
  );
}

// ── LinguaCarousel ──────────────────────────────────────────────────────────

function LinguaCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{
          width: `${total * 100}%`,
          transform: `translateX(-${(idx * 100) / total}%)`,
        }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Lingua screenshot ${i + 1}`}
            className="carousel-slide"
            style={{ width: `${100 / total}%` }}
          />
        ))}
      </div>

      <button onClick={prev} aria-label="Previous slide" className="carousel-arrow" style={{ left: 18 }}>‹</button>
      <button onClick={next} aria-label="Next slide" className="carousel-arrow" style={{ right: 18 }}>›</button>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`carousel-dot ${i === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── ExperienceBlock ──────────────────────────────────────────────────────────

function ExperienceBlock({ date, org, location, role, tags, emoji, description }: {
  date: string; org: string; location: string; role: string;
  tags: string[]; emoji: string; description: string;
}) {
  return (
    <div className="impact-card experience-card" style={{ padding: "40px 48px", marginBottom: 2 }}>
      <div className="experience-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div className="experience-main" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ fontSize: "2rem", marginTop: 4 }}>{emoji}</div>
          <div>
            <div className="experience-org-row" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4 }}>
              <h3 className="font-serif" style={{ fontSize: "1.5rem", color: "var(--cream)" }}>{org}</h3>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{location}</span>
            </div>
            <div className="font-mono" style={{ color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.06em" }}>{role}</div>
          </div>
        </div>
        <div className="experience-date" style={{ textAlign: "right" }}>
          <div className="font-mono" style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{date}</div>
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        <div className="gold-divider" style={{ marginBottom: 24 }} />
        <p className="font-body experience-description" style={{ fontSize: "1.1rem", lineHeight: 1.78, color: "var(--muted)", marginBottom: 24 }}>{description}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
