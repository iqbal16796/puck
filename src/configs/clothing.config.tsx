import type { Config } from "@measured/puck";
import { LookbookHero, type LookbookHeroProps } from "../blocks/LookbookHero";
import { FeaturedApparel, type FeaturedApparelProps } from "../blocks/FeaturedApparel";
import { TrendBanner, type TrendBannerProps } from "../blocks/TrendBanner";
import { LookbookCarousel, type LookbookCarouselProps } from "../blocks/LookbookCarousel";
import { SizeGuide, type SizeGuideProps } from "../blocks/SizeGuide";
import { VIPPurchaseForm, type VIPPurchaseFormProps } from "../blocks/VIPPurchaseForm";
import { ImageUploadField } from "../components/ImageUploadField";
// MegaFooter / FloatingWhatsApp are normally shared via globalBlocks.tsx
// (used by ayurvedic/craft/plumber/lawyer/portfolio/restaurant too). This
// template forks them into its own stark black/white/ecru versions so the
// redesign doesn't leak into those other templates — see
// ClothingMegaFooter.tsx / ClothingFloatingWhatsApp.tsx.
import { MegaFooter, type MegaFooterProps } from "../blocks/ClothingMegaFooter";
import { FloatingWhatsApp, type FloatingWhatsAppProps } from "../blocks/ClothingFloatingWhatsApp";

type Props = {
  LookbookHero: LookbookHeroProps;
  FeaturedApparel: FeaturedApparelProps;
  TrendBanner: TrendBannerProps;
  LookbookCarousel: LookbookCarouselProps;
  SizeGuide: SizeGuideProps;
  VIPPurchaseForm: VIPPurchaseFormProps;
  MegaFooter: MegaFooterProps;
  FloatingWhatsApp: FloatingWhatsAppProps;
};

export const clothingConfig: Config<Props> = {
  components: {
    LookbookHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        buttonText: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Fall Collection '26",
        subheadline: "New Arrivals",
        buttonText: "Shop the Collection",
        backgroundImageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <LookbookHero {...props} />
    },
    FeaturedApparel: {
      fields: {
        title: { type: "text" },
        products: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            primaryImage: { type: "custom", render: ImageUploadField },
            secondaryImage: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Product"
        }
      },
      defaultProps: {
        title: "Curated Selection",
        products: [
          { name: "Oversized Wool Coat", price: "$345", primaryImage: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1974&auto=format&fit=crop", secondaryImage: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1974&auto=format&fit=crop" },
          { name: "Silk Slip Dress", price: "$195", primaryImage: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1961&auto=format&fit=crop", secondaryImage: "https://images.unsplash.com/photo-1495385626998-61bf000bf272?q=80&w=1964&auto=format&fit=crop" },
          { name: "Cashmere Turtleneck", price: "$225", primaryImage: "https://images.unsplash.com/photo-1434389678232-0690cb2243d5?q=80&w=1964&auto=format&fit=crop", secondaryImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" },
          { name: "Tailored Trousers", price: "$180", primaryImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop", secondaryImage: "https://images.unsplash.com/photo-1594938328870-9ee23cac59ce?q=80&w=2080&auto=format&fit=crop" }
        ]
      },
      render: ({ puck, ...props }) => <FeaturedApparel {...props} />
    },
    TrendBanner: {
      fields: {
        words: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Word"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          words: (data.props.words as any[])?.map(w => typeof w === "string" ? { value: w } : w) || []
        }
      }),
      defaultProps: {
        words: [{ value: "Sustainable" }, { value: "Minimalist" }, { value: "Avant-Garde" }, { value: "Timeless" }] as any
      },
      render: ({ puck, ...props }) => <TrendBanner {...props} />
    },
    LookbookCarousel: {
      fields: {
        title: { type: "text" },
        images: {
          type: "array",
          arrayFields: {
            url: { type: "text" },
            alt: { type: "text" }
          },
          getItemSummary: (item) => item.alt || "Image"
        }
      },
      defaultProps: {
        title: "Editorial",
        images: [
          { url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070&auto=format&fit=crop", alt: "Editorial 1" },
          { url: "https://images.unsplash.com/photo-1509631179647-0c1157121287?q=80&w=2070&auto=format&fit=crop", alt: "Editorial 2" },
          { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", alt: "Editorial 3" }
        ]
      },
      render: ({ puck, ...props }) => <LookbookCarousel {...props} />
    },
    SizeGuide: {
      fields: {
        title: { type: "text" },
        tableData: {
          type: "array",
          arrayFields: {
            size: { type: "text" },
            bust: { type: "text" },
            waist: { type: "text" },
            hips: { type: "text" }
          },
          getItemSummary: (item) => item.size || "Size"
        }
      },
      defaultProps: {
        title: "International Size Guide",
        tableData: [
          { size: "XS", bust: "32", waist: "24", hips: "34" },
          { size: "S", bust: "34", waist: "26", hips: "36" },
          { size: "M", bust: "36", waist: "28", hips: "38" },
          { size: "L", bust: "38", waist: "30", hips: "40" }
        ]
      },
      render: ({ puck, ...props }) => <SizeGuide {...props} />
    },
    VIPPurchaseForm: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        buttonText: { type: "text" },
      },
      defaultProps: {
        title: "Join the Waitlist",
        subtitle: "Exclusive early access to our next drop.",
        buttonText: "Confirm VIP Access",
      },
      render: ({ puck, ...props }) => <VIPPurchaseForm {...props} />
    },
    MegaFooter: {
      fields: {
        brandName: { type: "text" },
        newsletterHeadline: { type: "textarea" },
        socialLinks: {
          type: "array",
          arrayFields: {
            platform: {
              type: "select",
              options: [
                { label: "Instagram", value: "Instagram" },
                { label: "Twitter", value: "Twitter" },
                { label: "LinkedIn", value: "Linkedin" },
                { label: "Facebook", value: "Facebook" }
              ]
            },
            url: { type: "text" }
          },
          getItemSummary: (item) => item.platform || "Social Link"
        }
      },
      defaultProps: {
        brandName: "STUDIO",
        newsletterHeadline: "Stay in the loop. Join our newsletter for exclusive updates.",
        socialLinks: [
          { platform: "Instagram", url: "#" },
          { platform: "Twitter", url: "#" }
        ]
      },
      render: ({ puck, ...props }) => <MegaFooter {...props} />
    },
    FloatingWhatsApp: {
      fields: {
        phoneNumber: { type: "text" },
        message: { type: "text" }
      },
      defaultProps: {
        phoneNumber: "1234567890",
        message: "Hello! I'm interested in your services."
      },
      render: ({ puck, ...props }) => <FloatingWhatsApp {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "LookbookHero", props: { id: "LookbookHero-1" } },
    { type: "TrendBanner", props: { id: "TrendBanner-1" } },
    { type: "FeaturedApparel", props: { id: "FeaturedApparel-1" } },
    { type: "LookbookCarousel", props: { id: "LookbookCarousel-1" } },
    { type: "SizeGuide", props: { id: "SizeGuide-1" } },
    { type: "VIPPurchaseForm", props: { id: "VIPPurchaseForm-1" } },
    { type: "MegaFooter", props: { id: "MegaFooter-1" } },
    { type: "FloatingWhatsApp", props: { id: "FloatingWhatsApp-1" } }
  ],
  root: {}
};
