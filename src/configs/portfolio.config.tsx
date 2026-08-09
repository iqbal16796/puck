import type { Config } from "@measured/puck";
import { CreativeHero, type CreativeHeroProps } from "../blocks/CreativeHero";
import { ProjectGallery, type ProjectGalleryProps } from "../blocks/ProjectGallery";
import { ContactFooter, type ContactFooterProps } from "../blocks/ContactFooter";
import { WorkProcess, type WorkProcessProps } from "../blocks/WorkProcess";
import { SkillsMarquee, type SkillsMarqueeProps } from "../blocks/SkillsMarquee";
import { ClientLogos, type ClientLogosProps } from "../blocks/ClientLogos";
import { globalBlocks, type GlobalProps } from "./globalBlocks";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  CreativeHero: CreativeHeroProps;
  ProjectGallery: ProjectGalleryProps;
  ContactFooter: ContactFooterProps;
  WorkProcess: WorkProcessProps;
  SkillsMarquee: SkillsMarqueeProps;
  ClientLogos: ClientLogosProps;
};

export const portfolioConfig: Config<Props> = {
  components: {
    CreativeHero: {
      fields: {
        firstName: { type: "text" },
        lastName: { type: "text" },
        role: { type: "text" },
      },
      defaultProps: {
        firstName: "JONAS",
        lastName: "KAHN",
        role: "Digital Art Director & UI Designer",
      },
      render: ({ puck, ...props }) => <CreativeHero {...props} />
    },
    ProjectGallery: {
      fields: {
        projects: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            category: { type: "text" },
            imageUrl: { type: "custom", render: ImageUploadField },
            size: {
              type: "select",
              options: [
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" }
              ]
            }
          },
          getItemSummary: (item) => item.title || "Project"
        }
      },
      defaultProps: {
        projects: [
          { title: "Neo Tokyo", category: "Branding", imageUrl: "https://images.unsplash.com/photo-1542051812871-757500820028?q=80&w=1974&auto=format&fit=crop", size: "large" },
          { title: "Aura Skincare", category: "Packaging", imageUrl: "https://images.unsplash.com/photo-1615397323605-4e78ea90e8fa?q=80&w=1974&auto=format&fit=crop", size: "medium" },
          { title: "Vogue Editorial", category: "Photography", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", size: "small" },
          { title: "Lunar Architecture", category: "Concept Art", imageUrl: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop", size: "medium" },
          { title: "Oasis App", category: "UI/UX", imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop", size: "large" },
          { title: "Echo Sounds", category: "Web Design", imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop", size: "small" }
        ]
      },
      render: ({ puck, ...props }) => <ProjectGallery {...props} />
    },
    WorkProcess: {
      fields: {
        title: { type: "text" },
        steps: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" }
          },
          getItemSummary: (item) => item.title || "Step"
        }
      },
      defaultProps: {
        title: "The Process",
        steps: [
          { title: "Discovery", description: "Deep diving into the brand's core values, target audience, and market positioning to establish a solid foundation." },
          { title: "Ideation", description: "Exploring multiple creative directions, sketching concepts, and iterating based on continuous feedback loops." },
          { title: "Execution", description: "Bringing the chosen concept to life with meticulous attention to detail, motion, and interaction design." }
        ]
      },
      render: ({ puck, ...props }) => <WorkProcess {...props} />
    },
    SkillsMarquee: {
      fields: {
        skills: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Skill"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          skills: (data.props.skills as any[])?.map(s => typeof s === "string" ? { value: s } : s) || []
        }
      }),
      defaultProps: {
        skills: [{ value: "Figma" }, { value: "Next.js" }, { value: "Framer Motion" }, { value: "Tailwind CSS" }, { value: "WebGL" }, { value: "UI/UX" }] as any
      },
      render: ({ puck, ...props }) => <SkillsMarquee {...props} />
    },
    ClientLogos: {
      fields: {
        title: { type: "text" },
        logos: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            url: { type: "text" }
          },
          getItemSummary: (item) => item.name || "Logo"
        }
      },
      defaultProps: {
        title: "Trusted By",
        logos: [
          { name: "Acme Corp", url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" },
          { name: "Globex", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
          { name: "Soylent", url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Y_Combinator_logo.svg" },
          { name: "Initech", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
          { name: "Umbrella", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
        ]
      },
      render: ({ puck, ...props }) => <ClientLogos {...props} />
    },
    ContactFooter: {
      fields: {
        email: { type: "text" },
        tagline: { type: "text" },
        copyrightName: { type: "text" },
        socialLinks: {
          type: "array",
          arrayFields: {
            platform: { type: "text" },
            url: { type: "text" }
          },
          getItemSummary: (item) => item.platform || "Social Link"
        }
      },
      defaultProps: {
        email: "hello@jonaskahn.studio",
        tagline: "Got an idea?",
        copyrightName: "Jonas Kahn Studio",
        socialLinks: [
          { platform: "Instagram", url: "#" },
          { platform: "Behance", url: "#" },
          { platform: "Twitter", url: "#" },
          { platform: "LinkedIn", url: "#" }
        ]
      },
      render: ({ puck, ...props }) => <ContactFooter {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "CreativeHero", props: { id: "CreativeHero-1" } },
    { type: "WorkProcess", props: { id: "WorkProcess-1" } },
    { type: "ProjectGallery", props: { id: "ProjectGallery-1" } },
    { type: "SkillsMarquee", props: { id: "SkillsMarquee-1" } },
    { type: "ClientLogos", props: { id: "ClientLogos-1" } },
    { type: "ContactFooter", props: { id: "ContactFooter-1" } }
  ],
  root: {},
};
