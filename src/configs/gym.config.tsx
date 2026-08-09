import type { Config } from "@measured/puck";
import { IntensityHero, type IntensityHeroProps } from "../blocks/IntensityHero";
import { ClassSchedule, type ClassScheduleProps } from "../blocks/ClassSchedule";
import { TrainerProfiles, type TrainerProfilesProps } from "../blocks/TrainerProfiles";
import { MembershipTiers, type MembershipTiersProps } from "../blocks/MembershipTiers";
import { SuccessStories, type SuccessStoriesProps } from "../blocks/SuccessStories";
import { FacilityGallery, type FacilityGalleryProps } from "../blocks/FacilityGallery";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  IntensityHero: IntensityHeroProps;
  ClassSchedule: ClassScheduleProps;
  TrainerProfiles: TrainerProfilesProps;
  MembershipTiers: MembershipTiersProps;
  SuccessStories: SuccessStoriesProps;
  FacilityGallery: FacilityGalleryProps;
};

export const gymConfig: Config<Props> = {
  components: {
    IntensityHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        buttonText: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Push Your Limits",
        subheadline: "The Ultimate High-Intensity Training Facility",
        buttonText: "Join the Resistance",
        backgroundImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <IntensityHero {...props} />
    },
    ClassSchedule: {
      fields: {
        title: { type: "text" },
        classes: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            time: { type: "text" },
            trainer: { type: "text" },
            intensity: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField }
          },
          getItemSummary: (item) => item.name || "Class"
        }
      },
      defaultProps: {
        title: "Daily Grinds",
        classes: [
          { name: "Inferno HIIT", time: "06:00 AM", trainer: "Marcus Cole", intensity: "Extreme", imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1925&auto=format&fit=crop" },
          { name: "Iron Forge", time: "12:00 PM", trainer: "Sarah Vance", intensity: "High", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" },
          { name: "Core Crusher", time: "05:30 PM", trainer: "Jax Reyes", intensity: "Medium", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" }
        ]
      },
      render: ({ puck, ...props }) => <ClassSchedule {...props} />
    },
    TrainerProfiles: {
      fields: {
        title: { type: "text" },
        trainers: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            specialty: { type: "text" },
            quote: { type: "textarea" },
            imageUrl: { type: "custom", render: ImageUploadField }
          },
          getItemSummary: (item) => item.name || "Trainer"
        }
      },
      defaultProps: {
        title: "The Elite Vanguard",
        trainers: [
          { name: "Marcus Cole", specialty: "HIIT & Conditioning", quote: "Excuses don't burn calories. Sweat does.", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
          { name: "Sarah Vance", specialty: "Olympic Weightlifting", quote: "Lift heavy, live light.", imageUrl: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1974&auto=format&fit=crop" },
          { name: "Jax Reyes", specialty: "Functional Movement", quote: "Build the machine from the inside out.", imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" }
        ]
      },
      render: ({ puck, ...props }) => <TrainerProfiles {...props} />
    },
    MembershipTiers: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        tiers: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            period: { type: "text" },
            features: { type: "array", arrayFields: { value: { type: "text" } } },
            isPopular: { type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] }
          },
          getItemSummary: (item) => item.name || "Tier"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          tiers: (data.props.tiers as any[])?.map(t => ({
            ...t,
            features: t.features?.map((f: any) => f?.value || f) || []
          })) || []
        }
      }),
      defaultProps: {
        title: "Choose Your Arsenal",
        subtitle: "No commitments. Just results.",
        tiers: [
          { name: "Basic", price: "$49", period: "mo", features: [{ value: "Open Gym Access" }, { value: "Locker Room" }, { value: "1 Free Evaluation" }], isPopular: false },
          { name: "Pro", price: "$99", period: "mo", features: [{ value: "Unlimited Classes" }, { value: "Guest Passes" }, { value: "Sauna Access" }, { value: "Nutrition Plan" }], isPopular: true },
          { name: "Elite", price: "$149", period: "mo", features: [{ value: "All Pro Features" }, { value: "Personal Coaching" }, { value: "Recovery Room" }], isPopular: false }
        ] as any
      },
      render: ({ puck, ...props }) => <MembershipTiers {...props} />
    },
    SuccessStories: {
      fields: {
        sectionTitle: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
        quote: { type: "textarea" },
        author: { type: "text" },
        achievement: { type: "text" },
      },
      defaultProps: {
        sectionTitle: "Transformation Stories",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
        quote: "I didn't just lose weight. I found a strength I never knew I had.",
        author: "David M.",
        achievement: "Lost 45 lbs in 6 months",
      },
      render: ({ puck, ...props }) => <SuccessStories {...props} />
    },
    FacilityGallery: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        images: {
          type: "array",
          arrayFields: {
            url: { type: "text" },
            alt: { type: "text" },
          },
          getItemSummary: (item) => item.alt || "Image",
        },
      },
      defaultProps: {
        title: "The Battleground",
        subtitle: "State-of-the-art equipment. No excuses.",
        images: [
          { url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop", alt: "Weight floor" },
          { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop", alt: "Cardio zone" },
          { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop", alt: "Group class" },
          { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop", alt: "Free weights" },
        ],
      },
      render: ({ puck, ...props }) => <FacilityGallery {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "IntensityHero", props: { id: "IntensityHero-1" } },
    { type: "ClassSchedule", props: { id: "ClassSchedule-1" } },
    { type: "MembershipTiers", props: { id: "MembershipTiers-1" } },
    { type: "TrainerProfiles", props: { id: "TrainerProfiles-1" } },
    { type: "FacilityGallery", props: { id: "FacilityGallery-1" } },
    { type: "SuccessStories", props: { id: "SuccessStories-1" } }
  ],
  root: {},
};
