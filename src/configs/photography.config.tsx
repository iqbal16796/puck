import type { Config } from "@measured/puck";
import { PhotographyHero } from "@/blocks/PhotographyHero";
import { PhotographyClientMarquee } from "@/blocks/PhotographyClientMarquee";
import { PhotographyGallery } from "@/blocks/PhotographyGallery";
import { PhotographyStatement } from "@/blocks/PhotographyStatement";
import { PhotographyServices } from "@/blocks/PhotographyServices";
import { PhotographyContact } from "@/blocks/PhotographyContact";

import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  PhotographyHero: { title: string; imageUrl: string };
  PhotographyClientMarquee: { clients: { name: string }[] };
  PhotographyGallery: { images: { title: string; imageUrl: string }[] };
  PhotographyStatement: { quote: string };
  PhotographyServices: { title: string; services: { name: string; description: string }[] };
  PhotographyContact: { title: string; description: string };
};

export const photographyConfig: Config<Props> = {
  components: {
    PhotographyHero: {
      fields: {
        title: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {"title": "Lumina Studio", "imageUrl": "https://images.unsplash.com/photo-1551300974-e35b7e9b068c?auto=format&fit=crop&w=1600&q=85"},
      render: ({ puck, ...props }) => <PhotographyHero {...props} />,
    },
    PhotographyClientMarquee: {
      fields: {
        clients: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
          },
          getItemSummary: (item) => item.name || "Client",
        },
      },
      defaultProps: {
        clients: [
          { name: "Vogue" },
          { name: "Chanel" },
          { name: "Prada" },
          { name: "Gucci" },
          { name: "Dior" },
        ]
      },
      render: ({ puck, ...props }) => <PhotographyClientMarquee {...props} />,
    },
    PhotographyGallery: {
      fields: {
        images: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.title || "Image",
        },
      },
      defaultProps: {"images": [{"title": "Editorial 01", "imageUrl": "https://images.unsplash.com/photo-1512413914488-842247fb72a3?auto=format&fit=crop&w=1000&q=85"}, {"title": "Portraiture", "imageUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85"}, {"title": "Fashion Week", "imageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"}, {"title": "Still Life", "imageUrl": "https://images.unsplash.com/photo-1505691724218-bb969ce73822?auto=format&fit=crop&w=1000&q=85"}, {"title": "Movement", "imageUrl": "https://images.unsplash.com/photo-1517436073-3b1b1178a946?auto=format&fit=crop&w=1000&q=85"}, {"title": "Architecture", "imageUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85"}]},
      render: ({ puck, ...props }) => <PhotographyGallery {...props} />,
    },
    PhotographyStatement: {
      fields: {
        quote: { type: "textarea" },
      },
      defaultProps: {"quote": "Light shapes the narrative. We capture what words cannot."},
      render: ({ puck, ...props }) => <PhotographyStatement {...props} />,
    },
    PhotographyServices: {
      fields: {
        title: { type: "text" },
        services: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            description: { type: "textarea" },
          },
          getItemSummary: (item) => item.name || "Service",
        },
      },
      defaultProps: {
        title: "Expertise",
        services: [
          { name: "Editorial", description: "Fashion and lifestyle campaigns for global brands." },
          { name: "Portraiture", description: "Intimate and cinematic portraits of individuals and teams." },
          { name: "Commercial", description: "High-end product and architecture photography." }
        ]
      },
      render: ({ puck, ...props }) => <PhotographyServices {...props} />,
    },
    PhotographyContact: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
      },
      defaultProps: {
        title: "Get in touch.",
        description: "Available for commissions worldwide."
      },
      render: ({ puck, ...props }) => <PhotographyContact {...props} />,
    },
  },
};

export const defaultData = {
  root: {},
  content: [
    { type: "PhotographyHero", props: { id: "photography-hero-1" } },
    { type: "PhotographyClientMarquee", props: { id: "photography-clients-1" } },
    { type: "PhotographyGallery", props: { id: "photography-gallery-1" } },
    { type: "PhotographyStatement", props: { id: "photography-statement-1" } },
    { type: "PhotographyServices", props: { id: "photography-services-1" } },
    { type: "PhotographyContact", props: { id: "photography-contact-1" } },
  ],
};
