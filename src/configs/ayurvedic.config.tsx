import type { Config } from "@measured/puck";
import { NatureHero, type NatureHeroProps } from "../blocks/NatureHero";
import { RemedyGrid, type RemedyGridProps } from "../blocks/RemedyGrid";
import { WellnessConsultation, type WellnessConsultationProps } from "../blocks/WellnessConsultation";
import { HerbGlossary, type HerbGlossaryProps } from "../blocks/HerbGlossary";
import { HealingProcess, type HealingProcessProps } from "../blocks/HealingProcess";
import { VideoTestimonial, type VideoTestimonialProps } from "../blocks/VideoTestimonial";
import { globalBlocks, type GlobalProps } from "./globalBlocks";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  NatureHero: NatureHeroProps;
  RemedyGrid: RemedyGridProps;
  WellnessConsultation: WellnessConsultationProps;
  HerbGlossary: HerbGlossaryProps;
  HealingProcess: HealingProcessProps;
  VideoTestimonial: VideoTestimonialProps;
} & GlobalProps;

export const ayurvedicConfig: Config<Props> = {
  components: {
    NatureHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        buttonText: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Balance Your Mind, Body & Spirit",
        subheadline: "Ancient Wisdom for Modern Life",
        buttonText: "Begin Your Journey",
        imageUrl: "https://images.unsplash.com/photo-1552698059-e9bd9d5543c7?q=80&w=1964&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <NatureHero {...props} />
    },
    RemedyGrid: {
      fields: {
        title: { type: "text" },
        treatments: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            icon: {
              type: "select",
              options: [
                { label: "Leaf", value: "Leaf" },
                { label: "Droplets", value: "Droplets" },
                { label: "Flower", value: "Flower2" },
                { label: "Sparkles", value: "Sparkles" }
              ]
            }
          },
          getItemSummary: (item) => item.title || "Treatment"
        }
      },
      defaultProps: {
        title: "Holistic Therapies",
        treatments: [
          { title: "Panchakarma", description: "Deep detoxification and cleansing program designed to purify the body and restore balance.", icon: "Droplets" },
          { title: "Herbal Medicine", description: "Customized botanical formulations tailored to your specific constitution and imbalances.", icon: "Leaf" },
          { title: "Marma Therapy", description: "Gentle stimulation of vital energy points to release physical and emotional blockages.", icon: "Sparkles" }
        ]
      },
      render: ({ puck, ...props }) => <RemedyGrid {...props} />
    },
    WellnessConsultation: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
      },
      defaultProps: {
        title: "Schedule Your Assessment",
        description: "Discover your unique Dosha profile and receive a personalized wellness plan encompassing diet, lifestyle, and herbal recommendations.",
        buttonText: "Book Consultation",
      },
      render: ({ puck, ...props }) => <WellnessConsultation {...props} />
    },
    HerbGlossary: {
      fields: {
        title: { type: "text" },
        herbs: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            benefits: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField }
          },
          getItemSummary: (item) => item.name || "Herb"
        }
      },
      defaultProps: {
        title: "Apothecary",
        herbs: [
          { name: "Ashwagandha", benefits: "Stress Relief • Vitality", imageUrl: "https://images.unsplash.com/photo-1611078810237-646df87071ce?q=80&w=1974&auto=format&fit=crop" },
          { name: "Turmeric", benefits: "Anti-inflammatory • Immunity", imageUrl: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=2070&auto=format&fit=crop" },
          { name: "Triphala", benefits: "Digestion • Detoxification", imageUrl: "https://images.unsplash.com/photo-1596547609652-9fc5d8d428ce?q=80&w=2072&auto=format&fit=crop" }
        ]
      },
      render: ({ puck, ...props }) => <HerbGlossary {...props} />
    },
    HealingProcess: {
      fields: {
        title: { type: "text" },
        phases: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" }
          },
          getItemSummary: (item) => item.title || "Phase"
        }
      },
      defaultProps: {
        title: "The Path to Balance",
        phases: [
          { title: "Initial Consultation", description: "A comprehensive assessment of your Prakriti (constitution) and Vikriti (current imbalances)." },
          { title: "Detoxification (Shodhana)", description: "Gentle cleansing practices to remove accumulated toxins from the body channels." },
          { title: "Rejuvenation (Shamana)", description: "Nourishing therapies and herbal support to rebuild strength and vitality." },
          { title: "Lifestyle Integration", description: "Ongoing guidance for diet, routine, and mindfulness to maintain long-term harmony." }
        ]
      },
      render: ({ puck, ...props }) => <HealingProcess {...props} />
    },
    VideoTestimonial: {
      fields: {
        title: { type: "text" },
        videoUrl: { type: "custom", render: ImageUploadField },
        quote: { type: "textarea" },
        author: { type: "text" },
        authorRole: { type: "text" },
      },
      defaultProps: {
        title: "Patient Stories",
        videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop",
        quote: "Ayurveda completely transformed my approach to health. I finally feel aligned and energized.",
        author: "Sarah J.",
        authorRole: "Wellness Client",
      },
      render: ({ puck, ...props }) => <VideoTestimonial {...props} />
    },
    ...globalBlocks
  }
};

export const defaultData = {
  content: [
    { type: "NatureHero", props: { id: "NatureHero-1" } },
    { type: "RemedyGrid", props: { id: "RemedyGrid-1" } },
    { type: "HealingProcess", props: { id: "HealingProcess-1" } },
    { type: "HerbGlossary", props: { id: "HerbGlossary-1" } },
    { type: "VideoTestimonial", props: { id: "VideoTestimonial-1" } },
    { type: "WellnessConsultation", props: { id: "WellnessConsultation-1" } },
    { type: "MegaFooter", props: { id: "MegaFooter-1" } },
    { type: "FloatingWhatsApp", props: { id: "FloatingWhatsApp-1" } }
  ],
  root: {}
};
