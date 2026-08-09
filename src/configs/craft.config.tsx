import type { Config } from "@measured/puck";
import { MakerHero, type MakerHeroProps } from "../blocks/MakerHero";
import { ArtisanGallery, type ArtisanGalleryProps } from "../blocks/ArtisanGallery";
import { ProcessTimeline, type ProcessTimelineProps } from "../blocks/ProcessTimeline";
import { PolaroidGallery, type PolaroidGalleryProps } from "../blocks/PolaroidGallery";
import { CraftCustomOrderForm, type CraftCustomOrderFormProps } from "../blocks/CraftCustomOrderForm";
import { CraftStats, type CraftStatsProps } from "../blocks/CraftStats";
import { globalBlocks, type GlobalProps } from "./globalBlocks";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  MakerHero: MakerHeroProps;
  ArtisanGallery: ArtisanGalleryProps;
  ProcessTimeline: ProcessTimelineProps;
  PolaroidGallery: PolaroidGalleryProps;
  CustomOrderForm: CraftCustomOrderFormProps;
  CraftStats: CraftStatsProps;
} & GlobalProps;

export const craftConfig: Config<Props> = {
  components: {
    MakerHero: {
      fields: {
        makerName: { type: "text" },
        headline: { type: "text" },
        description: { type: "textarea" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        makerName: "Elias & Co.",
        headline: "Rustic Heirloom Pottery",
        description: "Small-batch ceramics thrown by hand in our Oregon studio. Each piece tells a story of earth, fire, and mindful craftsmanship.",
        imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <MakerHero {...props} />
    },
    ArtisanGallery: {
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            imageUrl: { type: "text" }
          },
          getItemSummary: (item) => item.title || "Item"
        }
      },
      defaultProps: {
        title: "Latest Kiln Opening",
        items: [
          { title: "Speckled Mug", imageUrl: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=2070&auto=format&fit=crop" },
          { title: "Serving Bowl", imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2070&auto=format&fit=crop" },
          { title: "Pour Over Set", imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop" },
          { title: "Vase No. 4", imageUrl: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?q=80&w=2069&auto=format&fit=crop" },
          { title: "Espresso Cups", imageUrl: "https://images.unsplash.com/photo-1525992923594-541eeab57008?q=80&w=2070&auto=format&fit=crop" },
          { title: "Matcha Bowl", imageUrl: "https://images.unsplash.com/photo-1606364020108-a40dff75133d?q=80&w=2070&auto=format&fit=crop" }
        ]
      },
      render: ({ puck, ...props }) => <ArtisanGallery {...props} />
    },
    ProcessTimeline: {
      fields: {
        title: { type: "text" },
        steps: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" }
          },
          getItemSummary: (item) => item.title || "Step"
        }
      },
      defaultProps: {
        title: "The Craft",
        steps: [
          { title: "Sourcing Clay", description: "We wild-harvest our clay from local riverbeds in the Pacific Northwest, ensuring a deeply localized mineral composition." },
          { title: "Throwing", description: "Each form is turned on a traditional kick-wheel, allowing the maker's hands to imprint slight, beautiful variations." },
          { title: "Bisque Firing", description: "The dried greenware is slowly heated to 1900°F, transforming fragile earth into durable, porous ceramic." },
          { title: "Glazing & Final Fire", description: "We mix our own ash glazes before a final high-fire in a gas reduction kiln, creating unpredictable, stunning finishes." }
        ]
      },
      render: ({ puck, ...props }) => <ProcessTimeline {...props} />
    },
    PolaroidGallery: {
      fields: {
        title: { type: "text" },
        images: {
          type: "array",
          arrayFields: {
            url: { type: "text" },
            caption: { type: "text" }
          },
          getItemSummary: (item) => item.caption || "Image"
        }
      },
      defaultProps: {
        title: "Studio Moments",
        images: [
          { url: "https://images.unsplash.com/photo-1565191142273-05b1c6762c2e?q=80&w=1964&auto=format&fit=crop", caption: "Early morning wheel throwing" },
          { url: "https://images.unsplash.com/photo-1620220671607-bb53dc8ec9e5?q=80&w=2070&auto=format&fit=crop", caption: "Mixing our ash glazes" },
          { url: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=2072&auto=format&fit=crop", caption: "Loading the gas kiln" },
          { url: "https://images.unsplash.com/photo-1581452934812-78d1f7027cde?q=80&w=2070&auto=format&fit=crop", caption: "Finished speckled mug" }
        ]
      },
      render: ({ puck, ...props }) => <PolaroidGallery {...props} />
    },
    CustomOrderForm: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" }
      },
      defaultProps: {
        title: "Commission a Piece",
        description: "Have a specific form or glaze in mind? Let me know what you're dreaming of, and we'll bring it to life."
      },
      render: ({ puck, ...props }) => <CraftCustomOrderForm {...props} />
    },
    CraftStats: {
      fields: {
        stats: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            value: { type: "number" },
            suffix: { type: "text" }
          },
          getItemSummary: (item) => item.label || "Stat"
        }
      },
      defaultProps: {
        stats: [
          { label: "Mugs Fired", value: 1250, suffix: "+" },
          { label: "Sourced Clay", value: 100, suffix: "%" },
          { label: "Years Experience", value: 12, suffix: "" }
        ]
      },
      render: ({ puck, ...props }) => <CraftStats {...props} />
    },
    ...globalBlocks
  }
};

export const defaultData = {
  content: [
    { type: "MakerHero", props: { id: "MakerHero-1" } },
    { type: "ArtisanGallery", props: { id: "ArtisanGallery-1" } },
    { type: "ProcessTimeline", props: { id: "ProcessTimeline-1" } },
    { type: "PolaroidGallery", props: { id: "PolaroidGallery-1" } },
    { type: "CraftStats", props: { id: "CraftStats-1" } },
    { type: "CustomOrderForm", props: { id: "CustomOrderForm-1" } },
    { type: "MegaFooter", props: { id: "MegaFooter-1" } },
    { type: "FloatingWhatsApp", props: { id: "FloatingWhatsApp-1" } }
  ],
  root: {}
};
