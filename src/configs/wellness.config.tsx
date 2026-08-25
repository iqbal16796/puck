import type { Config } from "@measured/puck";
import { WellnessHero, type WellnessHeroProps } from "../blocks/WellnessHero";
import { WellnessIntro, type WellnessIntroProps } from "../blocks/WellnessIntro";
import { WellnessStatement, type WellnessStatementProps } from "../blocks/WellnessStatement";
import { WellnessPrograms, type WellnessProgramsProps } from "../blocks/WellnessPrograms";
import { WellnessSchedule, type WellnessScheduleProps } from "../blocks/WellnessSchedule";
import { WellnessInstructors, type WellnessInstructorsProps } from "../blocks/WellnessInstructors";
import { WellnessPricing, type WellnessPricingProps } from "../blocks/WellnessPricing";
import { WellnessTestimonials, type WellnessTestimonialsProps } from "../blocks/WellnessTestimonials";
import { WellnessFaq, type WellnessFaqProps } from "../blocks/WellnessFaq";
import { WellnessCta, type WellnessCtaProps } from "../blocks/WellnessCta";
import { WellnessFooter, type WellnessFooterProps } from "../blocks/WellnessFooter";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  WellnessHero: WellnessHeroProps;
  WellnessIntro: WellnessIntroProps;
  WellnessStatement: WellnessStatementProps;
  WellnessPrograms: WellnessProgramsProps;
  WellnessSchedule: WellnessScheduleProps;
  WellnessInstructors: WellnessInstructorsProps;
  WellnessPricing: WellnessPricingProps;
  WellnessTestimonials: WellnessTestimonialsProps;
  WellnessFaq: WellnessFaqProps;
  WellnessCta: WellnessCtaProps;
  WellnessFooter: WellnessFooterProps;
};

export const wellnessConfig: Config<Props> = {
  components: {
    WellnessHero: {
      fields: {
        eyebrow: { type: "text" },
        headline: { type: "text" },
        accentWord: { type: "text" },
        description: { type: "textarea" },
        primaryCta: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        eyebrow: "A modern wellness studio",
        headline: "MOVE\nWITH",
        accentWord: "INTENTION.",
        description: "Movement, breathwork and mindful strength in a calm space designed to help you feel better in your body and clearer in your mind.",
        primaryCta: "Book a class",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <WellnessHero {...props} />,
    },
    WellnessIntro: {
      fields: {
        marqueeText: { type: "text" },
        headline: { type: "textarea" },
        stats: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
            label: { type: "text" },
          },
        },
      },
      defaultProps: {
        marqueeText: "MOVE ✦ BREATHE ✦ RESET ✦ MOVE ✦ BREATHE ✦ RESET ✦",
        headline: "WE DON'T CHASE PERFECTION.\nWE BUILD PRESENCE.",
        stats: [
          { value: "2k+", label: "members supported" },
          { value: "18", label: "weekly classes" },
          { value: "4.9/5", label: "average member rating" },
        ],
      },
      render: ({ puck, ...props }) => <WellnessIntro {...props} />,
    },
    WellnessStatement: {
      fields: {
        quote: { type: "textarea" },
        author: { type: "text" },
      },
      defaultProps: {
        quote: "THE BODY IS NOT\nA PROJECT TO FIX.",
        author: "STILLWELL",
      },
      render: ({ puck, ...props }) => <WellnessStatement {...props} />,
    },
    WellnessPrograms: {
      fields: {
        programs: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            duration: { type: "text" },
            level: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.title || "Program",
        },
      },
      defaultProps: {
        programs: [
          {
            title: "Slow Flow",
            description: "A gentle, grounding practice focusing on deep stretching, intentional breathing, and mindful movement.",
            duration: "60 Min",
            level: "All Levels",
            imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop",
          },
          {
            title: "Power Yoga",
            description: "An energizing sequence designed to build heat, strength, and endurance through continuous movement.",
            duration: "45 Min",
            level: "Intermediate",
            imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
          },
          {
            title: "Deep Reset",
            description: "Restorative postures held for longer periods to release deep-seated tension and down-regulate the nervous system.",
            duration: "75 Min",
            level: "Beginner",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2199&auto=format&fit=crop",
          },
        ],
      },
      render: ({ puck, ...props }) => <WellnessPrograms {...props} />,
    },
    WellnessSchedule: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        classes: {
          type: "array",
          arrayFields: {
            time: { type: "text" },
            title: { type: "text" },
            instructor: { type: "text" },
            type: { type: "text" },
          },
          getItemSummary: (item) => `${item.time} - ${item.title}` || "Class",
        },
      },
      defaultProps: {
        eyebrow: "Schedule",
        title: "Find your class",
        classes: [
          { time: "07:00", title: "Morning Flow", instructor: "Maya", type: "Yoga" },
          { time: "09:30", title: "Pilates Core", instructor: "Nora", type: "Pilates" },
          { time: "12:15", title: "Midday Reset", instructor: "Ari", type: "Mobility" },
          { time: "17:30", title: "Power Flow", instructor: "Maya", type: "Yoga" },
          { time: "19:00", title: "Deep Reset", instructor: "Leah", type: "Restorative" },
        ],
      },
      render: ({ puck, ...props }) => <WellnessSchedule {...props} />,
    },
    WellnessInstructors: {
      fields: {
        instructors: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            role: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Instructor",
        },
      },
      defaultProps: {
        instructors: [
          { name: "Maya Sterling", role: "Lead Yoga Guide", imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop" },
          { name: "Nora Chen", role: "Pilates Instructor", imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop" },
          { name: "Ari Vance", role: "Mobility Specialist", imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop" },
          { name: "Leah Davis", role: "Breathwork Facilitator", imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2199&auto=format&fit=crop" },
        ],
      },
      render: ({ puck, ...props }) => <WellnessInstructors {...props} />,
    },
    WellnessPricing: {
      fields: {
        plans: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            period: { type: "text" },
            description: { type: "textarea" },
            features: { type: "array", arrayFields: { text: { type: "text" } } },
            featured: { type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
          },
          getItemSummary: (item) => item.name || "Plan",
        },
      },
      defaultProps: {
        plans: [
          {
            name: "Starter",
            price: "$89",
            period: "/month",
            description: "Perfect for those building a consistent weekly practice.",
            features: ["4 classes per month", "Mat & towel service", "Access to community events"],
            featured: false,
          },
          {
            name: "Unlimited",
            price: "$189",
            period: "/month",
            description: "Full access to our studio and comprehensive digital library.",
            features: ["Unlimited classes", "Priority booking", "Bring a friend passes (2/mo)", "Access to digital library"],
            featured: true,
          },
          {
            name: "Private",
            price: "$349",
            period: "/month",
            description: "Dedicated one-on-one attention for specialized growth.",
            features: ["2 private sessions per month", "Unlimited group classes", "Customized mobility plan"],
            featured: false,
          },
        ],
      },
      render: ({ puck, ...props }) => <WellnessPricing {...props} plans={props.plans as any} />,
    },
    WellnessTestimonials: {
      fields: {
        testimonials: {
          type: "array",
          arrayFields: {
            quote: { type: "textarea" },
            name: { type: "text" },
            detail: { type: "text" },
          },
          getItemSummary: (item) => item.name || "Testimonial",
        },
      },
      defaultProps: {
        testimonials: [
          { quote: "This studio completely changed my relationship with movement. It's the first time I actually look forward to working out.", name: "Sarah Jenkins", detail: "Member since 2022" },
          { quote: "The instructors here don't just guide you through motions—they teach you how to inhabit your body again.", name: "Michael Vance", detail: "Member since 2023" },
          { quote: "An absolute sanctuary in the middle of the city. The space is beautiful and the community is incredibly welcoming.", name: "Elena Rostova", detail: "Founding Member" },
        ],
      },
      render: ({ puck, ...props }) => <WellnessTestimonials {...props} />,
    },
    WellnessFaq: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            question: { type: "text" },
            answer: { type: "textarea" },
          },
          getItemSummary: (item) => item.question || "FAQ",
        },
      },
      defaultProps: {
        items: [
          { question: "What should I bring to my first class?", answer: "Just yourself and some water! We provide premium mats, towels, and all necessary props for every class at no extra charge." },
          { question: "I've never done yoga before. Is this for me?", answer: "Absolutely. Our 'Slow Flow' and 'Deep Reset' classes are perfect for beginners. Our instructors offer modifications for every pose." },
          { question: "How early should I arrive?", answer: "We recommend arriving 10-15 minutes before class starts. This gives you time to store your belongings, get a mat, and settle into the space." },
          { question: "Can I cancel or reschedule a class?", answer: "Yes, you can cancel or reschedule up to 12 hours before the class start time without penalty through our app." },
        ],
      },
      render: ({ puck, ...props }) => <WellnessFaq {...props} />,
    },
    WellnessCta: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        buttonLabel: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        eyebrow: "Your next chapter",
        title: "Make a little more room for feeling good.",
        description: "Come as you are. Leave with a little more space in your body, your breath and your day.",
        buttonLabel: "Start your journey",
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <WellnessCta {...props} />,
    },
    WellnessFooter: {
      fields: {
        brandName: { type: "text" },
        copyright: { type: "text" },
        links: {
          type: "array",
          arrayFields: { label: { type: "text" }, href: { type: "text" } },
          getItemSummary: (item) => item.label || "Link",
        },
        socials: {
          type: "array",
          arrayFields: { label: { type: "text" }, href: { type: "text" } },
          getItemSummary: (item) => item.label || "Social",
        },
      },
      defaultProps: {
        brandName: "STILLWELL",
        copyright: "© 2026 Stillwell Studio. All rights reserved.",
        links: [
          { label: "Yoga", href: "#" },
          { label: "Pilates", href: "#" },
          { label: "Movement", href: "#" },
          { label: "Breathwork", href: "#" },
        ],
        socials: [
          { label: "Instagram", href: "#" },
          { label: "Spotify", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      render: ({ puck, ...props }) => <WellnessFooter {...props} />,
    },
  },
};

export const defaultData = {
  content: [
    { type: "WellnessHero", props: { id: "WellnessHero-1" } },
    { type: "WellnessIntro", props: { id: "WellnessIntro-1" } },
    { type: "WellnessPrograms", props: { id: "WellnessPrograms-1" } },
    { type: "WellnessStatement", props: { id: "WellnessStatement-1" } },
    { type: "WellnessSchedule", props: { id: "WellnessSchedule-1" } },
    { type: "WellnessInstructors", props: { id: "WellnessInstructors-1" } },
    { type: "WellnessPricing", props: { id: "WellnessPricing-1" } },
    { type: "WellnessTestimonials", props: { id: "WellnessTestimonials-1" } },
    { type: "WellnessFaq", props: { id: "WellnessFaq-1" } },
    { type: "WellnessCta", props: { id: "WellnessCta-1" } },
    { type: "WellnessFooter", props: { id: "WellnessFooter-1" } },
  ],
  root: {},
};
