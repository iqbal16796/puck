import type { Config } from "@measured/puck";
import { AIAgencyHero } from "@/blocks/AIAgencyHero";
import { AIAgencySystems } from "@/blocks/AIAgencySystems";
import { AIAgencyCTA } from "@/blocks/AIAgencyCTA";
import { AIAgencyMetrics } from "@/blocks/AIAgencyMetrics";
import { AIAgencyWorkflow } from "@/blocks/AIAgencyWorkflow";
import { AIAgencyCaseStudies } from "@/blocks/AIAgencyCaseStudies";

import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  AIAgencyHero: { title: string; accent: string; description: string };
  AIAgencySystems: { title: string; systems: { name: string; description: string }[] };
  AIAgencyCTA: { title: string };
  AIAgencyMetrics: { items: { value: string; label: string }[] };
  AIAgencyWorkflow: { title: string; steps: { name: string; description: string }[] };
  AIAgencyCaseStudies: { title: string; cases: { name: string; result: string; imageUrl: string }[] };
};

export const aiagencyConfig: Config<Props> = {
  components: {
    AIAgencyHero: {
      fields: {
        title: { type: "text" },
        accent: { type: "text" },
        description: { type: "textarea" },
      },
      defaultProps: {"title": "Build intelligence.", "accent": "that works.", "description": "We design AI systems, automations and intelligent workflows that turn complex operations into simple leverage."},
      render: ({ puck, ...props }) => <AIAgencyHero {...props} />,
    },
    AIAgencyMetrics: {
      fields: {
        items: {
          type: "array",
          arrayFields: {
            value: { type: "text" },
            label: { type: "text" },
          },
          getItemSummary: (item) => item.label || "Metric",
        },
      },
      defaultProps: {
        items: [
          { value: "40%", label: "efficiency gained" },
          { value: "24/7", label: "autonomous operation" },
          { value: "10x", label: "output velocity" }
        ]
      },
      render: ({ puck, ...props }) => <AIAgencyMetrics {...props} />,
    },
    AIAgencySystems: {
      fields: {
        title: { type: "text" },
        systems: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            description: { type: "textarea" },
          },
          getItemSummary: (item) => item.name || "System",
        },
      },
      defaultProps: {"title": "From idea to intelligent system.", "systems": [{"name": "AI Operations", "description": "Automate repetitive workflows and give teams intelligent operational leverage."}, {"name": "Knowledge Systems", "description": "Turn internal knowledge into searchable, contextual and useful AI experiences."}, {"name": "AI Products", "description": "Design and ship focused AI products around real customer problems."}, {"name": "Workflow Agents", "description": "Connect tools, decisions and actions into autonomous business workflows."}]},
      render: ({ puck, ...props }) => <AIAgencySystems {...props} />,
    },
    AIAgencyWorkflow: {
      fields: {
        title: { type: "text" },
        steps: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            description: { type: "textarea" },
          },
          getItemSummary: (item) => item.name || "Step",
        },
      },
      defaultProps: {
        title: "How we deploy.",
        steps: [
          { name: "Audit", description: "Analyzing current operations." },
          { name: "Architecture", description: "Designing the agent network." },
          { name: "Integration", description: "Deploying inside your existing tech stack." }
        ]
      },
      render: ({ puck, ...props }) => <AIAgencyWorkflow {...props} />,
    },
    AIAgencyCaseStudies: {
      fields: {
        title: { type: "text" },
        cases: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            result: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Case Study",
        },
      },
      defaultProps: {
        title: "Proof, not promises.",
        cases: [
          { name: "Legal Tech", result: "90% faster contract review", imageUrl: "" },
          { name: "Healthcare", result: "Zero-latency patient triage", imageUrl: "" },
          { name: "E-Commerce", result: "Fully autonomous support", imageUrl: "" }
        ]
      },
      render: ({ puck, ...props }) => <AIAgencyCaseStudies {...props} />,
    },
    AIAgencyCTA: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {"title": "What could your business do with an extra brain?"},
      render: ({ puck, ...props }) => <AIAgencyCTA {...props} />,
    },
  },
};

export const defaultData = {
  root: {},
  content: [
    { type: "AIAgencyHero", props: { id: "aiagency-hero-1" } },
    { type: "AIAgencyMetrics", props: { id: "aiagency-metrics-1" } },
    { type: "AIAgencySystems", props: { id: "aiagency-systems-1" } },
    { type: "AIAgencyWorkflow", props: { id: "aiagency-workflow-1" } },
    { type: "AIAgencyCaseStudies", props: { id: "aiagency-cases-1" } },
    { type: "AIAgencyCTA", props: { id: "aiagency-cta-1" } },
  ],
};
