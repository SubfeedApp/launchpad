import { scrapeAndSummarize } from "@/lib/subfeed";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return Response.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const result = await scrapeAndSummarize(url);
    return Response.json(result);
  } catch (error) {
    console.error("Scrape error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to process URL" },
      { status: 500 }
    );
  }
}
