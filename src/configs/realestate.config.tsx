import type { Config } from "@measured/puck";
import { RealEstateHero } from "@/blocks/RealEstateHero";
import { RealEstateListings } from "@/blocks/RealEstateListings";
import { RealEstateStats } from "@/blocks/RealEstateStats";
import { RealEstatePropertyExplorer } from "@/blocks/RealEstatePropertyExplorer";
import { RealEstateNeighborhoods } from "@/blocks/RealEstateNeighborhoods";
import { RealEstateAgentSpotlight } from "@/blocks/RealEstateAgentSpotlight";

import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  RealEstateHero: { eyebrow: string; title: string; accent: string; description: string; imageUrl: string };
  RealEstatePropertyExplorer: { eyebrow: string; title: string; properties: { name: string; location: string; price: string; type: string; imageUrl: string }[] };
  RealEstateListings: { title: string; items: { name: string; location: string; price: string; imageUrl: string }[] };
  RealEstateNeighborhoods: { title: string; items: { name: string; description: string; imageUrl: string }[] };
  RealEstateStats: { statement: string };
  RealEstateAgentSpotlight: { name: string; role: string; bio: string; imageUrl: string };
};

export const realestateConfig: Config<Props> = {
  components: {
    RealEstateHero: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        accent: { type: "text" },
        description: { type: "textarea" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {"eyebrow": "Luxury property studio", "title": "Find a place to", "accent": "belong.", "description": "Exceptional homes, quietly represented. A modern real estate studio for people who care about where life happens.", "imageUrl": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"},
      render: ({ puck, ...props }) => <RealEstateHero {...props} />,
    },
    RealEstatePropertyExplorer: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        properties: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            location: { type: "text" },
            price: { type: "text" },
            type: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Property",
        },
      },
      defaultProps: {
        "eyebrow": "Explore",
        "title": "Curated Collections",
        "properties": [
          { "name": "Modern Glass", "location": "Beverly Hills", "price": "$4.5M", "type": "Villa", "imageUrl": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85" },
          { "name": "Oceanfront", "location": "Malibu", "price": "$8.2M", "type": "Estate", "imageUrl": "https://images.unsplash.com/photo-1600607687126-8a3414349a51?auto=format&fit=crop&w=1400&q=85" },
        ]
      },
      render: ({ puck, ...props }) => <RealEstatePropertyExplorer {...props} />,
    },
    RealEstateListings: {
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            location: { type: "text" },
            price: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Listing",
        },
      },
      defaultProps: {"title": "Architecture worth coming home to.", "items": [{"name": "Casa Verde", "location": "Palm Springs", "price": "$2.4M", "imageUrl": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"}, {"name": "The Glass House", "location": "Los Angeles", "price": "$3.8M", "imageUrl": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"}, {"name": "Canyon House", "location": "Malibu", "price": "$5.1M", "imageUrl": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"}]},
      render: ({ puck, ...props }) => <RealEstateListings {...props} />,
    },
    RealEstateNeighborhoods: {
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            description: { type: "textarea" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Neighborhood",
        },
      },
      defaultProps: {
        "title": "Prime Locations",
        "items": [
          { "name": "Hollywood Hills", "description": "Iconic views and architectural masterpieces.", "imageUrl": "https://images.unsplash.com/photo-1518596637130-9b6267f516a2?auto=format&fit=crop&w=1400&q=85" },
          { "name": "Bel Air", "description": "Privacy and prestige in the heart of LA.", "imageUrl": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85" }
        ]
      },
      render: ({ puck, ...props }) => <RealEstateNeighborhoods {...props} />,
    },
    RealEstateStats: {
      fields: {
        statement: { type: "text" },
      },
      defaultProps: {"statement": "HOMES WITH A POINT OF VIEW"},
      render: ({ puck, ...props }) => <RealEstateStats {...props} />,
    },
    RealEstateAgentSpotlight: {
      fields: {
        name: { type: "text" },
        role: { type: "text" },
        bio: { type: "textarea" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        "name": "Sarah Jenkins",
        "role": "Principal Partner",
        "bio": "Specializing in architectural properties across Southern California.",
        "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85"
      },
      render: ({ puck, ...props }) => <RealEstateAgentSpotlight {...props} />,
    },
  },
};

export const defaultData = {
  root: {},
  content: [
    { type: "RealEstateHero", props: { id: "realestate-1" } },
    { type: "RealEstatePropertyExplorer", props: { id: "realestate-explorer-1" } },
    { type: "RealEstateListings", props: { id: "realestate-2" } },
    { type: "RealEstateNeighborhoods", props: { id: "realestate-neighborhoods-1" } },
    { type: "RealEstateStats", props: { id: "realestate-3" } },
    { type: "RealEstateAgentSpotlight", props: { id: "realestate-agent-1" } },
  ],
};
