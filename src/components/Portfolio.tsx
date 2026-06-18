"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Code,
  Gamepad2,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SkillLogos } from "./SkillLogos";
import { FlowButton } from "./ui/flow-button";
import Image from "next/image";
import { CosmicParallaxBg } from "./ui/parallax-cosmic-background";
import { motion } from "framer-motion";
import FlowingMenu from "./ui/FlowingMenu";
import BorderGlow from "./ui/BorderGlow";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project Details
const projects = [
  {
    id: "doaba-sports",
    num: "01",
    title: "Doaba Sports",
    tagline: "Full-Stack eCommerce Platform",
    year: "2025 - 2026",
    tech: ["Next.js 16", "TypeScript", "Redis", "PostgreSQL", "TailwindCSS"],
    description:
      "Built a full-stack eCommerce platform featuring secure authentication, Redis-based caching, rate limiting, and external API integrations. Designed a comprehensive Admin Dashboard optimizing performance for high-traffic scenarios.",
    url: "https://doaba-sports.vercel.app/",
    type: "ecommerce",
  },
  {
    id: "ai-design-tool",
    num: "02",
    title: "AI Design Tool",
    tagline: "Natural Language Architecture Generator",
    year: "2026",
    tech: [
      "Next.js",
      "TypeScript",
      "Upstash Vector",
      "Cloudflare Agents SDK",
      "AI SDK",
    ],
    description:
      "Developed an AI-powered tool generating cloud architecture diagrams from natural language. Integrated RAG via Upstash Vector for semantic search and AI agent workflows using Durable Objects for persistent session state.",
    url: "https://github.com/Sufyaan8/ai-design",
    type: "ai",
  },
  {
    id: "navasana",
    num: "03",
    title: "Navasana Frontend",
    tagline: "Modern UI/UX Design System",
    year: "2026",
    tech: ["React.js", "TailwindCSS", "JavaScript", "UI/UX Optimization"],
    description:
      "Developed a modern, responsive frontend with a strong focus on clean UI/UX, reusable component architecture, and optimized client-side rendering performance.",
    url: "https://navasana.ai/",
    type: "ui",
  },
  {
    id: "xpertspot-website",
    num: "04",
    title: "XpertSpot Official",
    tagline: "Corporate Brand Presence",
    year: "2025 - 2026",
    tech: ["React.js", "JavaScript", "TailwindCSS", "Responsive Layouts"],
    description:
      "Delivered the complete UI/UX for the company's public-facing website. Built reusable styling modules and fully responsive layouts for a polished corporate web experience.",
    url: "https://xpertspot.com/",
    type: "landing",
  },
  {
    id: "e-tailor",
    num: "05",
    title: "E-Tailor",
    tagline: "Tailoring Management Platform",
    year: "2025",
    tech: ["React.js", "TailwindCSS", "REST APIs", "Dashboard Systems"],
    description:
      "Built the custom frontend and integrated with secure backend APIs to deliver a functional tailoring management platform featuring an intuitive admin interface.",
    url: "https://e-tailor-admin.vercel.app/",
    type: "dashboard",
  },
  {
    id: "cave-runner",
    num: "06",
    title: "Cave Runner Endless",
    tagline: "Endless Runner Web Game",
    year: "2025",
    tech: ["JavaScript", "HTML5 Canvas", "Game Loop", "Physics Engine"],
    description:
      "Developed an endless runner browser game where players dodge obstacles and navigate through subterranean caves. Engineered native HTML5 Canvas renderers for 60fps performance.",
    url: "https://cave-endless-run.netlify.app/",
    type: "game",
  },
];

// Skills Structure
const skillCategories = [
  {
    text: "Languages",
    skills: [
      { name: "JavaScript", id: "javascript" },
      { name: "TypeScript", id: "typescript" },
      { name: "HTML5", id: "html" },
      { name: "CSS3", id: "css" },
      { name: "PHP", id: "php" },
    ],
  },
  {
    text: "Frameworks & Runtimes",
    skills: [
      { name: "React.js", id: "react" },
      { name: "Next.js", id: "nextjs" },
      { name: "Node.js", id: "nodejs" },
      { name: "Express.js", id: "express" },
    ],
  },
  {
    text: "Databases & AI",
    skills: [
      { name: "PostgreSQL", id: "postgresql" },
      { name: "MongoDB", id: "mongodb" },
      { name: "SQL", id: "sql" },
      { name: "SQLite", id: "sqlite" },
      { name: "Supabase", id: "supabase" },
      { name: "Prisma", id: "prisma" },
      { name: "Upstash Vector", id: "upstash" },
      { name: "AI SDK / Agents", id: "aisdk" },
    ],
  },
  {
    text: "Tools & Styling",
    skills: [
      { name: "TailwindCSS", id: "tailwind" },
      { name: "Material UI", id: "mui" },
      { name: "Bootstrap", id: "bootstrap" },
      { name: "Dribbble", id: "dribbble" },
      { name: "Git & GitHub", id: "git" },
      { name: "Vercel / Cloudflare", id: "vercel" },
    ],
  },
  {
    text: "Auth Clients",
    skills: [
      { name: "Clerk", id: "clerk" },
      { name: "Next Auth", id: "nextauth" },
      { name: "Auth0", id: "auth0" },
      { name: "Firebase", id: "firebase" },
    ],
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDark, setIsDark] = useState(false); // Default is light/white theme now
  const [activeProjIndex, setActiveProjIndex] = useState(0);

  useGSAP(
    () => {
      // 1. Initial Hero Animations
      const tl = gsap.timeline();
      tl.fromTo(
        ".nav-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      )
        .fromTo(
          ".hero-reveal",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-image",
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-stat",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4",
        );

      // 2. Projects Section Entrance Animation
      gsap.fromTo(
        "#section-projects .projects-header, #section-projects .carousel-wrapper",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#section-projects",
            start: "top 65%",
          },
        },
      );

      // Watermark Parallax on scroll
      gsap.fromTo(
        "#section-projects .watermark-text",
        { y: 30 },
        {
          y: -30,
          scrollTrigger: {
            trigger: "#section-projects",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 3. Skills Section Animations
      gsap.fromTo(
        ".skills-title, .skills-subtitle",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#section-skills",
            start: "top 70%",
          },
        },
      );

      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#section-skills",
            start: "top 60%",
          },
        },
      );

      // 4. Contact Section Animations
      gsap.fromTo(
        ".contact-reveal",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#section-contact",
            start: "top 70%",
          },
        },
      );

      // 5. Scroll Spy for Navigation Active State
      const sectionIds = ["hero", "projects", "skills", "contact"];
      sectionIds.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#section-${id}`,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    },
    { scope: containerRef },
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProjectChange = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= projects.length) return;

    gsap.to(".project-slide-content", {
      opacity: 0,
      x: nextIndex > activeProjIndex ? -40 : 40,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveProjIndex(nextIndex);

        // Animate the text watermark fade
        gsap.fromTo(
          ".watermark-text",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
        );

        // Slide in new content
        gsap.fromTo(
          ".project-slide-content",
          {
            opacity: 0,
            x: nextIndex > activeProjIndex ? 40 : -40,
            scale: 0.98,
          },
          { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "power2.out" },
        );
      },
    });
  };

  // Helper: renders browser-styled mockups containing uploaded screenshots
  const renderBrowserScreenshot = (src: string, url: string) => {
    const mockupThemeClass = isDark
      ? "bg-zinc-900 border-zinc-800 text-zinc-400"
      : "bg-white border-zinc-200 text-zinc-500 shadow-md";

    return (
      <div
        className={`w-full h-full rounded-lg flex flex-col select-none relative overflow-hidden border transition-colors duration-500 ${mockupThemeClass}`}
      >
        {/* Browser Header Bar */}
        <div
          className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}
        >
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-[9px] text-zinc-400/70 font-mono tracking-wide">
            {url}
          </span>
        </div>
        {/* Image Display */}
        <div className="flex-1 w-full h-full relative bg-zinc-950 overflow-hidden group/screen">
          <Image
            src={src}
            alt={`${url} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top hover:object-bottom transition-all duration-[5s] ease-in-out cursor-pointer"
          />
        </div>
      </div>
    );
  };

  // Renders the project mockups on the right of the slide
  const renderMockup = (type: string) => {
    const mockupThemeClass = isDark
      ? "bg-zinc-900 border-zinc-800 text-zinc-400"
      : "bg-white border-zinc-200 text-zinc-500 shadow-lg";

    const innerThemeClass = isDark
      ? "bg-zinc-950 border-zinc-800"
      : "bg-zinc-50 border-zinc-200";

    switch (type) {
      case "ecommerce":
        return renderBrowserScreenshot(
          "/doabaSpots.png",
          "doaba-sports.vercel.app",
        );
      case "ui":
        return renderBrowserScreenshot("/navasana.png", "navasana.ai");
      case "landing":
        return renderBrowserScreenshot("/xpertspot.png", "xpertspot.com");
      case "dashboard":
        return renderBrowserScreenshot(
          "/etailor.png",
          "e-tailor-admin.vercel.app",
        );
      case "game":
        return renderBrowserScreenshot(
          "/caverunner.png",
          "cave-endless-run.netlify.app",
        );
      case "ai":
        return (
          <div
            className={`w-full h-full rounded-lg flex flex-col select-none relative overflow-hidden border transition-colors duration-500 ${mockupThemeClass}`}
          >
            <div
              className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${isDark ? "border-zinc-800" : "border-zinc-200"}`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
              <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
              <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              <span className="ml-3 text-[9px] text-zinc-400/70 font-mono">
                github.com/Sufyaan8/ai-design
              </span>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div className="flex gap-2 items-center mb-2">
                <div
                  className={`py-1 px-2.5 rounded font-sans text-[10px] flex-1 border ${isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-zinc-100 border-zinc-300 text-zinc-800"}`}
                >
                  &ldquo;Generate AWS serverless setup...&rdquo;
                </div>
                <span
                  className={`px-2 py-1 rounded text-[10px] font-sans font-bold ${isDark ? "bg-white text-black" : "bg-zinc-950 text-white"}`}
                >
                  Generate
                </span>
              </div>
              <div
                className={`flex-1 border rounded p-3 flex flex-col justify-center gap-4 relative ${innerThemeClass}`}
              >
                <div className="flex justify-between items-center px-4">
                  <div
                    className={`border px-2 py-1 rounded text-center ${isDark ? "bg-zinc-900 border-zinc-750" : "bg-white border-zinc-200 shadow-sm"}`}
                  >
                    <p
                      className={`text-[9px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                    >
                      API Gateway
                    </p>
                    <p className="text-[7px] text-zinc-400/60">
                      AWS::Serverless
                    </p>
                  </div>
                  <div
                    className={`border px-2 py-1 rounded text-center ${isDark ? "bg-zinc-900 border-zinc-750" : "bg-white border-zinc-200 shadow-sm"}`}
                  >
                    <p
                      className={`text-[9px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                    >
                      Lambda
                    </p>
                    <p className="text-[7px] text-zinc-400/60">Node20.x</p>
                  </div>
                  <div
                    className={`border px-2 py-1 rounded text-center ${isDark ? "bg-zinc-900 border-zinc-750" : "bg-white border-zinc-200 shadow-sm"}`}
                  >
                    <p
                      className={`text-[9px] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                    >
                      DynamoDB
                    </p>
                    <p className="text-[7px] text-zinc-400/60">NoSQL DB</p>
                  </div>
                </div>
                {/* Connector Lines */}
                <div
                  className={`absolute left-[34%] right-[44%] top-[48%] border-t border-dashed ${isDark ? "border-zinc-700" : "border-zinc-300"}`}
                />
                <div
                  className={`absolute left-[56%] right-[22%] top-[48%] border-t border-dashed ${isDark ? "border-zinc-700" : "border-zinc-300"}`}
                />
                <div className="text-[9px] text-zinc-400/70 mt-2 text-center font-sans">
                  Semantic Search embedding complete via Upstash Vector.
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const activeProj = projects[activeProjIndex];

  // Underline CSS generator for navbar hover transitions
  const getNavLinkClass = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    const hoverUnderlineStyle =
      "relative py-1 transition-colors uppercase font-mono tracking-wider after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:origin-bottom-left hover:after:scale-x-100";

    if (isActive) {
      return `${hoverUnderlineStyle} ${isDark ? "text-white after:scale-x-100" : "text-zinc-950 after:scale-x-100"}`;
    } else {
      return `${hoverUnderlineStyle} ${isDark ? "text-zinc-500 hover:text-white" : "text-zinc-500 hover:text-zinc-950"}`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`font-sans transition-colors duration-500 selection:bg-zinc-800 selection:text-white ${
        isDark
          ? "bg-[#080809] text-zinc-300 dark"
          : "bg-[#f4f4f6] text-zinc-800"
      }`}
    >
      {/* Floating Minimal Navigation */}
      <nav
        className={`fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 bg-gradient-to-b backdrop-blur-sm transition-colors duration-350 ${
          isDark
            ? "from-[#080809]/80 to-transparent border-b border-zinc-900/10"
            : "from-[#f4f4f6]/80 to-transparent border-b border-zinc-200/40"
        }`}
      >
        <div
          onClick={() => scrollTo("hero")}
          className={`font-semibold tracking-wider text-sm cursor-pointer nav-item hover:opacity-80 transition-opacity ${
            isDark ? "text-white" : "text-zinc-950"
          }`}
        >
          SUFYAAN SHAHID
        </div>

        {/* Navigation links for Desktop */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-zinc-500">
          <button
            onClick={() => scrollTo("hero")}
            className={getNavLinkClass("hero")}
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className={getNavLinkClass("projects")}
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className={getNavLinkClass("skills")}
          >
            Skills
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className={getNavLinkClass("contact")}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4 nav-item">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 bg-transparent ${
              isDark
                ? "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                : "border-zinc-300 text-zinc-650 hover:border-zinc-600 hover:text-zinc-950"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Premium flow button for WhatsApp */}
          <FlowButton
            text="GET IN TOUCH"
            onClick={() => window.open("https://wa.me/923123138281", "_blank")}
            className="!py-1.5 !px-5 text-xs font-bold"
          />
        </div>
      </nav>

      {/* Floating Dot Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {[
          { id: "hero", label: "Home" },
          { id: "projects", label: "Projects" },
          { id: "skills", label: "Skills" },
          { id: "contact", label: "Contact" },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className="group flex items-center justify-end gap-3"
            aria-label={`Scroll to ${sec.label}`}
          >
            <span
              className={`text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase font-mono ${
                isDark
                  ? "text-zinc-600 group-hover:text-zinc-400"
                  : "text-zinc-400 group-hover:text-zinc-700"
              }`}
            >
              {sec.label}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full border transition-all duration-300 ${
                activeSection === sec.id
                  ? isDark
                    ? "bg-white border-white scale-125"
                    : "bg-zinc-950 border-zinc-950 scale-125"
                  : isDark
                    ? "bg-transparent border-zinc-700 group-hover:border-zinc-400"
                    : "bg-transparent border-zinc-300 group-hover:border-zinc-500"
              }`}
            />
          </button>
        ))}
      </div>

      {/* SECTION 1: HERO */}
      <section
        id="section-hero"
        className="snap-section w-full min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 relative overflow-hidden"
      >
        <CosmicParallaxBg
          head=""
          text=""
          className="bg-only absolute inset-0 z-0"
        />

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Hero Content Left */}
          <div className="md:col-span-7 flex flex-col gap-6 text-left relative z-10">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit hero-reveal ${
                isDark
                  ? "border-zinc-800 bg-zinc-900/30"
                  : "border-zinc-300 bg-zinc-100/30"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-[10px] tracking-widest font-mono uppercase ${isDark ? "text-zinc-400" : "text-zinc-650"}`}
              >
                Available for work
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-none select-none">
              {"SUFYAAN SHAHID".split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-sans hero-reveal ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Frontend Software Engineer specialized in building modern,
              high-performance React and Next.js applications. Passionate about
              clean component architecture, scalable design patterns, and
              creating seamless, minimal user experiences.
            </p>

            {/* Quick Stats Grid */}
            <div
              className={`grid grid-cols-3 gap-4 border-t pt-8 mt-4 ${isDark ? "border-zinc-900" : "border-zinc-200"}`}
            >
              <div className="hero-stat">
                <span
                  className={`block text-2xl sm:text-3xl lg:text-4xl font-bold font-mono ${isDark ? "text-white" : "text-zinc-950"}`}
                >
                  02+
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 block">
                  Years Exp
                </span>
              </div>
              <div className="hero-stat">
                <span
                  className={`block text-2xl sm:text-3xl lg:text-4xl font-bold font-mono ${isDark ? "text-white" : "text-zinc-950"}`}
                >
                  10+
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 block">
                  Projects
                </span>
              </div>
              <div className="hero-stat">
                <span
                  className={`block text-2xl sm:text-3xl lg:text-4xl font-bold font-mono ${isDark ? "text-white" : "text-zinc-950"}`}
                >
                  100%
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 block">
                  Performance
                </span>
              </div>
            </div>

            {/* CTA FlowButtons */}
            <div className="flex flex-wrap items-center gap-4 mt-4 hero-reveal">
              <FlowButton
                text="VIEW PROJECTS"
                onClick={() => scrollTo("projects")}
              />
              <FlowButton
                text="LINKEDIN"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/sufyaan-shahid-ab160136b/",
                    "_blank",
                  )
                }
              />
            </div>
          </div>

          {/* Hero Image Right */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            <div
              className={`hero-image relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border ${
                isDark
                  ? "border-zinc-900 bg-zinc-950/40 p-4"
                  : "border-zinc-250 bg-white p-4 shadow-sm"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-transparent rounded-full" />
              <div
                className={`w-full h-full rounded-full overflow-hidden border relative flex items-center justify-center ${
                  isDark
                    ? "border-zinc-800 bg-[#0e0e11]"
                    : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <Image
                  src="/programmer_avatar.png"
                  alt="Sufyaan Shahid Avatar"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-contain p-4 filter ${isDark ? "grayscale contrast-115" : "grayscale-0"}`}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROJECTS CAROUSEL */}
      <section
        id="section-projects"
        className="snap-section w-full min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden border-t border-b border-zinc-950/10"
      >
        {/* Background Watermark Parallax */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
          <span
            className={`watermark-text text-[15vw] font-black uppercase tracking-widest whitespace-nowrap block font-sans transition-all duration-500 ${
              isDark ? "text-zinc-950/20" : "text-zinc-200/35"
            }`}
          >
            {activeProj.id.split("-")[0]}
          </span>
        </div>

        <div className="max-w-6xl w-full flex flex-col gap-6 md:gap-10 relative z-10">
          {/* Header */}
          <div className="projects-header flex items-end justify-between border-b pb-4 mb-2 border-zinc-900/10">
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                Case Studies
              </span>
              <h2
                className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-950"}`}
              >
                Selected Work
              </h2>
            </div>

            {/* Custom Carousel Navigation */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono tracking-widest text-zinc-500">
                {activeProj.num} &mdash; 06
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleProjectChange(
                      (activeProjIndex - 1 + projects.length) % projects.length,
                    )
                  }
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      : "border-zinc-300 text-zinc-650 hover:border-zinc-500 hover:text-zinc-950"
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    handleProjectChange((activeProjIndex + 1) % projects.length)
                  }
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      : "border-zinc-300 text-zinc-655 hover:border-zinc-500 hover:text-zinc-950"
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Slide Wrapper */}
          <div className="carousel-wrapper w-full">
            <div className="project-slide-content grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              {/* Project Content Left */}
              <div className="md:col-span-5 flex flex-col gap-4 text-left">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block">
                  Project {activeProj.num} &bull; {activeProj.year}
                </span>

                <h3
                  className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
                    isDark ? "text-white" : "text-zinc-950"
                  }`}
                >
                  {activeProj.title}
                </h3>

                <p
                  className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  {activeProj.tagline}
                </p>

                <p
                  className={`text-sm sm:text-base leading-relaxed mt-2 ${isDark ? "text-zinc-400" : "text-zinc-650"}`}
                >
                  {activeProj.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeProj.tech.map((t) => (
                    <span
                      key={t}
                      className={`text-[9px] font-mono tracking-wider border py-1 px-2.5 rounded ${
                        isDark
                          ? "border-zinc-800 bg-zinc-900/30 text-zinc-400"
                          : "border-zinc-350 bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Case Study Link - using FlowButton */}
                <div className="mt-6">
                  <FlowButton
                    text="VISIT LIVE PROJECT"
                    onClick={() => window.open(activeProj.url, "_blank")}
                  />
                </div>
              </div>

              {/* Project Mockup Right */}
              <div className="md:col-span-7 flex justify-center items-center w-full">
                <div
                  className={`w-full max-w-[700px] aspect-20/11 rounded-xl border p-3 flex items-center justify-center transition-colors duration-500 ${
                    isDark
                      ? "bg-zinc-950/40 border-zinc-900"
                      : "bg-white/85 border-zinc-250 shadow-sm"
                  }`}
                >
                  {renderMockup(activeProj.type)}
                </div>
              </div>
            </div>
          </div>

          {/* Bullet Indicators */}
          <div className="flex justify-center md:justify-start gap-2.5 mt-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleProjectChange(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeProjIndex === idx
                    ? isDark
                      ? "w-8 bg-white"
                      : "w-8 bg-zinc-950"
                    : isDark
                      ? "w-1.5 bg-zinc-800 hover:bg-zinc-700"
                      : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SKILLS AND TECH STACK */}
      <section
        id="section-skills"
        className={`snap-section w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden transition-colors duration-500 border-t border-b border-zinc-950/10 ${
          isDark ? "bg-[#070708]" : "bg-zinc-50"
        }`}
      >
        <div className="max-w-5xl w-full flex flex-col gap-10 md:gap-14">
          <div className="text-center md:text-left flex flex-col gap-3">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block">
              Expertise
            </span>
            <h2
              className={`skills-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-950"}`}
            >
              Skills and Tech Stack
            </h2>
            <p
              className={`skills-subtitle text-sm sm:text-base max-w-xl leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-650"}`}
            >
              A curated stack of modern web technologies, libraries, and tools
              that I leverage to build robust, highly optimized, and responsive
              digital products. Hover over a category to reveal its details.
            </p>
          </div>

          <div
            className="w-full border-t border-b transition-colors duration-500 overflow-hidden relative skill-card"
            style={{
              height: "500px",
              position: "relative",
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.1)",
            }}
          >
            <FlowingMenu
              items={skillCategories}
              speed={18}
              textColor={isDark ? "#ffffff" : "#18181b"}
              marqueeBgColor={isDark ? "#ffffff" : "#18181b"}
              marqueeTextColor={isDark ? "#09090b" : "#ffffff"}
              borderColor={
                isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.1)"
              }
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <section
        id="section-contact"
        className="snap-section w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-20 relative overflow-hidden"
      >
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-5 flex flex-col gap-6 text-left">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block contact-reveal">
              Get In Touch
            </span>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none contact-reveal ${
                isDark ? "text-white" : "text-zinc-950"
              }`}
            >
              Let&rsquo;s Create Something Premium.
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-md contact-reveal ${
                isDark ? "text-zinc-400" : "text-zinc-650"
              }`}
            >
              I&rsquo;m currently open to freelance opportunities, contract
              roles, and full-time positions. Reach out and let&rsquo;s build a
              high-performance web experience together.
            </p>

            {/* Magnetic/Premium Email Link */}
            <div className="mt-4 contact-reveal">
              <a
                href="mailto:sufyaanshahid8@gmail.com"
                className={`transition-colors text-lg sm:text-xl lg:text-2xl font-bold tracking-tight border-b pb-1 w-fit block ${
                  isDark
                    ? "text-white border-zinc-800 hover:border-white hover:text-zinc-300"
                    : "text-zinc-950 border-zinc-300 hover:border-zinc-950 hover:text-zinc-700"
                }`}
              >
                sufyaanshahid8@gmail.com
              </a>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 contact-reveal">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Direct Channels
              </span>

              {/* Row 1: WhatsApp and LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923123138281"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="142 75 50"
                    backgroundColor={isDark ? "#0c0c0e" : "#ffffff"}
                    borderRadius={20}
                    glowRadius={30}
                    glowIntensity={0.8}
                    coneSpread={25}
                    animated={false}
                    colors={["#10b981", "#34d399", "#059669"]}
                  >
                    <div className="flex items-center justify-between py-8 px-6 w-full">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-11 h-11 rounded-full border flex items-center justify-center ${
                            isDark
                              ? "border-zinc-800 text-zinc-400"
                              : "border-zinc-200 text-zinc-650"
                          }`}
                        >
                          <MessageSquare className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span
                            className={`text-sm font-bold ${
                              isDark ? "text-white" : "text-zinc-900"
                            }`}
                          >
                            WhatsApp Chat
                          </span>
                          <span className="text-xs text-zinc-500">
                            +92 312 3138281
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-zinc-550" />
                    </div>
                  </BorderGlow>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sufyaan-shahid-ab160136b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="210 85 55"
                    backgroundColor={isDark ? "#0c0c0e" : "#ffffff"}
                    borderRadius={20}
                    glowRadius={30}
                    glowIntensity={0.8}
                    coneSpread={25}
                    animated={false}
                    colors={["#0077b5", "#3b82f6", "#1d4ed8"]}
                  >
                    <div className="flex items-center justify-between py-8 px-6 w-full">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-11 h-11 rounded-full border flex items-center justify-center ${
                            isDark
                              ? "border-zinc-800 text-zinc-400"
                              : "border-zinc-200 text-zinc-650"
                          }`}
                        >
                          <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span
                            className={`text-sm font-bold ${
                              isDark ? "text-white" : "text-zinc-900"
                            }`}
                          >
                            LinkedIn Connection
                          </span>
                          <span className="text-xs text-zinc-500">
                            sufyaan-shahid-ab160136b
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-zinc-550" />
                    </div>
                  </BorderGlow>
                </a>
              </div>

              {/* Row 2: GitHub and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* GitHub */}
                <a
                  href="https://github.com/sufyaan8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor={isDark ? "270 80 70" : "270 80 40"}
                    backgroundColor={isDark ? "#0c0c0e" : "#ffffff"}
                    borderRadius={20}
                    glowRadius={30}
                    glowIntensity={0.8}
                    coneSpread={25}
                    animated={false}
                    colors={["#c084fc", "#f472b6", "#818cf8"]}
                  >
                    <div className="flex items-center justify-between py-8 px-6 w-full">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-11 h-11 rounded-full border flex items-center justify-center ${
                            isDark
                              ? "border-zinc-800 text-zinc-400"
                              : "border-zinc-200 text-zinc-650"
                          }`}
                        >
                          <Github
                            className={`w-5 h-5 ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          />
                        </div>
                        <div className="flex flex-col text-left">
                          <span
                            className={`text-sm font-bold ${
                              isDark ? "text-white" : "text-zinc-900"
                            }`}
                          >
                            GitHub Profile
                          </span>
                          <span className="text-xs text-zinc-500">
                            sufyaan8
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-zinc-550" />
                    </div>
                  </BorderGlow>
                </a>

                {/* Email */}
                <a
                  href="mailto:sufyaanshahid8@gmail.com"
                  className="block focus:outline-none"
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="10 85 55"
                    backgroundColor={isDark ? "#0c0c0e" : "#ffffff"}
                    borderRadius={20}
                    glowRadius={30}
                    glowIntensity={0.8}
                    coneSpread={25}
                    animated={false}
                    colors={["#ef4444", "#f87171", "#b91c1c"]}
                  >
                    <div className="flex items-center justify-between py-8 px-6 w-full">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-11 h-11 rounded-full border flex items-center justify-center ${
                            isDark
                              ? "border-zinc-800 text-zinc-400"
                              : "border-zinc-200 text-zinc-650"
                          }`}
                        >
                          <Mail className="w-5 h-5 text-[#EA4335]" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span
                            className={`text-sm font-bold ${
                              isDark ? "text-white" : "text-zinc-900"
                            }`}
                          >
                            Email Address
                          </span>
                          <span className="text-xs text-zinc-500">
                            sufyaanshahid8@gmail.com
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-zinc-550" />
                    </div>
                  </BorderGlow>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Absolute Footer */}
        <div className="absolute inset-x-0 bottom-6 flex justify-between px-6 md:px-12 text-[9px] text-zinc-600 font-mono">
          <span>SUFYAAN SHAHID &bull; PORTFOLIO 2026</span>
          <button
            onClick={() => scrollTo("hero")}
            className={`transition-colors flex items-center gap-1 ${isDark ? "hover:text-white" : "hover:text-zinc-950"}`}
          >
            BACK TO TOP <ChevronDown className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      </section>
    </div>
  );
}
