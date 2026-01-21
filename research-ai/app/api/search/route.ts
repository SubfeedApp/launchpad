import { NextRequest, NextResponse } from "next/server";
import { parseSearchResults } from "@/lib/research-ai";
import { search } from "@/lib/subfeed";

export async function POST(req: NextRequest) {
  try {
    const { query, options } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const response = await search(query, options);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error || "Search failed" },
        { status: 500 }
      );
    }

    const sources = parseSearchResults(response);

    return NextResponse.json({
      answer: response.data?.answer || "",
      sources,
      duration_ms: response.duration_ms,
      usage: response.usage,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
