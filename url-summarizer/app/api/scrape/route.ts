import { NextRequest, NextResponse } from "next/server";
import { scrapeAndSummarize } from "@/lib/subfeed";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const result = await scrapeAndSummarize(url);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Scrape error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    // Check for addon not enabled error
    if (message.includes("ADDON_NOT_ENABLED") || message.includes("addon")) {
      return NextResponse.json(
        { error: "Web scrape not enabled." },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
