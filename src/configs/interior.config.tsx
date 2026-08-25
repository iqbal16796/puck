import type { Config } from "@measured/puck";
import { InteriorHero } from "@/blocks/InteriorHero";
import { InteriorProjects } from "@/blocks/InteriorProjects";
import { InteriorMaterials } from "@/blocks/InteriorMaterials";
import { InteriorProcess } from "@/blocks/InteriorProcess";
import { InteriorJournal } from "@/blocks/InteriorJournal";

import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  InteriorHero: { description: string; imageUrl: string };
  InteriorProjects: { title: string; projects: { name: string; category: string; imageUrl: string }[] };
  InteriorMaterials: { title: string; items: { name: string; detail: string; imageUrl: string }[] };
  InteriorProcess: { title: string; steps: { name: string; description: string }[] };
  InteriorJournal: { posts: { title: string; category: string; imageUrl: string }[] };
};

export const interiorConfig: Config<Props> = {
  components: {
    InteriorHero: {
      fields: {
        description: { type: "textarea" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {"description": "Interior architecture for homes, hospitality and places with a point of view.", "imageUrl": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"},
      render: ({ puck, ...props }) => <InteriorHero {...props} />,
    },
    InteriorProjects: {
      fields: {
        title: { type: "text" },
        projects: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            category: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Project",
        },
      },
      defaultProps: {"title": "Quietly expressive spaces.", "projects": [{"name": "Casa Noma", "category": "Residential", "imageUrl": "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85"}, {"name": "Form House", "category": "Hospitality", "imageUrl": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85"}, {"name": "Oak / Light", "category": "Residential", "imageUrl": "https://images.unsplash.com/photo-1600566753051-0c2d6d2a5c8f?auto=format&fit=crop&w=1400&q=85"}]},
      render: ({ puck, ...props }) => <InteriorProjects {...props} />,
    },
    InteriorMaterials: {
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            detail: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Material",
        },
      },
      defaultProps: {
        title: "Tactile Foundations",
        items: [
          { name: "Travertine", detail: "Sourced from Italy", imageUrl: "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1000&q=85" },
          { name: "Aged Brass", detail: "Living finish", imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=85" },
        ]
      },
      render: ({ puck, ...props }) => <InteriorMaterials {...props} />,
    },
    InteriorProcess: {
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
        title: "Our Approach",
        steps: [
          { name: "Concept", description: "Establishing the narrative and spatial flow." },
          { name: "Curation", description: "Sourcing unique vintage and contemporary pieces." },
          { name: "Execution", description: "Rigorous oversight of architectural details." }
        ]
      },
      render: ({ puck, ...props }) => <InteriorProcess {...props} />,
    },
    InteriorJournal: {
      fields: {
        posts: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            category: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.title || "Post",
        },
      },
      defaultProps: {
        posts: [
          { title: "The Art of Wabi-Sabi", category: "Philosophy", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85" },
          { title: "Sourcing in Milan", category: "Travel", imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85" }
        ]
      },
      render: ({ puck, ...props }) => <InteriorJournal {...props} />,
    },
  },
};

export const defaultData = {
  root: {},
  content: [
    { type: "InteriorHero", props: { id: "interior-hero-1" } },
    { type: "InteriorProjects", props: { id: "interior-projects-1" } },
    { type: "InteriorMaterials", props: { id: "interior-materials-1" } },
    { type: "InteriorProcess", props: { id: "interior-process-1" } },
    { type: "InteriorJournal", props: { id: "interior-journal-1" } },
  ],
};
