import type { Config } from "@measured/puck";
import { ImmersiveHero, type ImmersiveHeroProps } from "../blocks/ImmersiveHero";
import { MenuSection, type MenuSectionProps } from "../blocks/MenuSection";
import { ReservationCTA, type ReservationCTAProps } from "../blocks/ReservationCTA";
import { ChefsSpecial, type ChefsSpecialProps } from "../blocks/ChefsSpecial";
import { AtmosphereGallery, type AtmosphereGalleryProps } from "../blocks/AtmosphereGallery";
import { NewsletterVIP, type NewsletterVIPProps } from "../blocks/NewsletterVIP";
import { globalBlocks, type GlobalProps } from "./globalBlocks";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  ImmersiveHero: ImmersiveHeroProps;
  MenuSection: MenuSectionProps;
  ReservationCTA: ReservationCTAProps;
  ChefsSpecial: ChefsSpecialProps;
  AtmosphereGallery: AtmosphereGalleryProps;
  NewsletterVIP: NewsletterVIPProps;
};

export const restaurantConfig: Config<Props> = {
  components: {
    ImmersiveHero: {
      fields: {
        restaurantName: { type: "text" },
        tagline: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
        openingHours: { type: "text" },
        reservationPhone: { type: "text" },
      },
      defaultProps: {
        restaurantName: "L'Aura",
        tagline: "Modern Fine Dining",
        backgroundImageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
        openingHours: "Tue–Sun: 6pm – 11pm",
        reservationPhone: "+1 (212) 555-0178",
      },
      render: ({ puck, ...props }) => <ImmersiveHero {...props} />
    },
    MenuSection: {
      fields: {
        title: { type: "text" },
        categories: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Category"
        },
        items: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            description: { type: "textarea" },
            price: { type: "text" },
            category: { type: "text" }
          },
          getItemSummary: (item) => item.name || "Item"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          categories: (data.props.categories as any[])?.map(c => c?.value || c) || ["Starters", "Mains", "Desserts"]
        }
      }),
      defaultProps: {
        title: "Tasting Menu",
        categories: [{ value: "Starters" }, { value: "Mains" }, { value: "Desserts" }] as any,
        items: [
          { name: "Wagyu Beef Tartare", description: "Quail egg, black truffle shavings, toasted brioche.", price: "$28", category: "Starters" },
          { name: "Pan-Seared Scallops", description: "Cauliflower purée, brown butter, caper raisin emulsion.", price: "$24", category: "Starters" },
          { name: "Chilean Sea Bass", description: "Miso glaze, baby bok choy, ginger dashi broth.", price: "$46", category: "Mains" },
          { name: "Duck Breast A L'Orange", description: "Crispy skin, sweet potato fondant, grand marnier reduction.", price: "$42", category: "Mains" },
          { name: "Valrhona Chocolate Soufflé", description: "Madagascar vanilla bean crème anglaise.", price: "$18", category: "Desserts" }
        ]
      },
      render: ({ puck, ...props }) => <MenuSection {...props} />
    },
    ReservationCTA: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "text" },
        buttonText: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Experience L'Aura",
        subheadline: "Reserve your table for an unforgettable culinary journey.",
        buttonText: "Book a Table",
        backgroundImageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <ReservationCTA {...props} />
    },
    ChefsSpecial: {
      fields: {
        title: { type: "text" },
        dishName: { type: "text" },
        description: { type: "textarea" },
        ingredients: { type: "array", arrayFields: { value: { type: "text" } } },
        imageUrl: { type: "custom", render: ImageUploadField }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          ingredients: (data.props.ingredients as any[])?.map(i => i?.value || i) || []
        }
      }),
      defaultProps: {
        title: "Chef's Signature",
        dishName: "Truffle Butter Lobster Tail",
        description: "Freshly caught Maine lobster tail, slow-poached in imported French butter and topped with shaved black truffles.",
        ingredients: [{ value: "Maine Lobster" }, { value: "Black Truffle" }, { value: "Normandy Butter" }, { value: "Micro Herbs" }] as any,
        imageUrl: "https://images.unsplash.com/photo-1559742811-822873691fc8?q=80&w=1974&auto=format&fit=crop"
      },
      render: ({ puck, ...props }) => <ChefsSpecial {...props} />
    },
    AtmosphereGallery: {
      fields: {
        title: { type: "text" },
        images: { type: "array", arrayFields: { url: { type: "text" } } }
      },
      defaultProps: {
        title: "The Atmosphere",
        images: [
          { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop" }
        ]
      },
      render: ({ puck, ...props }) => <AtmosphereGallery {...props} />
    },
    NewsletterVIP: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        placeholderText: { type: "text" },
        buttonText: { type: "text" },
      },
      defaultProps: {
        title: "L'Aura VIP Club",
        subtitle: "Join our exclusive members list for priority reservations, private tasting event invitations, and seasonal menu previews.",
        placeholderText: "Enter your email address...",
        buttonText: "Join the Club",
      },
      render: ({ puck, ...props }) => <NewsletterVIP {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "ImmersiveHero", props: { id: "ImmersiveHero-1" } },
    { type: "ChefsSpecial", props: { id: "ChefsSpecial-1" } },
    { type: "MenuSection", props: { id: "MenuSection-1" } },
    { type: "AtmosphereGallery", props: { id: "AtmosphereGallery-1" } },
    { type: "ReservationCTA", props: { id: "ReservationCTA-1" } },
    { type: "NewsletterVIP", props: { id: "NewsletterVIP-1" } }
  ],
  root: {},
};
