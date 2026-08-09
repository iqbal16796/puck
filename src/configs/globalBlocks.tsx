import React from "react";
import { MegaFooter, type MegaFooterProps } from "../blocks/MegaFooter";
import { FloatingWhatsApp, type FloatingWhatsAppProps } from "../blocks/FloatingWhatsApp";

export type GlobalProps = {
  MegaFooter: MegaFooterProps;
  FloatingWhatsApp: FloatingWhatsAppProps;
};

export const globalBlocks = {
  MegaFooter: {
    fields: {
      brandName: { type: "text" },
      newsletterHeadline: { type: "textarea" },
      socialLinks: {
        type: "array",
        arrayFields: {
          platform: {
            type: "select",
            options: [
              { label: "Instagram", value: "Instagram" },
              { label: "Twitter", value: "Twitter" },
              { label: "LinkedIn", value: "Linkedin" },
              { label: "Facebook", value: "Facebook" }
            ]
          },
          url: { type: "text" }
        },
        getItemSummary: (item: any) => item.platform || "Social Link"
      }
    },
    defaultProps: {
      brandName: "STUDIO",
      newsletterHeadline: "Stay in the loop. Join our newsletter for exclusive updates.",
      socialLinks: [
        { platform: "Instagram", url: "#" },
        { platform: "Twitter", url: "#" }
      ]
    },
    render: ({ puck, ...props }: any) => {
      return <MegaFooter {...props} />;
    }
  },
  FloatingWhatsApp: {
    fields: {
      phoneNumber: { type: "text" },
      message: { type: "text" }
    },
    defaultProps: {
      phoneNumber: "1234567890",
      message: "Hello! I'm interested in your services."
    },
    render: ({ puck, ...props }: any) => {
      return <FloatingWhatsApp {...props} />;
    }
  }
} as any;
