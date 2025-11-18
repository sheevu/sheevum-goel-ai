import React, { useEffect, useState } from "react";

// ---- CONFIG: image paths (replace with your Google Drive / public URLs) ----
const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
];

// ---- CONFIG: CTA links from simple.bio/sheevumgoel ----
const primaryLinks = [
  {
    label: "Sudarshan AI Labs",
    href: "https://www.sudarshan-ai-labs.com/",
    tag: "Swadeshi AI for MSMEs",
  },
  {
    label: "Build Blast Brand AI Tools",
    href: "https://build-blast-brand-ai-tools.vercel.app/",
    tag: "Experimental studio",
  },
  {
    label: "Simple.bio – All Bio",
    href: "https://simple.bio/sheevumgoel",
    tag: "Link tree & press kit",
  },
  {
    label: "Amulyam Enterprises",
    href: "https://www.amulyam-enterprises.com/",
    tag: "FMCG & Retail Ecosystem",
  },
  {
    label: "Mosh Inc – Swadeshi Store",
    href: "https://www.moshfmcg.com/",
    tag: "D2C Swadeshi FMCG",
  },
  {
    label: "Leeila AI – India’s First Female AI Agent",
    href: "https://agent.jotform.com/0195a40b333a7b0287706affb225662921e4",
    tag: "AI Persona",
  },
  {
    label: "About Me (Canva Story)",
    href: "https://sudarshan-ai-labs.my.canva.site/founder",
    tag: "Visual Founder Story",
  },
  {
    label: "Sheevum AI – My AI Agent",
    href: "https://sensay.io",
    tag: "Chat with My AI Twin",
  },
  {
    label: "Nirbhaya-GPT",
    href: "https://claude.site",
    tag: "Safety-focused AI",
  },
];

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/sheevum" },
  { label: "Medium Blog", href: "https://medium.com/@sheevumgoel" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sheevumgoel/" },
  { label: "Facebook", href: "https://www.facebook.com/sheevum.gillu1" },
  {
    label: "Soundcloud",
    href: "https://soundcloud.com/sheevum-goel?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  { label: "Blogspot", href: "https://sheevum.blogspot.com/" },
  { label: "GitHub", href: "https://github.com/sheevu" },
  { label: "Tumblr", href: "https://www.tumblr.com/sheevumgoel?source=share" },
  { label: "Pinterest", href: "https://in.pinterest.com/sheevumgoel/" },
  { label: "Reddit", href: "https://www.reddit.com/r/navanetra/" },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?hl=en&user=3jHm_FcAAAAJ",
  },
  { label: "WhatsApp", href: "https://wa.me/+919336299912" },
];

const aboutHighlights = [
  {
    title: "On-field learning",
    copy:
      "A decade inside retail counters, kiranas and township stores taught me that automation must respect local rhythms, margins and trust.",
  },
  {
    title: "Hindi-first intelligence",
    copy:
      "Every conversation, prompt and follow-up is written in Hinglish/Hindi templates so Bharat's MSMEs feel understood, not translated.",
  },
  {
    title: "Swadeshi impact",
    copy:
      "The mission is to make 600M dukaan owners feel the lift of AI while keeping their data, ownership and stories within Bharat.",
  },
];

const aboutStats = [
  { label: "Retail trenches", value: "10+ years" },
  { label: "MSME pilots", value: "200+ stores" },
  { label: "Languages", value: "Hindi · Awadhi · Bhojpuri" },
];

const email = "sheevum.goel@gmail.com";

// Small helper components
const GradientRing = ({ children }) => (
  <div className="relative inline-flex items-center justify-center rounded-full p-[3px] bg-[conic-gradient(at_top,_#ff7b00,#ff3b5c,#ffdd55,#ff7b00)] shadow-[0_0_40px_rgba(248,113,113,0.55)] animate-[spin_16s_linear_infinite]">
    <div className="rounded-full bg-gradient-to-b from-black via-[#0b0614] to-black p-1">
      <div className="rounded-full overflow-hidden">{children}</div>
    </div>
  </div>
);

const Section = ({ id, kicker, title, children, delay = 0, showDivider = true }) => (
  <section
    id={id}
    className="section-anim py-14 px-4 md:px-6 lg:px-0 max-w-5xl mx-auto scroll-mt-24"
    style={{ animationDelay: `${delay}s` }}
  >
    <p className="text-xs tracking-[0.24em] uppercase text-orange-400/80 mb-2">
      {kicker}
    </p>
    <h2 className="text-2xl md:text-[1.9rem] font-semibold text-slate-50 mb-3">
      {title}
    </h2>
    {children}
    {showDivider && <div className="section-divider mt-6" />}
  </section>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`relative rounded-2xl bg-gradient-to-br from-[#050509] via-[#05010f] to-[#140016] border border-orange-500/30 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0_0,#ff7b00_0,transparent_55%),radial-gradient(circle_at_100%_0,#f97316_0,transparent_55%),radial-gradient(circle_at_50%_120%,#f97316_0,transparent_50%)]" />
    <div className="relative z-10 p-5 md:p-6">{children}</div>
  </div>
);

const StatPill = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs md:text-[0.8rem]">
    <span className="text-slate-300">{label}</span>
    <span className="text-orange-300 font-semibold">{value}</span>
  </div>
);

const HeroIcon = () => (
  <div className="relative flex items-center justify-center">
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/40 via-transparent to-slate-900 blur-3xl" />
    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-orange-500/30 bg-gradient-to-br from-black/60 to-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
      <span className="absolute inset-0 rounded-full border border-white/10 blur-[2px] opacity-60" />
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-orange-400/70 via-orange-500/30 to-transparent shadow-[0_20px_40px_rgba(248,113,22,0.45)]">
        <div className="absolute inset-0 animate-hero-orbit">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.7)]" />
        </div>
        <svg viewBox="0 0 64 64" className="h-20 w-20 text-white/90">
          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M16 32h32M32 16v32"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <text x="32" y="38" textAnchor="middle" fontSize="16" fill="currentColor">
            AI
          </text>
        </svg>
      </div>
    </div>
  </div>
);

const HeroMotionAccent = () => (
  <div className="hero-motion-accent">
    <span />
    <span />
  </div>
);

const LinkTogglePanel = ({ link, isActive, onToggle }) => (
  <div
    className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-black/60 via-black/30 to-black/20 px-4 py-1 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-500 ${
      isActive ? "shadow-[0_10px_40px_rgba(249,115,22,0.45)]" : ""
    }`}
  >
    <button
      type="button"
      onClick={() => onToggle(link.label)}
      className="flex w-full items-center justify-between gap-3 rounded-[1.5rem] px-3 py-4 text-left text-white transition-colors duration-300 hover:text-orange-100"
    >
      <div className="flex items-center gap-3">
        <span
          className="platform-icon"
          style={{
            backgroundImage: link.iconGradient,
            boxShadow: link.iconShadow,
          }}
        >
          {link.icon}
        </span>
        <div>
          <p className="text-sm font-semibold tracking-[0.15em] text-orange-200">
            {link.label}
          </p>
          <p className="text-[0.76rem] text-slate-400">{link.meta}</p>
        </div>
      </div>
      <span
        className={`text-xs font-semibold uppercase tracking-[0.35em] transition-transform duration-300 ${
          isActive ? "rotate-45 text-emerald-300" : "text-orange-300"
        }`}
      >
        {isActive ? "−" : "+"}
      </span>
    </button>
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        maxHeight: isActive ? 180 : 0,
        opacity: isActive ? 1 : 0,
      }}
    >
      <div className="mt-2 rounded-[1.25rem] bg-white/5 px-4 py-3 text-[0.78rem] text-slate-300">
        <p className="text-[0.72rem] uppercase tracking-[0.3em] text-slate-500">
          Verified destination
        </p>
        <p className="break-all">{link.href}</p>
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-orange-500/60 bg-gradient-to-r from-orange-500/40 to-transparent px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-orange-100 transition hover:border-transparent hover:brightness-110"
        >
          Launch
          <span className="text-emerald-200">↗</span>
        </a>
      </div>
    </div>
  </div>
);

const GallerySlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      return undefined;
    }
    const timer = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const move = (direction) => {
    setIndex((prev) => {
      if (direction === "next") {
        return prev === images.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/40 bg-black/40 shadow-[0_35px_70px_rgba(0,0,0,0.7)] aspect-[16/9] md:aspect-[3/1]">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={`${src}-${idx}`} className="min-w-full h-full">
            <img
              src={src}
              alt={`Gallery slide ${idx + 1}`}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
        <button
          type="button"
          onClick={() => move("prev")}
          className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-white transition hover:border-orange-400 hover:text-orange-300"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => move("next")}
          className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] text-white transition hover:border-orange-400 hover:text-orange-300"
        >
          Next
        </button>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === index ? "w-12 bg-orange-300" : "w-6 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const allDocLinks = [
  {
    label: "Simple.bio – All Bio",
    href: "https://simple.bio/sheevumgoel",
    meta: "Single tap to every update",
  },
  {
    label: "Build Blast Brand AI Tools",
    href: "https://build-blast-brand-ai-tools.vercel.app/",
    meta: "Experimental playspace",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sheevum.gillu1",
    meta: "Community updates",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheevumgoel/",
    meta: "Professional network",
  },
  {
    label: "Medium Blog",
    href: "https://medium.com/@sheevumgoel",
    meta: "Deep dives on Bharat & AI",
  },
  {
    label: "Soundcloud",
    href: "https://soundcloud.com/sheevum-goel?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    meta: "Audio notes & whispers",
  },
  {
    label: "Blogspot",
    href: "https://sheevum.blogspot.com/",
    meta: "Long-form essays & stories",
  },
  { label: "X (Twitter)", href: "https://x.com/sheevum", meta: "Live pulses" },
  { label: "GitHub", href: "https://github.com/sheevu", meta: "Code lab" },
  { label: "Sudarshan AI Labs", href: "https://www.sudarshan-ai-labs.com/", meta: "Swadeshi AI studio" },
  {
    label: "Tumblr",
    href: "https://www.tumblr.com/sheevumgoel?source=share",
    meta: "Visual fragments",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?hl=en&user=3jHm_FcAAAAJ",
    meta: "Academic citations",
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1v17h2ts8DAWKfDyZEdUGZSayFp_Ujp5F/view?usp=sharing",
    meta: "Downloadable CV",
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/sheevumgoel/",
    meta: "Mood boards",
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/r/navanetra/",
    meta: "Community forum",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+919336299912",
    meta: "Instant DM",
  },
  { label: "Gmail", href: `mailto:${email}`, meta: "Direct email" },
];

const iconPalette = {
  "Simple.bio – All Bio": { icon: "SB", gradient: "linear-gradient(135deg,#ec4899,#f97316)" },
  "Build Blast Brand AI Tools": { icon: "BB", gradient: "linear-gradient(135deg,#10b981,#0ea5e9)" },
  Facebook: { icon: "FB", gradient: "linear-gradient(135deg,#2563eb,#1d4ed8)" },
  LinkedIn: { icon: "IN", gradient: "linear-gradient(135deg,#0ea5e9,#2563eb)" },
  "Medium Blog": { icon: "MD", gradient: "linear-gradient(135deg,#facc15,#fc8181)" },
  Soundcloud: { icon: "SC", gradient: "linear-gradient(135deg,#f97316,#facc15)" },
  Blogspot: { icon: "BS", gradient: "linear-gradient(135deg,#fcd34d,#fb923c)" },
  "X (Twitter)": { icon: "XT", gradient: "linear-gradient(135deg,#0ea5e9,#0284c7)" },
  GitHub: { icon: "GH", gradient: "linear-gradient(135deg,#111827,#475467)" },
  "Sudarshan AI Labs": { icon: "SA", gradient: "linear-gradient(135deg,#0f766e,#22d3ee)" },
  Tumblr: { icon: "TB", gradient: "linear-gradient(135deg,#7c3aed,#c084fc)" },
  "Google Scholar": { icon: "GS", gradient: "linear-gradient(135deg,#facc15,#22c55e)" },
  Resume: { icon: "CV", gradient: "linear-gradient(135deg,#f97316,#fb7185)" },
  Pinterest: { icon: "PT", gradient: "linear-gradient(135deg,#f43f5e,#ec4899)" },
  Reddit: { icon: "RD", gradient: "linear-gradient(135deg,#f97316,#fb7185)" },
  WhatsApp: { icon: "WA", gradient: "linear-gradient(135deg,#16a34a,#22c55e)" },
  Gmail: { icon: "GM", gradient: "linear-gradient(135deg,#ef4444,#f97316)" },
};

const getIconLabel = (label) => {
  const parts = label
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? "");
  if (parts.length >= 2) {
    return `${parts[0]}${parts[1]}`;
  }
  return label.slice(0, 2).toUpperCase();
};

const docLinks = allDocLinks.map((link) => {
  const palette = iconPalette[link.label];
  return {
    ...link,
    icon: palette?.icon ?? getIconLabel(link.label),
    iconGradient:
      palette?.gradient ??
      "linear-gradient(135deg,rgba(249,115,22,0.9),rgba(251,191,36,0.8))",
    iconShadow:
      palette?.shadow ??
      "0 15px 40px rgba(249,115,22,0.35), inset 0 -2px 10px rgba(0,0,0,0.4)",
  };
});

const SheevumPortfolio = () => {
  const [activeLink, setActiveLink] = useState(docLinks[0]?.label ?? "");

  const handleToggleLink = (label) => {
    setActiveLink((current) => (current === label ? "" : label));
  };

  return (
    <div className="min-h-screen bg-[#050509] text-slate-50">
      {/* Floating vibrant gradient background */}
      <div className="fixed inset-0 -z-20 opacity-80 bg-[radial-gradient(circle_at_0%_0%,rgba(249,115,22,0.36),transparent_55%),radial-gradient(circle_at_90%_10%,rgba(251,191,36,0.22),transparent_55%),radial-gradient(circle_at_20%_90%,rgba(59,130,246,0.35),transparent_60%)] blur-3xl" />

      {/* Top chrome bar just for aesthetic */}
      <div className="h-9 w-full bg-black/60 border-b border-slate-700/60 flex items-center px-4 gap-2 sticky top-0 z-30 backdrop-blur-xl">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <p className="text-[0.7rem] text-slate-300/80">sheevum-goel · founder portfolio · swadeshi ai</p>
      </div>

      {/* NAV + HERO */}
      <header className="sticky top-9 z-20 backdrop-blur-xl bg-black/50 border-b border-orange-500/20">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[conic-gradient(at_top,_#f97316,#fb923c,#facc15,#a855f7,#f97316)] shadow-[0_0_40px_rgba(248,250,252,0.4)] animate-[spin_12s_linear_infinite]" />
            <div>
              <p className="text-[0.75rem] uppercase tracking-[0.3em] text-orange-400/80">
                Sheevum Goel
              </p>
              <p className="text-[0.7rem] text-slate-300/80">
                Brand'e'prenuer · MSME Growth Catalyst
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[0.8rem] text-slate-200/80">
            <a href="#about" className="hover:text-orange-300 transition-colors">
              About
            </a>
            <a href="#highlight" className="hover:text-orange-300 transition-colors">
              Swadeshi CRM
            </a>
            <a href="#ventures" className="hover:text-orange-300 transition-colors">
              Ventures
            </a>
            <a href="#thoughts" className="hover:text-orange-300 transition-colors">
              Writing
            </a>
            <a href="#contact" className="hover:text-orange-300 transition-colors">
              Contact
            </a>
          </div>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-black text-[0.75rem] font-semibold px-3.5 py-1.5 shadow-[0_14px_35px_rgba(249,115,22,0.65)] hover:brightness-110 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.4)]" />
            Let&apos;s talk
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0">
        <section className="relative pt-10 pb-12 grid md:grid-cols-[1.25fr_minmax(0,1fr)] gap-10 items-center overflow-visible">
          <div className="pointer-events-none absolute -top-6 right-0 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.5),transparent_60%)] blur-3xl halo-pulse md:block" />
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-black/40 px-3 py-1 text-[0.75rem] text-orange-200/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.4)]" />
              Building Swadeshi AI for Bharat
            </p>
            <h1 className="mt-4 text-[2.1rem] md:text-[2.6rem] leading-tight font-semibold">
              Hi, I&apos;m
              <span className="block text-transparent bg-clip-text bg-[radial-gradient(circle_at_0%_0%,#f97316,transparent_55%),radial-gradient(circle_at_100%_0%,#fb923c,transparent_55%),radial-gradient(circle_at_0%_100%,#facc15,transparent_45%)] drop-shadow-[0_0_35px_rgba(249,115,22,0.65)]">
                Sheevum Goel
              </span>
            </h1>
            <p className="mt-3 text-[0.95rem] text-slate-200/90 max-w-xl">
              Founder of Sudarshan AI Labs · CEO & MSME Growth Catalyst ·
              Brand&apos;e&apos;prenuer on a mission to empower 600M Indians with
              inclusive, Hindi-first AI for earning, selling, learning &
              harmonious growth.
            </p>

            <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 text-[0.8rem]">
              <StatPill label="World&apos;s 1st Swadeshi Hindi AI CRM" value="Vyapaar OS" />
              <StatPill label="Focus" value="MSME · FMCG · Retail" />
              <StatPill label="Base" value="Lucknow · Uttar Pradesh" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-[0.85rem]">
              <a
                href="#highlight"
                className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-black font-semibold px-4 py-2 shadow-[0_16px_45px_rgba(249,115,22,0.75)] overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/35 translate-x-[-120%] skew-x-[-18deg] animate-[shimmer_2s_ease-out_infinite]" />
                <span className="relative z-10">See Swadeshi CRM in action</span>
              </a>
              <a
                href={primaryLinks[0].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 bg-black/40 px-4 py-2 text-orange-100/90 hover:bg-orange-500/10 transition-colors"
              >
                Visit Sudarshan AI Labs
              </a>
              <a
                href={socialLinks[2].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-500/60 bg-black/40 px-4 py-2 text-slate-100/90 hover:bg-slate-200/10 transition-colors"
              >
                View LinkedIn
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-slate-400">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/80 to-transparent signal-line" />
              <span className="whitespace-nowrap">Swadeshi AI heartbeat</span>
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/80 to-transparent signal-line" />
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="relative overflow-visible w-full max-w-xs md:max-w-sm">
              <HeroMotionAccent />
              <div className="flex flex-col items-center gap-3">
                <GradientRing>
                  <HeroIcon />
                </GradientRing>
                <p className="text-[0.8rem] text-orange-100/90 uppercase tracking-[0.25em]">
                  Founder · Sudarshan AI Labs
                </p>
                <p className="text-[0.85rem] text-center text-slate-100/85">
                  Designing Uni-commerce & Hindi AI CRM so that every dukaan
                  in Bharat can behave like a smart, data-led brand.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* ABOUT SECTION */}
      <Section
        id="about"
        kicker="Founder Story"
        title="From FMCG shop floors to AI-powered MSME revolution"
        delay={0.1}
      >
        <div className="grid md:grid-cols-[1.6fr_minmax(0,1fr)] gap-8 mt-2">
          <div className="text-[0.9rem] text-slate-200/90 leading-relaxed space-y-3">
            <p>
              I started my journey in the trenches of India&apos;s FMCG & retail
              ecosystem — selling, negotiating, and understanding how every
              margin rupee decides whether a kirana survives or shuts down.
            </p>
            <p>
              That ground reality birthed <span className="text-orange-300 font-semibold">Sudarshan AI Labs</span> – a
              Swadeshi-first, Hindi-forward AI studio building tools that keep
              Indian MSMEs, not quick-commerce apps, at the centre of growth.
            </p>
            <p>
              Today I work with retailers, founders, creators and
              professionals to help them:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-200/90">
              <li>Launch digital storefronts without dependency on big tech.</li>
              <li>Automate sales, CRM & outreach in Hindi + regional languages.</li>
              <li>Turn scattered data into decisions, not just dashboards.</li>
            </ul>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-orange-100 mb-3">
              Snapshot
            </h3>
            <div className="space-y-2 text-[0.85rem]">
              <div className="flex justify-between gap-4">
                <span className="text-slate-300/90">Roles</span>
                <span className="text-right text-orange-200">
                  Founder · CEO · Brand&apos;e&apos;prenuer
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-300/90">Domains</span>
                <span className="text-right text-orange-200">
                  AI · FMCG · Retail · MSME
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-300/90">Based in</span>
                <span className="text-right text-orange-200">Lucknow, UP</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-300/90">Mission</span>
                <span className="text-right text-orange-200">
                  Empower 600M Indians with inclusive AI
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* HIGHLIGHTED SWADESHI CRM SECTION */}
      <Section
        id="highlight"
        kicker="Flagship Build"
        title="World&apos;s first Swadeshi Hindi-First CRM with AI Agent"
        delay={0.2}
      >
        <Card className="mt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-7">
            <div className="md:w-7/12 space-y-3 text-[0.9rem] text-slate-50/90">
              <h3 className="text-lg font-semibold text-orange-100">
                Vyapaar OS · Hindi Voice CRM for MSMEs
              </h3>
              <p>
                A uni-commerce command centre where shopkeepers talk in Hindi /
                Hinglish, and the AI agent responds with leads, follow-ups,
                billing, reminders and insights — not jargon.
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <span className="font-semibold text-orange-200">Hindi-first agentic CRM</span> – voice, WhatsApp &
                  web flows tuned for Indian business lingo.
                </li>
                <li>
                  <span className="font-semibold text-orange-200">Uni-commerce layer</span> – unify offline counters,
                  D2C, marketplaces & quick-commerce into one truth.
                </li>
                <li>
                  <span className="font-semibold text-orange-200">Swadeshi data gravity</span> – designed to keep
                  ownership, context and value in Bharat.
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-3 text-[0.8rem]">
                <a
                  href={primaryLinks[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-black font-semibold px-4 py-2 shadow-[0_16px_45px_rgba(249,115,22,0.75)]"
                >
                  Explore MSME Solutions
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-400/70 bg-black/50 px-4 py-2 text-orange-100/90 hover:bg-orange-500/10 transition-colors"
                >
                  Book a founder-to-founder jam
                </a>
              </div>
            </div>

            <div className="md:w-5/12">
              <div className="relative">
                <div className="absolute -inset-8 bg-[conic-gradient(from_220deg,_rgba(249,115,22,0.3),rgba(251,191,36,0.1),rgba(56,189,248,0.2),rgba(249,115,22,0.3))] blur-3xl opacity-70 animate-[spin_18s_linear_infinite] floaty-slow" />
                <div className="relative rounded-2xl bg-black/70 border border-orange-400/40 p-4 space-y-4 text-[0.8rem]">
                  <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">
                    MSME cockpit · sample view
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-200/90">
                      <span>Today&apos;s AI-qualified leads</span>
                      <span className="text-orange-300 font-semibold">37</span>
                    </div>
                    <div className="flex justify-between text-slate-200/90">
                      <span>Auto follow-ups (Hindi voice)</span>
                      <span className="text-orange-300 font-semibold">112</span>
                    </div>
                    <div className="flex justify-between text-slate-200/90">
                      <span>Revenue impact (last 30 days)</span>
                      <span className="text-emerald-300 font-semibold">+31%</span>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
                  <p className="text-[0.78rem] text-slate-300/90">
                    "Agar dukaan bol sakti, toh yahi bolti – data se dosti karo,
                    guesswork ko retire karo." – Vyapaar OS, in Hindi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* VENTURES & CTAS */}
      <Section
        id="ventures"
        kicker="Ecosystem"
        title="Ventures, experiments & AI side quests"
        delay={0.3}
      >
        <div className="grid md:grid-cols-3 gap-4 mt-2 text-[0.85rem]">
          {primaryLinks.map((link) => (
            <Card key={link.label} className="group bg-black/70 border border-orange-500/40">
              <div className="flex flex-col gap-2">
                <p className="text-xs tracking-[0.22em] uppercase text-orange-300/80">
                  {link.tag}
                </p>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold group-hover:text-orange-200 transition-colors"
                >
                  {link.label}
                </a>
                <p className="text-[0.78rem] text-slate-200/85">
                  Tap to explore how this piece plugs into the larger
                  Bharat-first AI stack.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* THOUGHT LEADERSHIP / WRITING SECTION */}
      <Section
        id="thoughts"
        kicker="Writing & POV"
        title="Where I rant (with data) about Bharat, AI & quick-commerce"
        delay={0.4}
      >
        <div className="grid md:grid-cols-[1.5fr_minmax(0,1fr)] gap-8 mt-2 text-[0.9rem]">
          <div className="space-y-3 text-slate-200/90 leading-relaxed">
            <p>
              I write deep dives on how quick-commerce, VC incentives and
              imported playbooks distort India&apos;s retail and startup ecosystem –
              and how Swadeshi, MSME-centric AI can rebalance the equation.
            </p>
            <p>
              Expect unapologetically Indian POVs, election-time data analysis,
              and frameworks for founders who want to build profitably, not just
              virally.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <StatPill
                label="Flagship essay"
                value="Beyond Dukaandari: India&apos;s startup reality check"
              />
              <StatPill
                label="Focus threads"
                value="Quick-commerce, MSME survival, AI for Bharat"
              />
            </div>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-orange-100 mb-3">
              Read & follow
            </h3>
            <div className="space-y-2 text-[0.85rem]">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:bg-orange-500/10 transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-orange-200">Open</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="journey"
        kicker="More about me"
        title="Why Bharat’s MSMEs keep me awake"
        delay={0.5}
      >
        <Card className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-[0.95rem] text-slate-200/85">
            <p>
              More than a founder, I am a field learner who still spends weeks
              inside kiranas, onboarding teams and twisting AI into local words.
            </p>
            <p>
              From FMCG floors to AI rooms, the throughline is simple: technology
              should listen before it speaks. That is the ethos behind Sudarshan
              AI Labs and the Swadeshi CRM stack.
            </p>
            <div className="grid gap-3">
              {aboutStats.map((stat) => (
                <StatPill
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {aboutHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[0.85rem] text-slate-200/90"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">
                  {item.title}
                </p>
                <p className="mt-2">{item.copy}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* GALLERY SECTION */}
      <Section
        id="gallery"
        kicker="Gallery"
        title="Stage, streets, rooftops – the energy that powers the work"
        delay={0.6}
      >
        <GallerySlider images={galleryImages} />
        <p className="mt-4 text-[0.85rem] text-slate-300/80">
          Captured moments from field trips, founder sessions and policy huddles.
          Swipe or wait for the slider to unveil the feels behind every venture.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.45em] text-orange-300/70">
          <span>Field-to-AI stories</span>
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          <span>Studio stills</span>
        </div>
      </Section>

      {/* ALL LINKS SECTION */}
      <Section
        id="links"
        kicker="Reference CTAs"
        title="Tap into the verified Sheevum ecosystem"
        delay={0.7}
      >
        <p className="text-[0.85rem] text-slate-300/80 max-w-3xl">
          Every toggle below reveals the destination and lets you launch the full
          profile in one smooth motion. Pick a card, read the meta, then tap
          launch when you&apos;re ready to dive deeper.
        </p>
        <div className="space-y-3 mt-5">
          {docLinks.map((link) => (
            <LinkTogglePanel
              key={link.href}
              link={link}
              isActive={activeLink === link.label}
              onToggle={handleToggleLink}
            />
          ))}
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section
        id="contact"
        kicker="Let&apos;s build for Bharat"
        title="Collaborations, pilots & unapologetically Swadeshi ideas"
        delay={0.8}
        showDivider={false}
      >
        <Card className="mt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-6 text-[0.9rem]">
            <div className="md:w-7/12 space-y-3 text-slate-200/90">
              <p>
                If you&apos;re an MSME founder, FMCG brand, policy thinker or
                creator who believes Bharat deserves better than copy-paste
                Silicon Valley templates, let&apos;s jam.
              </p>
              <p>
                I love brainstorming:
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Hindi-first CRM pilots for cities & small towns.</li>
                <li>Election / policy data projects grounded in ethics.</li>
                <li>Swadeshi AI stacks for sectors like retail, agri, BFSI.</li>
              </ul>
            </div>

            <div className="md:w-5/12 space-y-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 text-black font-semibold px-4 py-2.5 shadow-[0_16px_45px_rgba(249,115,22,0.75)]"
              >
                Email Sheevum
              </a>
              <a
                href={socialLinks[2].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-orange-400/70 bg-black/60 px-4 py-2.5 text-orange-100/90 hover:bg-orange-500/10 transition-colors"
              >
                Connect on LinkedIn
              </a>
              <p className="text-[0.78rem] text-slate-300/90 text-center">
                PS: I reply fastest when you share context – who you are, what
                you&apos;re building, and how AI can tilt the game in your favour.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="pb-8 px-4 md:px-6 lg:px-0 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[0.75rem] text-slate-400/80">
        <p>
          © {new Date().getFullYear()} Sheevum Goel · Sudarshan AI Labs · Built with
          Swadeshi intent.
        </p>
        <p>"Vyapaar ka AI Yug – har dukandaar ki digital kranti."</p>
      </footer>

      {/* keyframe definitions for custom animations used above */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </div>
  );
};

export default SheevumPortfolio;
