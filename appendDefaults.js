const fs = require('fs');
const path = require('path');

const defaults = {
  salon: `
export const defaultData = {
  content: [
    { type: "Navbar", props: { id: "Navbar-1" } },
    { type: "SalonHero", props: { id: "SalonHero-1" } },
    { type: "ServiceMenu", props: { id: "ServiceMenu-1" } },
    { type: "TeamSection", props: { id: "TeamSection-1" } },
    { type: "GalleryGrid", props: { id: "GalleryGrid-1" } },
    { type: "Testimonial", props: { id: "Testimonial-1" } },
    { type: "LuxuryFooter", props: { id: "LuxuryFooter-1" } },
  ],
  root: {},
};
`,
  bakery: `
export const defaultData = {
  content: [
    { type: "BakeryHero", props: { id: "BakeryHero-1" } },
    { type: "ChefBio", props: { id: "ChefBio-1" } },
    { type: "ProductMenu", props: { id: "ProductMenu-1" } },
    { type: "TestimonialCarousel", props: { id: "TestimonialCarousel-1" } },
    { type: "LocationHours", props: { id: "LocationHours-1" } }
  ],
  root: {},
};
`,
  plumber: `
export const defaultData = {
  content: [
    { type: "EmergencyHero", props: { id: "EmergencyHero-1" } },
    { type: "ServiceProcess", props: { id: "ServiceProcess-1" } },
    { type: "ServiceGrid", props: { id: "ServiceGrid-1" } },
    { type: "PricingTable", props: { id: "PricingTable-1" } },
    { type: "EmergencyFAQ", props: { id: "EmergencyFAQ-1" } },
    { type: "TrustBadges", props: { id: "TrustBadges-1" } }
  ],
  root: {},
};
`,
  gym: `
export const defaultData = {
  content: [
    { type: "IntensityHero", props: { id: "IntensityHero-1" } },
    { type: "ClassSchedule", props: { id: "ClassSchedule-1" } },
    { type: "MembershipTiers", props: { id: "MembershipTiers-1" } },
    { type: "TrainerProfiles", props: { id: "TrainerProfiles-1" } },
    { type: "FacilityGallery", props: { id: "FacilityGallery-1" } },
    { type: "SuccessStories", props: { id: "SuccessStories-1" } }
  ],
  root: {},
};
`,
  lawyer: `
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
`,
  restaurant: `
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
`,
  portfolio: `
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
`
};

Object.entries(defaults).forEach(([key, value]) => {
  const filePath = path.join(__dirname, 'configs', key + '.config.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('export const defaultData')) {
    fs.appendFileSync(filePath, value);
    console.log('Appended to ' + key);
  }
});
