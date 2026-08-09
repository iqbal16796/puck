import { salonConfig, defaultData as salonDefaultData } from './salon.config';
import { bakeryConfig, defaultData as bakeryDefaultData } from './bakery.config';
import { plumberConfig, defaultData as plumberDefaultData } from './plumber.config';
import { gymConfig, defaultData as gymDefaultData } from './gym.config';
import { lawyerConfig, defaultData as lawyerDefaultData } from './lawyer.config';
import { restaurantConfig, defaultData as restaurantDefaultData } from './restaurant.config';
import { portfolioConfig, defaultData as portfolioDefaultData } from './portfolio.config';
import { clothingConfig, defaultData as clothingDefaultData } from './clothing.config';
import { ayurvedicConfig, defaultData as ayurvedicDefaultData } from './ayurvedic.config';
import { craftConfig, defaultData as craftDefaultData } from './craft.config';
import { educationConfig, defaultData as educationDefaultData } from './education.config';

export const templateConfigs: Record<string, any> = {
  salon: salonConfig,
  bakery: bakeryConfig,
  plumber: plumberConfig,
  education: educationConfig,
  gym: gymConfig,
  lawyer: lawyerConfig,
  restaurant: restaurantConfig,
  portfolio: portfolioConfig,
  clothing: clothingConfig,
  ayurvedic: ayurvedicConfig,
  craft: craftConfig,
};

export const templateData: Record<string, any> = {
  salon: salonDefaultData,
  bakery: bakeryDefaultData,
  plumber: plumberDefaultData,
  gym: gymDefaultData,
  education: educationDefaultData,
  lawyer: lawyerDefaultData,
  restaurant: restaurantDefaultData,
  portfolio: portfolioDefaultData,
  clothing: clothingDefaultData,
  ayurvedic: ayurvedicDefaultData,
  craft: craftDefaultData,
};

/**
 * Gets the correct Puck config for both current and legacy site records.
 *
 * Older records may contain a display label such as "Education" instead of
 * the gallery's lowercase template id. If the id is absent or stale, infer
 * the template from the saved block types before falling back to Salon.
 */
export function getTemplateConfig(templateId: unknown, puckData?: unknown) {
  const normalizedTemplateId =
    typeof templateId === "string" ? templateId.trim().toLowerCase() : "";

  if (templateConfigs[normalizedTemplateId]) {
    return templateConfigs[normalizedTemplateId];
  }

  const content = (puckData as { content?: Array<{ type?: string }> } | null)
    ?.content;

  if (Array.isArray(content) && content.length > 0) {
    const matchingConfig = Object.values(templateConfigs).find((config: any) =>
      content.every((item) => item.type && config.components?.[item.type]),
    );

    if (matchingConfig) {
      return matchingConfig;
    }
  }

  return templateConfigs.salon;
}
