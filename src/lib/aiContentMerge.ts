import { salonConfig } from "@/configs/salon.config";

export type SalonContentPatch = {
  navbar?: { logoText?: string; ctaText?: string };
  hero?: { headline?: string; subheadline?: string; buttonText?: string; badgeText?: string };
  services?: {
    categories?: string[];
    services?: { title: string; price?: string; description?: string; category?: string }[];
  };
  team?: { sectionTitle?: string; members?: { name: string; role?: string; bio?: string }[] };
  testimonials?: { quote: string; customerName: string; starRating?: number }[];
  footer?: {
    brandName?: string;
    tagline?: string;
    address?: string;
    phone?: string;
    email?: string;
    workingHours?: string;
  };
};

// Builds full salon puck_data from an AI-generated content patch, filling any
// field the AI didn't provide from the component's own defaultProps — never
// leaves a field undefined for a component that assumes it's always present.
export function buildSalonContentFromAi(patch: SalonContentPatch) {
  const defaults = salonConfig.components as unknown as Record<string, { defaultProps: any }>;
  const teamImages = defaults.TeamSection.defaultProps.members.map((m: any) => m.imageUrl);

  return {
    root: {},
    content: [
      {
        type: "Navbar",
        props: {
          id: "Navbar-ai",
          ...defaults.Navbar.defaultProps,
          ...(patch.navbar?.logoText && { logoText: patch.navbar.logoText }),
          ...(patch.navbar?.ctaText && { ctaText: patch.navbar.ctaText }),
        },
      },
      {
        type: "SalonHero",
        props: {
          id: "SalonHero-ai",
          ...defaults.SalonHero.defaultProps,
          ...(patch.hero?.headline && { headline: patch.hero.headline }),
          ...(patch.hero?.subheadline && { subheadline: patch.hero.subheadline }),
          ...(patch.hero?.buttonText && { buttonText: patch.hero.buttonText }),
          ...(patch.hero?.badgeText && { badgeText: patch.hero.badgeText }),
        },
      },
      {
        type: "ServiceMenu",
        props: {
          id: "ServiceMenu-ai",
          ...defaults.ServiceMenu.defaultProps,
          ...(patch.services?.categories?.length && {
            categories: patch.services.categories.map((value) => ({ value })),
          }),
          ...(patch.services?.services?.length && { services: patch.services.services }),
        },
      },
      {
        type: "TeamSection",
        props: {
          id: "TeamSection-ai",
          ...defaults.TeamSection.defaultProps,
          ...(patch.team?.sectionTitle && { sectionTitle: patch.team.sectionTitle }),
          ...(patch.team?.members?.length && {
            members: patch.team.members.map((member, i) => ({
              imageUrl: teamImages[i % teamImages.length],
              name: member.name,
              role: member.role || "Team Member",
              bio: member.bio || "",
            })),
          }),
        },
      },
      {
        type: "GalleryGrid",
        props: { id: "GalleryGrid-ai", ...defaults.GalleryGrid.defaultProps },
      },
      {
        type: "Testimonial",
        props: {
          id: "Testimonial-ai",
          ...defaults.Testimonial.defaultProps,
          ...(patch.testimonials?.length && {
            testimonials: patch.testimonials.map((t) => ({
              quote: t.quote,
              customerName: t.customerName,
              starRating: t.starRating ?? 5,
              avatarUrl: "",
            })),
          }),
        },
      },
      {
        type: "LuxuryFooter",
        props: {
          id: "LuxuryFooter-ai",
          ...defaults.LuxuryFooter.defaultProps,
          ...(patch.footer?.brandName && { brandName: patch.footer.brandName }),
          ...(patch.footer?.tagline && { tagline: patch.footer.tagline }),
          ...(patch.footer?.address && { address: patch.footer.address }),
          ...(patch.footer?.phone && { phone: patch.footer.phone }),
          ...(patch.footer?.email && { email: patch.footer.email }),
          ...(patch.footer?.workingHours && { workingHours: patch.footer.workingHours }),
        },
      },
    ],
  };
}
