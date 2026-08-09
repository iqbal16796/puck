import type { Data } from "@measured/puck";

// Structural checks over puck_data's JSON shape — no AI, no crawler, just
// rules written once against the field-naming conventions used across
// src/blocks/*.tsx (imageUrl/alt pairs, headline/subheadline on Hero
// components, title/sectionTitle/heading elsewhere).
export type LintIssue = {
  id: string;
  componentId: string;
  componentType: string;
  rule: "missing-alt" | "empty-text-field" | "hero-no-text";
  message: string;
  path: (string | number)[];
  suggestedValue: string;
};

const HEADING_KEYS = /^(title|sectiontitle|heading)$/i;
const ALT_KEYS = /alt$/i;
const IMAGE_URL_KEYS = /^(url|imageurl|avatarurl|logourl|backgroundimageurl|src)$/i;

function isEmpty(value: unknown) {
  return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
}

function humanize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function walkObjects(node: any, path: (string | number)[], onObject: (obj: any, path: (string | number)[]) => void) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walkObjects(item, [...path, i], onObject));
  } else if (node && typeof node === "object") {
    onObject(node, path);
    for (const key of Object.keys(node)) {
      walkObjects(node[key], [...path, key], onObject);
    }
  }
}

export function lintPuckData(data: Data): LintIssue[] {
  const issues: LintIssue[] = [];
  const content = ((data as any)?.content ?? []) as any[];

  content.forEach((component, index) => {
    const componentId = component.props?.id ?? `${component.type}-${index}`;
    const props = component.props ?? {};

    // Missing image alt text: an image field has a value, but its sibling
    // alt field exists and is blank.
    walkObjects(props, [], (obj, path) => {
      const hasImage = Object.keys(obj).some(
        (k) => IMAGE_URL_KEYS.test(k) && typeof obj[k] === "string" && obj[k].trim() !== ""
      );
      if (!hasImage) return;

      const altKey = Object.keys(obj).find((k) => ALT_KEYS.test(k));
      if (altKey && isEmpty(obj[altKey])) {
        const fallback = obj.caption || obj.name || obj.title || obj.customerName || "Image";
        issues.push({
          id: `${componentId}:${[...path, altKey].join(".")}`,
          componentId,
          componentType: component.type,
          rule: "missing-alt",
          message: `${component.type}: image is missing alt text`,
          path: [...path, altKey],
          suggestedValue: String(fallback),
        });
      }
    });

    // Empty headings/titles (direct props only, deliberately excludes
    // headline/subheadline — those are covered by the Hero-specific rule
    // below so a blank hero headline isn't reported twice).
    for (const key of Object.keys(props)) {
      if (HEADING_KEYS.test(key) && isEmpty(props[key])) {
        issues.push({
          id: `${componentId}:${key}`,
          componentId,
          componentType: component.type,
          rule: "empty-text-field",
          message: `${component.type}: "${humanize(key)}" is empty`,
          path: [key],
          suggestedValue: humanize(component.type),
        });
      }
    }

    // Hero with no text at all
    if (/hero/i.test(component.type)) {
      const hasHeadline = !isEmpty(props.headline);
      const hasSubheadline = !isEmpty(props.subheadline);
      if (!hasHeadline && !hasSubheadline) {
        issues.push({
          id: `${componentId}:hero-empty`,
          componentId,
          componentType: component.type,
          rule: "hero-no-text",
          message: `${component.type}: hero section has no headline or subheadline text`,
          path: ["headline"],
          suggestedValue: "Welcome — tell visitors what you do",
        });
      }
    }
  });

  return issues;
}

function findComponentIndex(data: Data, componentId: string) {
  const content = ((data as any).content ?? []) as any[];
  return content.findIndex((c, i) => (c.props?.id ?? `${c.type}-${i}`) === componentId);
}

export function applyLintFix(data: Data, issue: LintIssue): Data {
  const content = [...(((data as any).content ?? []) as any[])];
  const idx = findComponentIndex(data, issue.componentId);
  if (idx === -1) return data;

  const component = JSON.parse(JSON.stringify(content[idx]));
  let target = component.props;
  for (let i = 0; i < issue.path.length - 1; i++) {
    target = target[issue.path[i]];
  }
  target[issue.path[issue.path.length - 1]] = issue.suggestedValue;

  content[idx] = component;
  return { ...(data as any), content } as Data;
}

export function applyAllLintFixes(data: Data, issues: LintIssue[]): Data {
  return issues.reduce((acc, issue) => applyLintFix(acc, issue), data);
}
