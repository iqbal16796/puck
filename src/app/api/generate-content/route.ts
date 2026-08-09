import { NextResponse } from "next/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a copywriter generating website content for a salon business. Given a one-sentence business description, output ONLY a JSON object (no markdown, no commentary) matching exactly this shape:
{
  "navbar": { "logoText": string, "ctaText": string },
  "hero": { "headline": string, "subheadline": string, "buttonText": string, "badgeText": string },
  "services": {
    "categories": string[] (2-4 short category names),
    "services": [{ "title": string, "price": string, "description": string, "category": string }] (4-6 items, price as a plain number string like "85")
  },
  "team": {
    "sectionTitle": string,
    "members": [{ "name": string, "role": string, "bio": string }] (exactly 3 people)
  },
  "testimonials": [{ "quote": string, "customerName": string, "starRating": 5 }] (exactly 3),
  "footer": { "brandName": string, "tagline": string, "address": string, "phone": string, "email": string, "workingHours": string }
}
Keep copy concise and on-brand for the business described. Invent plausible names, prices, and contact details for a fictional business — do not use placeholders like "N/A" or "TBD".`;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI drafting isn't configured (missing GROQ_API_KEY)." },
      { status: 501 }
    );
  }

  const { description } = await request.json();
  if (!description || typeof description !== "string") {
    return NextResponse.json({ error: "Missing description" }, { status: 400 });
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: description.slice(0, 500) },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Groq API error:", res.status, errText);
      return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content;
    const patch = JSON.parse(raw);

    return NextResponse.json({ patch });
  } catch (err: any) {
    console.error("generate-content error:", err);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
