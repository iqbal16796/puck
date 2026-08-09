import type { Config } from "@measured/puck";
import { EmergencyHero, type EmergencyHeroProps } from "../blocks/EmergencyHero";
import { ServiceGrid, type ServiceGridProps } from "../blocks/ServiceGrid";
import { TrustBadges, type TrustBadgesProps } from "../blocks/TrustBadges";
import { ServiceProcess, type ServiceProcessProps } from "../blocks/ServiceProcess";
import { PricingTable, type PricingTableProps } from "../blocks/PricingTable";
import { EmergencyFAQ, type EmergencyFAQProps } from "../blocks/EmergencyFAQ";
import { globalBlocks, type GlobalProps } from "./globalBlocks";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  EmergencyHero: EmergencyHeroProps;
  ServiceGrid: ServiceGridProps;
  TrustBadges: TrustBadgesProps;
  ServiceProcess: ServiceProcessProps;
  PricingTable: PricingTableProps;
  EmergencyFAQ: EmergencyFAQProps;
};

export const plumberConfig: Config<Props> = {
  components: {
    EmergencyHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        phoneNumber: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Fast, Reliable Plumbing Services",
        subheadline: "Don't let a leak ruin your day. Our licensed professionals are available 24/7 to solve your plumbing emergencies.",
        phoneNumber: "1-800-555-0199",
        backgroundImageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <EmergencyHero {...props} />
    },
    ServiceGrid: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        services: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            icon: {
              type: "select",
              options: [
                { label: "Droplet", value: "Droplet" },
                { label: "Wrench", value: "Wrench" },
                { label: "ThermometerSun", value: "ThermometerSun" },
                { label: "ShieldCheck", value: "ShieldCheck" }
              ]
            }
          },
          getItemSummary: (item) => item.title || "Service"
        }
      },
      defaultProps: {
        title: "Our Expert Services",
        subtitle: "From minor leaks to full system installations, we handle it all with precision and care.",
        services: [
          { title: "Leak Repair", description: "Fast detection and permanent fixes for all types of pipe leaks.", icon: "Droplet" },
          { title: "Pipe Installation", description: "Complete repiping and new construction plumbing installations.", icon: "Wrench" },
          { title: "Water Heaters", description: "Repair and installation of traditional and tankless water heaters.", icon: "ThermometerSun" }
        ]
      },
      render: ({ puck, ...props }) => <ServiceGrid {...props} />
    },
    TrustBadges: {
      fields: {
        badges: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            subtitle: { type: "text" },
            icon: {
              type: "select",
              options: [
                { label: "Shield", value: "Shield" },
                { label: "Award", value: "Award" },
                { label: "ThumbsUp", value: "ThumbsUp" },
                { label: "Clock", value: "Clock" }
              ]
            }
          },
          getItemSummary: (item) => item.title || "Badge"
        }
      },
      defaultProps: {
        badges: [
          { title: "Licensed", subtitle: "& Fully Insured", icon: "Shield" },
          { title: "15+ Years", subtitle: "Experience", icon: "Award" },
          { title: "5-Star", subtitle: "Customer Ratings", icon: "ThumbsUp" },
          { title: "24/7", subtitle: "Emergency Response", icon: "Clock" }
        ]
      },
      render: ({ puck, ...props }) => <TrustBadges {...props} />
    },
    ServiceProcess: {
      fields: {
        title: { type: "text" },
        steps: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            icon: { type: "text" }
          },
          getItemSummary: (item) => item.title || "Step"
        }
      },
      defaultProps: {
        title: "How It Works",
        steps: [
          { title: "Call Us 24/7", description: "Speak directly to a dispatcher who will send a plumber to your home immediately.", icon: "Phone" },
          { title: "We Arrive Promptly", description: "Our fully-stocked trucks arrive quickly, equipped to handle most issues on the spot.", icon: "Truck" },
          { title: "Problem Fixed", description: "We provide upfront pricing and resolve the issue quickly and cleanly.", icon: "CheckCircle2" }
        ]
      },
      render: ({ puck, ...props }) => <ServiceProcess {...props} />
    },
    PricingTable: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        plans: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            features: { type: "array", arrayFields: { value: { type: "text" } } },
            isPopular: { type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] }
          },
          getItemSummary: (item) => item.name || "Plan"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          plans: (data.props.plans as any[])?.map(p => ({
            ...p,
            features: p.features?.map((f: any) => f?.value || f) || []
          })) || []
        }
      }),
      defaultProps: {
        title: "Upfront Pricing",
        subtitle: "No hidden fees, no surprises. Just honest, transparent pricing for common plumbing needs.",
        plans: [
          { name: "Drain Clearing", price: "$149", features: [{ value: "Video Inspection" }, { value: "Snake Clog Removal" }, { value: "Free Flow Test" }], isPopular: false },
          { name: "Water Heater Install", price: "$999", features: [{ value: "Removal of Old Unit" }, { value: "New 50-Gal Installation" }, { value: "Code Upgrades" }, { value: "10-Year Warranty" }], isPopular: true },
          { name: "Toilet Replacement", price: "$349", features: [{ value: "Removal & Disposal" }, { value: "New Wax Ring & Bolts" }, { value: "Standard Toilet Included" }], isPopular: false }
        ] as any
      },
      render: ({ puck, ...props }) => <PricingTable {...props} />
    },
    EmergencyFAQ: {
      fields: {
        title: { type: "text" },
        faqs: {
          type: "array",
          arrayFields: {
            question: { type: "text" },
            answer: { type: "textarea" }
          },
          getItemSummary: (item) => item.question || "FAQ"
        }
      },
      defaultProps: {
        title: "Emergency Plumbing FAQs",
        faqs: [
          { question: "What should I do if a pipe bursts?", answer: "Immediately shut off your main water valve to prevent further flooding. Then, turn off the electricity to the affected area if it's safe to do so, and call us right away." },
          { question: "How quickly can you arrive?", answer: "We aim to have a technician at your door within 60 minutes for all emergency calls within our primary service area." },
          { question: "Do you charge extra for nights or weekends?", answer: "For true emergencies, we do not charge additional after-hours fees. Our goal is to get your home safe and dry as quickly as possible." }
        ]
      },
      render: ({ puck, ...props }) => <EmergencyFAQ {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "EmergencyHero", props: { id: "EmergencyHero-1" } },
    { type: "ServiceProcess", props: { id: "ServiceProcess-1" } },
    { type: "ServiceGrid", props: { id: "ServiceGrid-1" } },
    { type: "PricingTable", props: { id: "PricingTable-1" } },
    { type: "EmergencyFAQ", props: { id: "EmergencyFAQ-1" } },
    { type: "TrustBadges", props: { id: "TrustBadges-1" } }
  ],
  root: {},
};
