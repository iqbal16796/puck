import type { Config } from "@measured/puck";
import { HotelHero } from "@/blocks/HotelHero";
import { HotelRooms } from "@/blocks/HotelRooms";
import { HotelExperiences } from "@/blocks/HotelExperiences";
import { HotelAmenities } from "@/blocks/HotelAmenities";
import { HotelDining } from "@/blocks/HotelDining";
import { HotelBooking } from "@/blocks/HotelBooking";

import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  HotelHero: { eyebrow: string; title: string; description: string; imageUrl: string };
  HotelRooms: { title: string; rooms: { name: string; detail: string; imageUrl: string }[] };
  HotelExperiences: { title: string; items: { name: string; detail: string; imageUrl: string }[] };
  HotelAmenities: { title: string; amenities: { name: string }[] };
  HotelDining: { title: string; imageUrl: string; description: string };
  HotelBooking: { title: string; imageUrl: string };
};

export const hotelConfig: Config<Props> = {
  components: {
    HotelHero: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {"eyebrow": "Welcome to", "title": "The Azure", "description": "Where time slows down. An immersive boutique resort blending brutalist architecture with wild nature.", "imageUrl": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85"},
      render: ({ puck, ...props }) => <HotelHero {...props} />,
    },
    HotelRooms: {
      fields: {
        title: { type: "text" },
        rooms: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            detail: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Room",
        },
      },
      defaultProps: {"title": "Suites & Villas", "rooms": [{"name": "Ocean Villa", "detail": "Private pool • 120sqm", "imageUrl": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85"}, {"name": "Jungle Suite", "detail": "Forest views • 85sqm", "imageUrl": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85"}, {"name": "Cliff Pavilion", "detail": "Panoramic • 150sqm", "imageUrl": "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=1000&q=85"}]},
      render: ({ puck, ...props }) => <HotelRooms {...props} />,
    },
    HotelExperiences: {
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            detail: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Experience",
        },
      },
      defaultProps: {
        title: "Curated Experiences",
        items: [
          { name: "Sailing", detail: "Private yacht charters at sunset.", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85" },
          { name: "Spa", detail: "Ancient holistic treatments.", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85" }
        ]
      },
      render: ({ puck, ...props }) => <HotelExperiences {...props} />,
    },
    HotelAmenities: {
      fields: {
        title: { type: "text" },
        amenities: {
          type: "array",
          arrayFields: {
            name: { type: "text" }
          },
          getItemSummary: (item) => item.name || "Amenity",
        },
      },
      defaultProps: {
        title: "Everything you need. Nothing you don't.",
        amenities: [
          { name: "Private Beach Access" },
          { name: "Infinity Pool" },
          { name: "Helipad" },
          { name: "24/7 Butler Service" },
          { name: "Farm-to-table Dining" },
          { name: "Wellness Center" }
        ]
      },
      render: ({ puck, ...props }) => <HotelAmenities {...props} />,
    },
    HotelDining: {
      fields: {
        title: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
        description: { type: "textarea" },
      },
      defaultProps: {
        title: "Gastronomy",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
        description: "Experience hyper-local ingredients elevated by global techniques. Our chefs forage daily from the surrounding landscape to create a menu that reflects the exact moment in time."
      },
      render: ({ puck, ...props }) => <HotelDining {...props} />,
    },
    HotelBooking: {
      fields: {
        title: { type: "text" },
        imageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {"title": "Reserve your escape", "imageUrl": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85"},
      render: ({ puck, ...props }) => <HotelBooking {...props} />,
    },
  },
};

export const defaultData = {
  root: {},
  content: [
    { type: "HotelHero", props: { id: "hotel-hero-1" } },
    { type: "HotelRooms", props: { id: "hotel-rooms-1" } },
    { type: "HotelExperiences", props: { id: "hotel-exp-1" } },
    { type: "HotelAmenities", props: { id: "hotel-amenities-1" } },
    { type: "HotelDining", props: { id: "hotel-dining-1" } },
    { type: "HotelBooking", props: { id: "hotel-booking-1" } },
  ],
};
