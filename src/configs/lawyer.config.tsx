import type { Config } from "@measured/puck";
import { AuthorityHero, type AuthorityHeroProps } from "../blocks/AuthorityHero";
import { PracticeAreas, type PracticeAreasProps } from "../blocks/PracticeAreas";
import { SuccessStats, type SuccessStatsProps } from "../blocks/SuccessStats";
import { CaseStudies, type CaseStudiesProps } from "../blocks/CaseStudies";
import { AttorneyBios, type AttorneyBiosProps } from "../blocks/AttorneyBios";
import { ConsultationForm, type ConsultationFormProps } from "../blocks/ConsultationForm";
import { globalBlocks, type GlobalProps } from "./globalBlocks";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  AuthorityHero: AuthorityHeroProps;
  PracticeAreas: PracticeAreasProps;
  SuccessStats: SuccessStatsProps;
  CaseStudies: CaseStudiesProps;
  AttorneyBios: AttorneyBiosProps;
  ConsultationForm: ConsultationFormProps;
};

export const lawyerConfig: Config<Props> = {
  components: {
    AuthorityHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        buttonText: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Excellence in Corporate Law",
        subheadline: "Providing strategic legal counsel and aggressive representation for businesses worldwide.",
        buttonText: "Schedule Consultation",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <AuthorityHero {...props} />
    },
    PracticeAreas: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        areas: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            excerpt: { type: "textarea" },
            icon: {
              type: "select",
              options: [
                { label: "Scale", value: "Scale" },
                { label: "Briefcase", value: "Briefcase" },
                { label: "Users", value: "Users" },
                { label: "FileText", value: "FileText" }
              ]
            }
          },
          getItemSummary: (item) => item.title || "Area"
        }
      },
      defaultProps: {
        title: "Our Practice Areas",
        description: "We bring decades of specialized experience across multiple disciplines of corporate and civil law.",
        areas: [
          { title: "Corporate Governance", excerpt: "Advising boards and executives on fiduciary duties, compliance, and strategic planning.", icon: "Briefcase" },
          { title: "Mergers & Acquisitions", excerpt: "Structuring complex domestic and cross-border transactions for maximum value.", icon: "FileText" },
          { title: "Commercial Litigation", excerpt: "Fierce representation in high-stakes business disputes and arbitrations.", icon: "Scale" }
        ]
      },
      render: ({ puck, ...props }) => <PracticeAreas {...props} />
    },
    SuccessStats: {
      fields: {
        stats: {
          type: "array",
          arrayFields: {
            value: { type: "number" },
            suffix: { type: "text" },
            label: { type: "text" }
          },
          getItemSummary: (item) => item.label || "Stat"
        }
      },
      defaultProps: {
        stats: [
          { value: 25, suffix: "+", label: "Years of Experience" },
          { value: 500, suffix: "M+", label: "Settlements Secured" },
          { value: 98, suffix: "%", label: "Client Success Rate" }
        ]
      },
      render: ({ puck, ...props }) => <SuccessStats {...props} />
    },
    CaseStudies: {
      fields: {
        title: { type: "text" },
        cases: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            category: { type: "text" },
            description: { type: "textarea" },
            outcome: { type: "text" },
            duration: { type: "text" }
          },
          getItemSummary: (item) => item.title || "Case Study"
        }
      },
      defaultProps: {
        title: "Notable Successes",
        cases: [
          { title: "Global Tech Merger", category: "Mergers & Acquisitions", description: "Successfully navigated regulatory hurdles and finalized a $4.2B merger between two industry-leading software firms within a highly condensed timeline.", outcome: "$4.2B", duration: "18 Months" },
          { title: "Manufacturing Dispute", category: "Commercial Litigation", description: "Defended a major international manufacturer against breach of contract claims, resulting in a complete dismissal and recovery of legal fees.", outcome: "Dismissed", duration: "2 Years" },
          { title: "Corporate Restructuring", category: "Corporate Governance", description: "Advised a distressed Fortune 500 company on a comprehensive restructuring plan, avoiding bankruptcy and preserving shareholder value.", outcome: "Saved", duration: "9 Months" }
        ]
      },
      render: ({ puck, ...props }) => <CaseStudies {...props} />
    },
    AttorneyBios: {
      fields: {
        title: { type: "text" },
        attorneys: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            position: { type: "text" },
            email: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
            bio: { type: "textarea" }
          },
          getItemSummary: (item) => item.name || "Attorney"
        }
      },
      defaultProps: {
        title: "Our Legal Team",
        attorneys: [
          { name: "Eleanor Vance", position: "Managing Partner", email: "evance@example.com", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop", bio: "Recognized as a leading authority in corporate governance and international mergers." },
          { name: "Robert Sterling", position: "Senior Partner", email: "rsterling@example.com", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop", bio: "Fierce litigator with over 20 years of experience in high-stakes commercial disputes." },
          { name: "Maya Patel", position: "Associate", email: "mpatel@example.com", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop", bio: "Specializes in intellectual property and regulatory compliance for tech startups." }
        ]
      },
      render: ({ puck, ...props }) => <AttorneyBios {...props} />
    },
    ConsultationForm: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        buttonText: { type: "text" },
        privacyNote: { type: "text" },
      },
      defaultProps: {
        title: "Request a Confidential Consultation",
        subtitle: "Provide us with the details of your legal matter, and one of our specialists will contact you within 24 hours.",
        buttonText: "Submit Request",
        privacyNote: "All communications are protected by attorney-client privilege.",
      },
      render: ({ puck, ...props }) => <ConsultationForm {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "AuthorityHero", props: { id: "AuthorityHero-1" } },
    { type: "PracticeAreas", props: { id: "PracticeAreas-1" } },
    { type: "CaseStudies", props: { id: "CaseStudies-1" } },
    { type: "AttorneyBios", props: { id: "AttorneyBios-1" } },
    { type: "ConsultationForm", props: { id: "ConsultationForm-1" } },
    { type: "SuccessStats", props: { id: "SuccessStats-1" } }
  ],
  root: {},
};
