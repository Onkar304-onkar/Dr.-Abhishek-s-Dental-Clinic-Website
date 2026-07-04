import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  Menu,
  X,
  Phone,
  Calendar,
  Star,
  MapPin,
  Mail,
  Clock,
  ChevronRight,
  Shield,
  Award,
  Users,
  Sparkles,
  Smile,
  Baby,
  Scan,
  Zap,
  Heart,
  ArrowLeftRight,
  Quote,
  MessageCircle,
  ChevronLeft,
  CheckCircle2,
  PlayCircle,
  Volume2,
  VolumeX,
} from "lucide-react";

// Inline social icons to keep imports simple across lucide versions
const Instagram = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Facebook = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
const Twitter = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2H21.5l-7.5 8.577L22.5 22h-6.82l-5.34-6.98L4.2 22H.94l8.04-9.186L1.5 2h6.98l4.82 6.37L18.244 2zm-1.197 18h1.86L7.02 4H5.05l12 16z" />
  </svg>
);
const Linkedin = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0z" />
  </svg>
);
import { Suspense, lazy } from "react";
import heroVideo from "./components/Generated Video July 04, 2026 - 2_14PM.mp4";

const MiniScene = lazy(() =>
  import("./components/Scene3D").then((m) => ({ default: m.DentalScene })),
);
const HeroCanvas = lazy(() =>
  import("./components/Scene3D").then((m) => ({ default: m.HeroCanvas })),
);

// ---------------- Data ----------------
const services = [
  {
    id: "orthodontics",
    title: "Orthodontics",
    desc: "Expert braces and clear aligner therapies to properly align your smile and bite.",
    variant: "braces" as const,
    icon: <ArrowLeftRight className="h-6 w-6" />,
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "cataract",
    title: "Cataract Surgery",
    desc: "Advanced laser-assisted cataract removal for restored, crystal-clear vision.",
    variant: "implant" as const,
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-sky-400 to-cyan-400",
  },
  {
    id: "lasik",
    title: "LASIK Surgery",
    desc: "Painless, precise laser vision correction to free you from glasses and contacts.",
    variant: "implant" as const,
    icon: <Scan className="h-6 w-6" />,
    color: "from-cyan-400 to-teal-400",
  },
  {
    id: "pediatric-eye",
    title: "Pediatric Eye Care",
    desc: "Specialized eye checkups and squint treatments for children in a friendly environment.",
    variant: "tooth" as const,
    icon: <Baby className="h-6 w-6" />,
    color: "from-teal-300 to-cyan-400",
  },
  {
    id: "dry-eye",
    title: "Dry Eye Treatment",
    desc: "Comprehensive diagnostics and soothing therapies for chronic dry eye relief.",
    variant: "tooth" as const,
    icon: <Shield className="h-6 w-6" />,
    color: "from-teal-400 to-emerald-400",
  },
  {
    id: "retina-cornea",
    title: "Retina & Cornea",
    desc: "Expert treatment for complex retinal disorders, glaucoma, and corneal diseases.",
    variant: "implant" as const,
    icon: <Zap className="h-6 w-6" />,
    color: "from-cyan-300 to-sky-400",
  },
];

const whyChoose = [
  {
    title: "Patient-Centered Care",
    desc: "We prioritize choosing patients' values and preferences, ensuring customized treatment plans.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    title: "Innovative & Aesthetic",
    desc: "Our mission is to provide patient-centered care with innovative and aesthetic approaches.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Expert Orthodontist",
    desc: "Dr. Abhishek Agale is an MDS specialist with dedicated clinical experience.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Recognized Innovation",
    desc: "Holder of 2 design patents, 1 utility publication, and 4 copyrights.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Multidisciplinary Care",
    desc: "Comprehensive care ranging from specialized orthodontics to advanced eye treatments.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    title: "Multiple Locations",
    desc: "Serving patients across Nashik, Pune, Ahmednagar, and Mumbai with accessible care.",
    icon: <MapPin className="h-6 w-6" />,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Smile Makeover",
    text: "Dr. Abhishek redesigned my smile before my wedding — I couldn't stop smiling on the big day. The 3D preview was unbelievable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Arjun Mehta",
    role: "Full-Mouth Implants",
    text: "I was terrified of dentists. The entire team made me feel at home. Painless, fast, and the implants feel totally natural.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Ananya R.",
    role: "Invisalign",
    text: "My treatment finished 3 months ahead of schedule. The app let me track every week. The clinic looks like an Apple Store.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
  },
  {
    name: "Rahul Kapoor",
    role: "Teeth Whitening",
    text: "45 minutes, coffee-stains completely gone. Zero sensitivity. Easily the most premium clinic I've ever walked into.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
  },
];

const gallery = [
  { title: "Reception Lounge", src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80" },
  { title: "CBCT Imaging Suite", src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80" },
  { title: "Sterilisation Bay", src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80" },
  { title: "Paediatric Lounge", src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=80" },
  { title: "Private Operatory", src: "https://images.unsplash.com/photo-1629909615294-a1e20cbc9229?w=900&q=80" },
  { title: "Smile Design Studio", src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=80" },
];

const googleReviews = [
  { name: "Kavita Nair", text: "World-class treatment. Dr. Abhishek explained everything with 3D scans. Worth every rupee.", stars: 5, date: "2 weeks ago" },
  { name: "Siddharth R.", text: "Painless root canal in one sitting. The clinic is absolutely spotless and luxurious.", stars: 5, date: "1 month ago" },
  { name: "Meera Joshi", text: "My kids actually look forward to their visits now. The staff is incredibly kind.", stars: 5, date: "3 weeks ago" },
  { name: "Vikram Iyer", text: "Got 4 implants done. The entire process was smooth, transparent and affordable.", stars: 5, date: "2 months ago" },
  { name: "Neha Agarwal", text: "Best dental clinic in the city. The attention to detail is unmatched.", stars: 5, date: "5 days ago" },
  { name: "Rohan Desai", text: "Walked in nervous, walked out smiling. Zero discomfort, zero swelling after extractions.", stars: 5, date: "1 week ago" },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Smile Lab", href: "#before-after" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
];

// ---------------- Helpers ----------------
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

// ---------------- Sections ----------------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur py-2.5" : "py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-teal-400 shadow-lg shadow-sky-500/30">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
              <path d="M12 2c2.5 0 4 1.3 5.5 1.5 2.1.2 3.6-.3 4.1 1.5.7 2.6-.8 6.7-1.6 9-.9 2.4-.4 6-2.5 7.5-1.9 1.4-3.1-1.3-4-2.5-.9-1.2-1.5-1.2-1.5-1.2s-.6 0-1.5 1.2c-.9 1.2-2.1 3.9-4 2.5-2.1-1.5-1.6-5.1-2.5-7.5-.8-2.3-2.3-6.4-1.6-9 .5-1.8 2-1.3 4.1-1.5 1.5-.2 3-1.5 5.5-1.5z" />
            </svg>
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-teal-300 ring-2 ring-white" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-[var(--ink)]">Dr. Abhishek's</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--blue-deep)]">Dental Clinic</div>
          </div>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#book" className="btn-primary text-sm">
            <Calendar className="h-4 w-4" /> Book Appointment
          </a>
        </div>

        <button
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full glass"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-5 mt-3 rounded-3xl glass-strong p-4">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-sky-50"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </a>
            ))}
            <a href="#book" onClick={() => setOpen(false)} className="mt-2 btn-primary justify-center">
              <Calendar className="h-4 w-4" /> Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ scrollY }: { scrollY: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => { });
        setAudioEnabled(true);
      } else {
        videoRef.current.pause();
        setAudioEnabled(false);
      }
    }
  };

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32 pb-16 lg:pt-28 lg:pb-20 cursor-pointer" onClick={(e) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      togglePlay();
    }}>
      {/* Video + overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="hero-video-bg"
          muted={!audioEnabled}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />

        </video>

        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-grid opacity-60" />
      </div>

      {/* Floating blobs */}
      <div className="blob h-[420px] w-[420px] bg-cyan-400/30" style={{ top: "-10%", left: "-5%" }} />
      <div className="blob h-[380px] w-[380px] bg-sky-500/25" style={{ bottom: "-10%", right: "-5%" }} />



      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:min-h-[82vh]">
        <div className="reveal text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
            </span>
            Now Accepting New Patients
          </div>
          <h1 className="font-display text-4xl leading-[1.1] sm:text-5xl lg:text-7xl lg:leading-[1.02] font-bold">
            Dr. Abhishek's <br />
            <span className="bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
              Dental Clinic
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-white/85 sm:mt-6 sm:text-xl">
            Patient centered care with <span className="font-semibold text-white">innovative and aesthetic approaches.</span> Experience premium
            orthodontics and comprehensive care tailored to your values and preferences.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#book" className="btn-primary">
              <Calendar className="h-5 w-5" /> Book Appointment
            </a>
            <a href="tel:+918530161607" className="btn-ghost">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((t) => (
                <img
                  key={t.name}
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-2 text-sm font-semibold text-white">4.9 / 5</span>
              </div>
              <p className="text-sm text-white/70">from 3,800+ Google reviews</p>
            </div>
          </div>

          {/* Glass stat card (Moved to left side) */}
          <div className="mt-12 hidden lg:block">
            <div className="glass-dark max-w-md rounded-[2rem] p-7 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400">
                  <PlayCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/70">Virtual Tour</div>
                  <div className="text-lg font-bold">Walk through our clinic</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { n: "3+", l: "Years Experience" },
                  { n: "15k+", l: "Happy Smiles" },
                  { n: "500+", l: "Smile Makeovers" },
                  { n: "4.9★", l: "Google Rating" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <div className="font-display text-2xl font-bold text-white">{s.n}</div>
                    <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <Clock className="h-5 w-5 text-teal-300" />
                <div className="text-sm">
                  <div className="font-semibold">Open Today</div>
                  <div className="text-white/70">9:00 AM – 9:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="blob h-[400px] w-[400px] bg-sky-300/25" style={{ top: "10%", right: "-5%" }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="gradient-border overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80"
                  alt="Dr. Abhishek Agale"
                  className="h-80 md:h-[560px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 hidden rounded-3xl glass-strong p-5 md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-teal-400 text-white">
                    <Award className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold leading-none">M.D.S.</div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--blue-deep)]">
                      Orthodontist
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-10 hidden rounded-2xl glass p-4 md:block">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-bold">4.9</div>
                </div>
                <div className="mt-1 text-xs text-[var(--muted)]">3,800+ verified reviews</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> About the Doctor
            </span>
            <h2 className="section-heading mt-4">
              Meet Dr. Abhishek Agale — <span className="heading-gradient">dedicated to your smile.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              Dr. Abhishek Agale is a dedicated orthodontist with an MDS qualification. He focuses on patient-centered
              care, integrating innovative and aesthetic approaches.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              With 3 years of specialized experience, his work is recognized by 2 design patents, a utility publication,
              and 4 copyrights. We prioritize your values and preferences in every treatment plan.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { k: "Specialisation", v: "Orthodontist" },
                { k: "Experience", v: "3 Years" },
                { k: "Credentials", v: "MDS" },
                { k: "Languages", v: "English, Hindi, Marathi" },
              ].map((i) => (
                <div key={i.k} className="rounded-2xl glass p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--blue-deep)]">{i.k}</div>
                  <div className="mt-1 font-semibold text-[var(--ink)]">{i.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#book" className="btn-primary">
                <Calendar className="h-4 w-4" /> Book Consultation
              </a>
              <a href="#services" className="btn-light">
                View Specialities <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">
              <Shield className="h-3.5 w-3.5" /> Why Choose Us
            </span>
            <h2 className="section-heading mt-4">
              Dentistry designed like <span className="heading-gradient">a luxury experience.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--muted)]">
              From the moment you walk into our clinic, everything — from the ambient scent to the laser handpiece —
              has been curated for comfort, precision and calm.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((f, idx) => (
            <Reveal key={f.title} delay={idx * 80}>
              <div className="t-card glass h-full rounded-[1.75rem] p-7">
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="blob h-[500px] w-[500px] bg-teal-300/20" style={{ top: "20%", left: "-10%" }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> Our Services
            </span>
            <h2 className="section-heading mt-4 max-w-2xl">
              A full suite of <span className="heading-gradient">aesthetic & restorative</span> treatments.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-[var(--muted)]">
              Every treatment is delivered in-house by Dr. Abhishek and his team using 3D-guided protocols, laser
              dentistry and premium biocompatible materials.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.id} delay={idx * 70}>
              <div className="service-card gradient-border group relative h-full overflow-hidden rounded-[1.75rem] p-7">
                <div className="three-stage pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-95">
                  <Suspense fallback={null}>
                    <MiniScene variant={s.variant} />
                  </Suspense>
                </div>
                <div
                  className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg shadow-sky-500/20`}
                >
                  {s.icon}
                </div>
                <h3 className="relative z-10 mt-5 text-xl font-bold">{s.title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.desc}</p>
                <a
                  href="#book"
                  className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--blue-deep)] group-hover:gap-2.5 transition-all"
                >
                  Learn more <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (clientX: number) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    };
    const onMove = (e: MouseEvent) => move(e.clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <section id="before-after" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">
              <Scan className="h-3.5 w-3.5" /> Smile Lab
            </span>
            <h2 className="section-heading mt-4">
              See your smile <span className="heading-gradient">before we touch it.</span>
            </h2>
            <p className="mt-6 text-[var(--muted)]">
              Our interactive 3D Smile Design software renders your final result in real time. Drag the slider below to
              preview a real patient's before & after — then design your own in a free consultation.
            </p>
            <ul className="mt-6 space-y-3 text-[var(--ink-soft)]">
              {[
                "AI-powered facial symmetry analysis",
                "Same-day digital wax-up and mockup",
                "Unlimited revisions before treatment",
                "See veneers, bonding & whitening live in 3D",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-500" /> {x}
                </li>
              ))}
            </ul>
            <a href="#book" className="btn-primary mt-8">
              Design My Smile <ChevronRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div
              ref={containerRef}
              className="ba-container h-80 sm:h-[460px] md:h-[560px]"
              style={{ "--split": `${pos}%` } as CSSProperties}
              onMouseDown={(e) => {
                dragging.current = true;
                const rect = e.currentTarget.getBoundingClientRect();
                setPos(((e.clientX - rect.left) / rect.width) * 100);
              }}
              onTouchStart={(e) => {
                dragging.current = true;
                const rect = e.currentTarget.getBoundingClientRect();
                setPos(((e.touches[0].clientX - rect.left) / rect.width) * 100);
              }}
            >
              {/* BEFORE layer: full size, base (unreformed teeth) */}
              <img
                src="https://images.unsplash.com/photo-1596464714816-88f9dd10d5f2?w=1600&q=80"
                alt="Before smile"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* AFTER clipped region */}
              <div className="ba-after-wrap" style={{ left: 0, right: "auto", width: `${pos}%`, borderRight: "2px solid white" }}>
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1600&q=80"
                  alt="After smile"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Labels */}
              <div className="absolute left-5 top-5 z-20 rounded-full bg-rose-500/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                Before
              </div>
              <div className="absolute right-5 top-5 z-20 rounded-full bg-teal-500/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                After
              </div>

              {/* Handle */}
              <div
                className="ba-handle"
                onMouseDown={() => (dragging.current = true)}
                onTouchStart={() => (dragging.current = true)}
              >
                <ChevronLeft className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 -ml-1" />
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-[var(--muted)]">
              <span className="font-semibold text-[var(--blue-deep)]">Drag</span> the handle to compare before & after.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">
              <Quote className="h-3.5 w-3.5" /> Patient Stories
            </span>
            <h2 className="section-heading mt-4">
              Loved by <span className="heading-gradient">thousands of smiles.</span>
            </h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="t-card glass relative h-full rounded-[1.75rem] p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-sky-200" />
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-[var(--muted)]">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleReviewsRow() {
  const list = useMemo(() => [...googleReviews, ...googleReviews], []);
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="glass-strong rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-teal-400">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                    <path d="M21.35 11.1H12v3.2h5.35c-.25 1.4-1.6 4.1-5.35 4.1-3.2 0-5.8-2.7-5.8-6s2.6-6 5.8-6c1.85 0 3.05.8 3.75 1.5l2.55-2.45C16.7 3.95 14.6 3 12 3 6.95 3 3 6.95 3 12s3.95 9 9 9c5.2 0 8.65-3.65 8.65-8.8 0-.6-.05-1.05-.15-1.6z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-display text-xl font-bold">Google Reviews</div>
                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <div className="font-bold">4.9</div>
                  </div>
                  <div className="text-xs text-[var(--muted)]">Based on 3,800+ verified patient reviews</div>
                </div>
              </div>
              <a
                href="#"
                className="rounded-full bg-gradient-to-r from-sky-500 to-teal-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30"
              >
                Write a Review
              </a>
            </div>
            <div className="relative mt-6 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/90 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/90 to-transparent" />
              <div className="marquee-track flex w-max gap-4">
                {list.map((r, i) => (
                  <div key={i} className="w-80 rounded-2xl bg-white/70 p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-400 text-sm font-bold text-white">
                        {r.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{r.name}</div>
                        <div className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: r.stars }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--ink-soft)]">{r.text}</p>
                    <div className="mt-3 text-xs text-[var(--muted)]">{r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <Reveal>
            <span className="eyebrow">
              <MapPin className="h-3.5 w-3.5" /> Clinic Gallery
            </span>
            <h2 className="section-heading mt-4">
              Step inside a <span className="heading-gradient">calming, futuristic</span> space.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.title} delay={i * 50}>
              <div className={`gallery-item ${i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}`}>
                <img
                  src={g.src}
                  alt={g.title}
                  className={`h-full w-full object-cover ${i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"}`}
                />
                <div className="gallery-caption">
                  <div className="text-xs font-semibold uppercase tracking-widest text-teal-300">Tour</div>
                  <div className="text-lg font-bold">{g.title}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Dental Implants",
    date: "",
    time: "10:00",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="relative py-24">
      <div className="blob h-[500px] w-[500px] bg-sky-300/25" style={{ top: "10%", left: "-10%" }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="eyebrow">
              <Calendar className="h-3.5 w-3.5" /> Book Online
            </span>
            <h2 className="section-heading mt-4">
              Reserve your <span className="heading-gradient">30-minute consultation.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[var(--muted)]">
              Choose your preferred service and slot — our concierge will confirm via WhatsApp within 15 minutes
              (during clinic hours). No payment required to book.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { i: <Phone className="h-5 w-5" />, k: "Call us", v: "+91 85301 61607" },
                { i: <Mail className="h-5 w-5" />, k: "Email", v: "abhiagale299@gmail.com" },
                { i: <Clock className="h-5 w-5" />, k: "Hours", v: "Mon–Sat, 9 AM – 9 PM" },
                { i: <MessageCircle className="h-5 w-5" />, k: "WhatsApp", v: "Chat instantly, 24/7" },
              ].map((c) => (
                <div key={c.k} className="flex items-center gap-4 rounded-2xl glass p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 text-white">
                    {c.i}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-[var(--blue-deep)]">{c.k}</div>
                    <div className="font-bold">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="gradient-border rounded-[2rem] bg-white/80 p-5 sm:p-7 md:p-9">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-teal-400 text-white shadow-2xl shadow-sky-500/30">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-bold">Request Received!</h3>
                  <p className="mt-2 max-w-sm text-[var(--muted)]">
                    Thanks, {form.name || "friend"}! We'll WhatsApp you shortly to confirm your {form.service}{" "}
                    consultation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full bg-slate-100 px-5 py-2 text-sm font-bold text-[var(--ink)] hover:bg-slate-200"
                  >
                    Book another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="font-display text-2xl font-bold">Book an Appointment</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                        Full Name
                      </label>
                      <input required name="name" value={form.name} onChange={handleChange} className="field" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                        Phone
                      </label>
                      <input required name="phone" value={form.phone} onChange={handleChange} className="field" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                      Email
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="field" placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                      Service
                    </label>
                    <select name="service" value={form.service} onChange={handleChange} className="field">
                      {services.map((s) => (
                        <option key={s.id}>{s.title}</option>
                      ))}
                      <option>General Checkup</option>
                      <option>Consultation Only</option>
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                        Preferred Date
                      </label>
                      <input type="date" required name="date" value={form.date} onChange={handleChange} className="field" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                        Time
                      </label>
                      <input type="time" name="time" value={form.time} onChange={handleChange} className="field" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">
                      Message (optional)
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="field resize-none" placeholder="Any concerns or preferences..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Calendar className="h-4 w-4" /> Request Appointment
                  </button>
                  <p className="text-center text-xs text-[var(--muted)]">
                    Your details are private and never shared. We respond within 15 minutes.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">
              <MapPin className="h-3.5 w-3.5" /> Find Us
            </span>
            <h2 className="section-heading mt-4">
              Visit our <span className="heading-gradient">flagship clinic.</span>
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Centrally located with valet parking, a dedicated kids' lounge, and a coffee bar. Walk-ins welcome
              (appointments preferred).
            </p>

            <div className="mt-8 space-y-4">
              {[
                { i: <MapPin className="h-5 w-5" />, k: "Address", v: "Rmo hostel, Rural dental college" },
                { i: <Phone className="h-5 w-5" />, k: "Phone", v: "+91 85301 61607" },
                { i: <Mail className="h-5 w-5" />, k: "Email", v: "abhiagale299@gmail.com" },
                { i: <Clock className="h-5 w-5" />, k: "Timings", v: "Mon–Sat 9:00 AM – 9:00 PM · Sun 10:00 AM – 2:00 PM" },
              ].map((c) => (
                <div key={c.k} className="flex gap-4 rounded-2xl glass p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 text-white">
                    {c.i}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[var(--blue-deep)]">{c.k}</div>
                    <div className="font-semibold">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+918530161607" className="btn-light">
                <Phone className="h-4 w-4" /> Call Direct
              </a>
              <a href="#book" className="btn-primary">
                <Calendar className="h-4 w-4" /> Book Visit
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="gradient-border overflow-hidden rounded-[2rem]">
              <iframe
                title="Clinic Location"
                src="https://www.google.com/maps?q=Rural+Dental+College,+Loni,+Maharashtra+413736&output=embed"
                className="h-[520px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-10 bg-gradient-to-br from-[#052a43] via-[#08395b] to-[#065a59] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-teal-300">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                  <path d="M12 2c2.5 0 4 1.3 5.5 1.5 2.1.2 3.6-.3 4.1 1.5.7 2.6-.8 6.7-1.6 9-.9 2.4-.4 6-2.5 7.5-1.9 1.4-3.1-1.3-4-2.5-.9-1.2-1.5-1.2-1.5-1.2s-.6 0-1.5 1.2c-.9 1.2-2.1 3.9-4 2.5-2.1-1.5-1.6-5.1-2.5-7.5-.8-2.3-2.3-6.4-1.6-9 .5-1.8 2-1.3 4.1-1.5 1.5-.2 3-1.5 5.5-1.5z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-lg font-bold">Dr. Abhishek's</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">Dental Clinic</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Premium 3D-designed dental care. Healthy teeth, beautiful smiles — delivered with precision and warmth.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter, Linkedin].map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-gradient-to-br hover:from-sky-400 hover:to-teal-400"
                >
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-teal-300">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-teal-300">Clinic</div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#about" className="hover:text-white">About Dr. Abhishek</a></li>
              <li><a href="#why" className="hover:text-white">Why Choose Us</a></li>
              <li><a href="#before-after" className="hover:text-white">Smile Lab 3D</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white">Reviews</a></li>
              <li><a href="#book" className="hover:text-white">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-teal-300">Get in Touch</div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-teal-300" />Rmo hostel, Rural dental college</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-teal-300" /> +91 85301 61607</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-300" /> abhiagale299@gmail.com</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-300" /> Mon–Sat, 9 AM – 9 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <div>© {new Date().getFullYear()} Dr. Abhishek Agale's Dental Clinic. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fab">
      <a
        href="https://wa.me/918530161607"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm">WhatsApp Us</span>
      </a>
      <a href="tel:+918530161607" className="call-fab" aria-label="Call">
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}

// ---------------- App ----------------
export default function App() {
  const scrollY = useScrollY();
  return (
    <div className="relative">
      <Nav />
      <Hero scrollY={scrollY} />
      <About />
      <Why />
      <Services />
      <BeforeAfter />
      <Testimonials />
      <GoogleReviewsRow />
      <Gallery />
      <BookingForm />
      <Contact />
      <Footer />
      <FloatingActions />
    </div>
  );
}
