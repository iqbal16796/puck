"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { ArrowRight, Sparkles, Layers, Wand2, Rocket, X } from "lucide-react";
import { buildSalonContentFromAi } from "@/lib/aiContentMerge";

type Template = {
  id: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  sections: string[];
};

const templates: Template[] = [
  {
    id: "salon",
    name: "The Luxury Salon",
    description: "Perfect for salons, spas, and wellness centers.",
    image: "",
    tag: "Beauty",
    sections: ["Hero", "Service Menu", "Team", "Gallery", "Testimonials", "Footer"],
  },
  {
    id: "bakery",
    name: "The Artisan Bakery",
    description: "Warm, inviting design for bakeries and cafes.",
    image: "",
    tag: "Food",
    sections: ["Hero", "Chef Bio", "Product Menu", "Reviews", "Hours"],
  },
  {
    id: "education",
    name: "Elite Coaching",
    description: "A premium, highly animated design for coaching centers, tutors, and online courses.",
    image: "", // Add an image URL if you have a thumbnail
    tag: "Education",
    sections: ["EducationHero", "CourseList", "TutorProfiles", "StudentTestimonials"],
  },
  {
    id: "plumber",
    name: "Reliable Home Services",
    description: "Built to convert leads for plumbers and contractors.",
    image: "",
    tag: "Trades",
    sections: ["Emergency Hero", "Process", "Services", "Pricing", "FAQ", "Trust"],
  },
  {
    id: "gym",
    name: "The Powerhouse Gym",
    description: "High-energy design for fitness centers and trainers.",
    image: "",
    tag: "Fitness",
    sections: ["Hero", "Schedule", "Memberships", "Trainers", "Gallery", "Stories"],
  },
  {
    id: "lawyer",
    name: "Corporate Legal",
    description: "Professional, trustworthy layout for law firms.",
    image: "",
    tag: "Professional",
    sections: ["Authority Hero", "Practice Areas", "Cases", "Bios", "Consult", "Stats"],
  },
  {
    id: "restaurant",
    name: "Fine Dining",
    description: "Elegant, immersive design for high-end restaurants.",
    image: "",
    tag: "Food",
    sections: ["Immersive Hero", "Specials", "Menu", "Gallery", "Reservations", "VIP"],
  },
  {
    id: "portfolio",
    name: "Creative Freelancer",
    description: "Showcase your work with a stunning portfolio.",
    image: "",
    tag: "Creative",
    sections: ["Hero", "Process", "Projects", "Skills", "Clients", "Contact"],
  },
  {
    id: "clothing",
    name: "High-Fashion Boutique",
    description: "Minimalist, monochrome design for apparel brands.",
    image: "",
    tag: "Retail",
    sections: ["Trend Banner", "Lookbook", "Featured Apparel"],
  },
  {
    id: "ayurvedic",
    name: "Holistic Wellness",
    description: "Earthy, calming design for alternative medicine.",
    image: "",
    tag: "Wellness",
    sections: ["Nature Hero", "Remedies", "Consultation"],
  },
  {
    id: "craft",
    name: "Artisan Craft",
    description: "Warm, rustic layout for handmade goods and shops.",
    image: "",
    tag: "Retail",
    sections: ["Hero", "Maker Story", "Shop", "Reviews"],
  },
  {
    id: "photography",
    name: "Visual Storyteller",
    description: "A cinematic portfolio for photographers and videographers.",
    image: "",
    tag: "Creative",
    sections: ["Hero", "Collections", "About", "Pricing", "Contact"],
  },
  {
    id: "tech",
    name: "SaaS Starter",
    description: "Clean, modern landing page for apps and startups.",
    image: "",
    tag: "Technology",
    sections: ["Hero", "Features", "Social Proof", "Pricing", "CTA"],
  },
];

const categories = [
  "Salons",
  "Bakeries",
  "Plumbers",
  "Gyms",
  "Lawyers",
  "Restaurants",
  "Freelancers",
  "Boutiques",
  "Wellness",
  "Artisan",
  "Photography",
  "SaaS",
  "Startups",
  "Agencies",
  "Retail",
  "Real Estate",
  "Healthcare",
  "Education",
  "Consulting",
  "Events",
  "Nonprofits",
  "Finance",
  "Hospitality",
  "Construction",
  "Creators",
  "E-commerce",
  "Local Services",
  "Podcasts",
  "YouTube",
  "Coaches",
];

const features = [
  {
    icon: Layers,
    title: "Pre-built sections",
    description: "Every template ships with battle-tested sections for your industry.",
  },
  {
    icon: Wand2,
    title: "Visual editing",
    description: "Tweak colors, text, and images in a live preview without touching code.",
  },
  {
    icon: Rocket,
    title: "Instant deploy",
    description: "One-click publish to a fast, global CDN and custom domain.",
  },
];

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : "translateY(28px) scale(0.985)",
        filter: revealed ? "blur(0)" : "blur(6px)",
      }}
    >
      {children}
    </div>
  );
}

function SpotlightCard({ template, index, onSelect }: { template: Template; index: number; onSelect: (template: Template) => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const handleLeave = () => {
    setSpotlight((s) => ({ ...s, active: false }));
  };

  // Generate a consistent gradient based on template id
  const getGradientForTemplate = (id: string) => {
    const gradients = {
      salon: 'from-pink-500/30 to-purple-600/30',
      bakery: 'from-orange-500/30 to-yellow-600/30',
      plumber: 'from-blue-500/30 to-indigo-600/30',
      gym: 'from-red-500/30 to-orange-600/30',
      lawyer: 'from-slate-500/30 to-gray-600/30',
      restaurant: 'from-amber-500/30 to-orange-600/30',
      portfolio: 'from-purple-500/30 to-pink-600/30',
      clothing: 'from-gray-500/30 to-slate-600/30',
      ayurvedic: 'from-green-500/30 to-emerald-600/30',
      craft: 'from-amber-500/30 to-brown-600/30',
      photography: 'from-indigo-500/30 to-purple-600/30',
      tech: 'from-blue-500/30 to-cyan-600/30',
    };
    return gradients[id as keyof typeof gradients] || 'from-primary/30 to-accent/30';
  };

  return (
    <button
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onSelect(template)}
      className={cn(
        "spotlight-card group relative overflow-hidden rounded-3xl border border-white/10 bg-card text-left shadow-card transition-transform duration-300 hover:-translate-y-2",
        "reveal"
      )}
      style={{
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={
          spotlight.active
            ? {
              background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(225, 29, 72, 0.22), transparent 40%)`,
            }
            : undefined
        }
      />
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className={cn(
          "h-full w-full bg-gradient-to-br flex items-center justify-center",
          getGradientForTemplate(template.id)
        )}>
          <div className="text-center">
            <Layers className="h-12 w-12 text-white/60 mx-auto mb-2" />
            <span className="text-white/80 font-display text-lg">{template.tag}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
        <span className="absolute left-4 top-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          {template.tag}
        </span>
      </div>
      <div className="relative p-5">
        <h3 className="font-display text-2xl leading-tight">{template.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {template.sections.map((section) => (
            <span
              key={section}
              className="tag-pill inline-block rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {section}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
          Customize <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

function Marquee() {
  return (
    <div className="relative -mx-4 overflow-hidden border-y border-white/5 py-4 sm:mx-0 sm:rounded-2xl sm:border">
      <div className="marquee-track flex w-max animate-marquee">
        {[...categories, ...categories].map((cat, i) => (
          <span
            key={i}
            className="mx-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary/80" />
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

function SiteNameModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onSubmit(name.trim());
      setName("");
    }, 800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card p-8 shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="font-display text-3xl">Name your site</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This will become your temporary project title.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Bloom & Blossom Salon"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={busy || !name.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {busy ? (
              <span className="inline-block h-4 w-4 animate-ring rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <>
                Create site <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-white/10 bg-card px-5 py-3 shadow-2xl animate-rise">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Rocket className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{message}</p>
        <p className="text-xs text-muted-foreground">Redirecting to editor...</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    setHeroOffset({ x, y });
  };

  const startWithTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };

  const handleSiteNamed = (name: string) => {
    setModalOpen(false);
    setToast(`${name} is ready!`);

    // Redirect to the editor with the selected template after a brief delay
    setTimeout(() => {
      if (selectedTemplate) {
        // Generate a unique site ID (in a real app, this would come from the backend).
        // Hyphens only — the save-site route sanitizes names to [a-z0-9-], and
        // this ID is reused as-is for the editor, preview, and autosave URLs
        // for the whole session, so it must already match what gets saved.
        const siteId = `site-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        // Redirect to the editor with the template and site info
        window.location.href = `/editor/${siteId}?template=${selectedTemplate.id}&siteName=${encodeURIComponent(name)}`;
      }
    }, 1000);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora aurora-1 absolute -left-1/4 -top-1/4 h-[60vw] w-[60vw] rounded-full bg-primary/20 blur-[120px] animate-drift" />
        <div className="aurora aurora-2 absolute -right-1/4 top-1/3 h-[50vw] w-[50vw] rounded-full bg-rose-400/10 blur-[110px] animate-drift" style={{ animationDelay: "-6s" }} />
        <div className="aurora aurora-3 absolute bottom-0 left-1/3 h-[55vw] w-[55vw] rounded-full bg-violet-500/10 blur-[120px] animate-drift" style={{ animationDelay: "-12s" }} />
        <div className="grid-veil absolute inset-0 opacity-[0.15]" />
      </div>

      {/* Floating stars */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/60 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Layers className="h-5 w-5" />
          </div>
          <span className="font-display text-xl tracking-tight">Puck</span>
        </div>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#templates" className="transition-colors hover:text-foreground">Templates</a>
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
        </nav>
        <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
          Sign in
        </button>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 text-center md:pt-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>New templates added weekly</span>
            </div>
          </Reveal>

          <div
            className="mt-8 transition-transform duration-200 ease-out will-change-transform"
            style={{ transform: `translate3d(${-heroOffset.x}px, ${-heroOffset.y}px, 0)` }}
          >
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              <span className="block">Build a site that</span>
              <span className="text-shine bg-gradient-to-r from-primary via-rose-300 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                feels like magic
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Pick a premium business template, customize it in a visual editor, and publish your site in minutes.
            </p>
          </div>

          <Reveal delay={150} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#templates"
              className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Browse templates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-medium backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Wand2 className="h-4 w-4" />
              How it works
            </a>
          </Reveal>

          <Reveal delay={300} className="mt-20">
            <Marquee />
          </Reveal>
        </section>

        <section id="templates" className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-4xl md:text-5xl">Templates for every business</h2>
            <p className="mt-3 text-muted-foreground">
              Start with a professionally designed layout, then make it yours.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, i) => (
              <SpotlightCard key={template.id} template={template} index={i} onSelect={startWithTemplate} />
            ))}
          </div>
        </section>

        <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent" />
          <Reveal className="mb-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl">Why Puck?</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to launch a polished site, fast.
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <div className="group rounded-3xl border border-white/10 bg-card p-8 shadow-card transition-transform hover:-translate-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-4xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">Start free. Scale when you&apos;re ready.</h2>
            <p className="mt-3 text-muted-foreground">
              No credit card required to build and preview your site.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <button className="rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
              Get started for free
            </button>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-card/30 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" />
            </div>
            <span className="font-display text-lg">Puck</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Puck Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>

      <SiteNameModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSiteNamed}
      />
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <style jsx>{`
        .spotlight-card .tag-pill {
          opacity: 0;
          transform: translateY(8px);
        }
        .spotlight-card:hover .tag-pill {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
