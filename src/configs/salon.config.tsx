import { Config } from "@measured/puck";
import { SalonHero, type SalonHeroProps } from "../blocks/SalonHero";
import { ServiceMenu, type ServiceMenuProps } from "../blocks/ServiceMenu";
import { Navbar, type NavbarProps } from "../blocks/Navbar";
import { TeamSection, type TeamSectionProps } from "../blocks/TeamSection";
import { GalleryGrid, type GalleryGridProps } from "../blocks/GalleryGrid";
import { Testimonial, type TestimonialProps } from "../blocks/Testimonial";
import { LuxuryFooter, type LuxuryFooterProps } from "../blocks/LuxuryFooter";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  Navbar: NavbarProps;
  SalonHero: SalonHeroProps;
  ServiceMenu: ServiceMenuProps;
  TeamSection: TeamSectionProps;
  GalleryGrid: GalleryGridProps;
  Testimonial: TestimonialProps;
  LuxuryFooter: LuxuryFooterProps;
};

export const salonConfig: Config<Props> = {
  components: {
    Navbar: {
      fields: {
        logoText: { type: "text" },
        navLinks: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            url: { type: "text" },
          },
          getItemSummary: (item) => item.label || "Link",
        },
        ctaText: { type: "text" },
      },
      defaultProps: {
        logoText: "LUMIÈRE",
        navLinks: [
          { label: "Services", url: "#services" },
          { label: "Team", url: "#team" },
          { label: "Gallery", url: "#gallery" },
        ],
        ctaText: "Book Now",
      },
      render: ({ puck, ...props }) => <Navbar {...props} />,
    },
    SalonHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        buttonText: { type: "text" },
        secondaryButtonText: { type: "text" },
        badgeText: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
        backgroundVideo: { type: "text" },
      },
      defaultProps: {
        headline: "Elevate Your Beauty",
        subheadline: "Experience luxury styling and advanced treatments tailored to you.",
        buttonText: "Book Appointment",
        secondaryButtonText: "View Services",
        badgeText: "Now Accepting New Clients",
        backgroundImageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop",
        backgroundVideo: "https://videos.pexels.com/video-files/7253934/7253934-sd_960_506_25fps.mp4",
      },
      render: ({ puck, ...props }) => <SalonHero {...props} />,
    },
    ServiceMenu: {
      fields: {
        categories: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Category",
        },
        currencySymbol: { type: "text" },
        services: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            price: { type: "text" },
            description: { type: "textarea" },
            category: { type: "text" },
          },
          getItemSummary: (item) => item.title || "Service",
        },
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          categories: (data.props.categories as any[])?.map((c) => c?.value || c) || [],
        },
      }),
      defaultProps: {
        currencySymbol: "$",
        categories: [{ value: "Hair" }, { value: "Color" }, { value: "Treatments" }] as any,
        services: [
          { title: "Precision Cut", price: "85", description: "Tailored to your facial structure and lifestyle.", category: "Hair" },
          { title: "Blow Dry & Style", price: "65", description: "Voluminous, salon-perfect finish every time.", category: "Hair" },
          { title: "Balayage Color", price: "150", description: "Seamless, sun-kissed blending technique.", category: "Color" },
          { title: "Full Highlights", price: "130", description: "Multi-dimensional light and dimension.", category: "Color" },
          { title: "Deep Conditioning", price: "55", description: "Intensive moisture and protein restoration.", category: "Treatments" },
          { title: "Keratin Treatment", price: "200", description: "Smooth, frizz-free results for up to 3 months.", category: "Treatments" },
        ],
      },
      render: ({ puck, ...props }) => <ServiceMenu {...props} />,
    },
    TeamSection: {
      fields: {
        sectionTitle: { type: "text" },
        members: {
          type: "array",
          arrayFields: {
            imageUrl: { type: "custom", render: ImageUploadField },
            name: { type: "text" },
            role: { type: "text" },
            bio: { type: "textarea" },
          },
          getItemSummary: (item) => item.name || "Team Member",
        },
      },
      defaultProps: {
        sectionTitle: "Meet Our Stylists",
        members: [
          {
            imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
            name: "Isabella Grant",
            role: "Creative Director",
            bio: "15 years crafting signature looks for discerning clients.",
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
            name: "Marcus Lee",
            role: "Color Specialist",
            bio: "Master of balayage and dimensional color techniques.",
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
            name: "Priya Sharma",
            role: "Texture Expert",
            bio: "Specializes in curly, coily, and textured hair types.",
          },
        ],
      },
      render: ({ puck, ...props }) => <TeamSection {...props} />,
    },
    GalleryGrid: {
      fields: {
        sectionTitle: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            imageUrl: { type: "custom", render: ImageUploadField },
            caption: { type: "text" },
          },
          getItemSummary: (item) => item.caption || "Gallery Item",
        },
      },
      defaultProps: {
        sectionTitle: "Our Work",
        items: [
          { imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop", caption: "Modern Balayage" },
          { imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", caption: "Precision Cut" },
          { imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop", caption: "Bridal Styling" },
          { imageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800&auto=format&fit=crop", caption: "Keratin Treatment" },
          { imageUrl: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=800&auto=format&fit=crop", caption: "Color Correction" },
          { imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop", caption: "Textured Updo" },
        ],
      },
      render: ({ puck, ...props }) => <GalleryGrid {...props} />,
    },
    Testimonial: {
      fields: {
        testimonials: {
          type: "array",
          arrayFields: {
            quote: { type: "textarea" },
            customerName: { type: "text" },
            starRating: { type: "number" },
            avatarUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.customerName || "Testimonial",
        },
      },
      defaultProps: {
        testimonials: [
          { quote: "The best salon experience I've ever had. Truly luxurious.", customerName: "Sophia Turner", starRating: 5, avatarUrl: "" },
          { quote: "My balayage has never looked better. Highly recommend Isabella!", customerName: "Rachel Kim", starRating: 5, avatarUrl: "" },
          { quote: "Priya completely transformed my curls. I've never felt more confident.", customerName: "Amara Jones", starRating: 5, avatarUrl: "" },
        ],
      },
      render: ({ puck, ...props }) => <Testimonial {...props} />,
    },
    LuxuryFooter: {
      fields: {
        brandName: { type: "text" },
        tagline: { type: "text" },
        address: { type: "text" },
        phone: { type: "text" },
        email: { type: "text" },
        workingHours: { type: "textarea" },
        socialLinks: {
          type: "array",
          arrayFields: { platform: { type: "text" }, url: { type: "text" } },
          getItemSummary: (item) => item.platform || "Social Link",
        },
        quickLinks: {
          type: "array",
          arrayFields: { label: { type: "text" }, url: { type: "text" } },
          getItemSummary: (item) => item.label || "Link",
        },
      },
      defaultProps: {
        brandName: "LUMIÈRE",
        tagline: "Elevate Your Beauty",
        address: "123 Rose Avenue, Beverly Hills, CA",
        phone: "(310) 555-0142",
        email: "hello@lumieresalon.com",
        workingHours: "Mon–Fri: 9am – 8pm\nSat–Sun: 10am – 6pm",
        socialLinks: [
          { platform: "Instagram", url: "#" },
          { platform: "Facebook", url: "#" },
          { platform: "Pinterest", url: "#" },
        ],
        quickLinks: [
          { label: "Services", url: "#services" },
          { label: "Team", url: "#team" },
          { label: "Gallery", url: "#gallery" },
          { label: "Book Now", url: "#book" },
        ],
      },
      render: ({ puck, ...props }) => <LuxuryFooter {...props} />,
    },
  },
};

export const defaultData = {
  content: [
    { type: "Navbar", props: { id: "Navbar-default" } },
    { type: "SalonHero", props: { id: "SalonHero-default" } },
    { type: "ServiceMenu", props: { id: "ServiceMenu-default" } },
    { type: "TeamSection", props: { id: "TeamSection-default" } },
    { type: "GalleryGrid", props: { id: "GalleryGrid-default" } },
    { type: "Testimonial", props: { id: "Testimonial-default" } },
    { type: "LuxuryFooter", props: { id: "LuxuryFooter-default" } },
  ],
  root: {},
};
