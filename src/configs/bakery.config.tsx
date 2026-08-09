import type { Config } from "@measured/puck";
import { BakeryHero, type BakeryHeroProps } from "../blocks/BakeryHero";
import { ProductMenu, type ProductMenuProps } from "../blocks/ProductMenu";
import { LocationHours, type LocationHoursProps } from "../blocks/LocationHours";
import { ChefBio, type ChefBioProps } from "../blocks/ChefBio";
import { TestimonialCarousel, type TestimonialCarouselProps } from "../blocks/TestimonialCarousel";
import { ImageUploadField } from "../components/ImageUploadField";
import { ChefsSpecial, type ChefsSpecialProps } from "../blocks/ChefsSpecial";
// These four are forked bakery-only copies, not the shared blocks used by
// craft/clothing/ayurvedic/portfolio — see BakeryGalleryMasonry.tsx etc.
// for why: the redesign's grain/ember look shouldn't leak into other
// templates that happen to reuse the same component names.
import { GalleryMasonry, type GalleryMasonryProps } from "../blocks/BakeryGalleryMasonry";
import { CustomOrderForm, type CustomOrderFormProps } from "../blocks/BakeryCustomOrderForm";
import { ContactFooter, type ContactFooterProps } from "../blocks/BakeryContactFooter";
import { FloatingWhatsApp, type FloatingWhatsAppProps } from "../blocks/BakeryFloatingWhatsApp";
import { EmberMarquee, type EmberMarqueeProps } from "../blocks/EmberMarquee";

type Props = {
  BakeryHero: BakeryHeroProps;
  ProductMenu: ProductMenuProps;
  ChefBio: ChefBioProps;
  TestimonialCarousel: TestimonialCarouselProps;
  LocationHours: LocationHoursProps;
  ChefsSpecial: ChefsSpecialProps;
  GalleryMasonry: GalleryMasonryProps;
  CustomOrderForm: CustomOrderFormProps;
  ContactFooter: ContactFooterProps;
  FloatingWhatsApp: FloatingWhatsAppProps;
  EmberMarquee: EmberMarqueeProps;
};

export const bakeryConfig: Config<Props> = {
  components: {
    BakeryHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        buttonText: { type: "text" },
        backgroundImageUrl: { type: "custom", render: ImageUploadField },
      },
      defaultProps: {
        headline: "Artisan Breads & Pastries",
        subheadline: "Baked fresh daily using traditional methods and locally sourced ingredients.",
        buttonText: "Order Online",
        backgroundImageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <BakeryHero {...props} />
    },
    ProductMenu: {
      fields: {
        categories: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Category"
        },
        currencySymbol: { type: "text" },
        products: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            price: { type: "text" },
            description: { type: "textarea" },
            category: { type: "text" }
          },
          getItemSummary: (item) => item.title || "Product"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          categories: (data.props.categories as any[])?.map(c => c?.value || c) || ["Breads", "Pastries", "Cakes"]
        }
      }),
      defaultProps: {
        currencySymbol: "$",
        categories: [{ value: "Breads" }, { value: "Pastries" }, { value: "Cakes" }] as any,
        products: [
          { title: "Sourdough Loaf", price: "8", description: "Classic rustic loaf with a chewy crust.", category: "Breads" },
          { title: "Butter Croissant", price: "4.50", description: "Flaky, buttery perfection.", category: "Pastries" },
          { title: "Chocolate Eclair", price: "6", description: "Filled with vanilla custard.", category: "Pastries" }
        ]
      },
      render: ({ puck, ...props }) => <ProductMenu {...props} />
    },
    ChefBio: {
      fields: {
        name: { type: "text" },
        title: { type: "text" },
        bio: { type: "textarea" },
        imageUrl: { type: "custom", render: ImageUploadField },
        signatureText: { type: "text" },
      },
      defaultProps: {
        name: "Chef Julian Moreau",
        title: "Master Baker",
        bio: "With over 20 years of experience in Parisian patisseries, Julian brings authentic French baking techniques to our local community.\n\nEvery loaf is crafted with passion, patience, and the finest organic flour available.",
        imageUrl: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=1974&auto=format&fit=crop",
        signatureText: "J. Moreau"
      },
      render: ({ puck, ...props }) => <ChefBio {...props} />
    },
    TestimonialCarousel: {
      fields: {
        title: { type: "text" },
        testimonials: {
          type: "array",
          arrayFields: {
            quote: { type: "textarea" },
            author: { type: "text" },
            role: { type: "text" },
            rating: { type: "number" }
          },
          getItemSummary: (item) => item.author || "Testimonial"
        }
      },
      defaultProps: {
        title: "Loved by Locals",
        testimonials: [
          { quote: "The absolute best sourdough I've ever had. It's a weekend staple for our family now.", author: "Sarah Jenkins", role: "Local Resident", rating: 5 },
          { quote: "Their almond croissants transport me straight back to my vacation in Paris. Truly exceptional.", author: "Michael Chen", role: "Food Blogger", rating: 5 },
          { quote: "Friendly staff and the smell of fresh bread every morning. What more could you want?", author: "Emma Davis", role: "Daily Customer", rating: 4 }
        ]
      },
      render: ({ puck, ...props }) => <TestimonialCarousel {...props} />
    },
    LocationHours: {
      fields: {
        address: { type: "textarea" },
        hours: { type: "textarea" },
        phone: { type: "text" }
      },
      defaultProps: {
        address: "123 Artisan Alley\nPortland, OR 97205",
        hours: "Tue - Sun: 7am - 4pm\nMonday: Closed",
        phone: "+1 (555) 987-6543"
      },
      render: ({ puck, ...props }) => <LocationHours {...props} />
    },
    ChefsSpecial: {
      fields: {
        title: { type: "text" },
        dishName: { type: "text" },
        description: { type: "textarea" },
        ingredients: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Ingredient"
        },
        imageUrl: { type: "custom", render: ImageUploadField }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          ingredients: (data.props.ingredients as any[])?.map(i => i?.value || i) || ["Organic Flour", "Wild Yeast"]
        }
      }),
      defaultProps: {
        title: "Signature Bake",
        dishName: "The Grand Sourdough",
        description: "A 72-hour fermented sourdough boule with a dark, caramelized crust and an incredibly open, soft crumb. This is the loaf that put us on the map.",
        ingredients: [{ value: "Heritage Wheat" }, { value: "Filtered Water" }, { value: "Sea Salt" }, { value: "Wild Starter" }] as any,
        imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070&auto=format&fit=crop"
      },
      render: ({ puck, ...props }) => <ChefsSpecial {...props} />
    },
    GalleryMasonry: {
      fields: {
        sectionTitle: { type: "text" },
        imageUrls: {
          type: "array",
          arrayFields: {
            url: { type: "custom", render: ImageUploadField },
            title: { type: "text" }
          },
          getItemSummary: (item) => item.title || "Gallery Image"
        }
      },
      defaultProps: {
        sectionTitle: "Our Creations",
        imageUrls: [
          { url: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=2070&auto=format&fit=crop", title: "Fresh Croissants" },
          { url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop", title: "Cookie Assortment" },
          { url: "https://images.unsplash.com/photo-1621236378699-8597fc6a0c16?q=80&w=1974&auto=format&fit=crop", title: "Fruit Tarts" },
          { url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2132&auto=format&fit=crop", title: "Artisan Bread" }
        ]
      },
      render: ({ puck, ...props }) => <GalleryMasonry {...props} />
    },
    CustomOrderForm: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" }
      },
      defaultProps: {
        title: "Special Requests",
        description: "Need a custom cake for a wedding, birthday, or corporate event? Let us know what you have in mind and we'll bake it to perfection."
      },
      render: ({ puck, ...props }) => <CustomOrderForm {...props} />
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
        email: "hello@artisanbakery.com",
        tagline: "Hungry yet?",
        copyrightName: "The Artisan Bakery",
        socialLinks: [
          { platform: "Instagram", url: "#" },
          { platform: "Facebook", url: "#" },
          { platform: "Twitter", url: "#" }
        ]
      },
      render: ({ puck, ...props }) => <ContactFooter {...props} />
    },
    FloatingWhatsApp: {
      fields: {
        phoneNumber: { type: "text" },
        message: { type: "text" }
      },
      defaultProps: {
        phoneNumber: "1234567890",
        message: "Hi! I'd like to ask about your fresh bakes."
      },
      render: ({ puck, ...props }) => <FloatingWhatsApp {...props} />
    },
    EmberMarquee: {
      fields: {
        items: {
          type: "array",
          arrayFields: { value: { type: "text" } },
          getItemSummary: (item) => item.value || "Word"
        }
      },
      resolveData: (data) => ({
        ...data,
        props: {
          ...data.props,
          items: (data.props.items as any[])?.map(i => i?.value || i) || ["Handcrafted", "Small Batch", "Baked Daily"]
        }
      }),
      defaultProps: {
        items: [{ value: "Handcrafted" }, { value: "Small Batch" }, { value: "Baked Daily" }, { value: "Est. 1998" }] as any
      },
      render: ({ puck, ...props }) => <EmberMarquee {...props} />
    }
  }
};

export const defaultData = {
  content: [
    { type: "BakeryHero", props: { id: "BakeryHero-1" } },
    { type: "EmberMarquee", props: { id: "EmberMarquee-1" } },
    { type: "ChefsSpecial", props: { id: "ChefsSpecial-1" } },
    { type: "ProductMenu", props: { id: "ProductMenu-1" } },
    { type: "GalleryMasonry", props: { id: "GalleryMasonry-1" } },
    { type: "ChefBio", props: { id: "ChefBio-1" } },
    { type: "TestimonialCarousel", props: { id: "TestimonialCarousel-1" } },
    { type: "CustomOrderForm", props: { id: "CustomOrderForm-1" } },
    { type: "LocationHours", props: { id: "LocationHours-1" } },
    { type: "ContactFooter", props: { id: "ContactFooter-1" } },
    { type: "FloatingWhatsApp", props: { id: "FloatingWhatsApp-1" } }
  ],
  root: {},
};
