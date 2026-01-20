import { NextRequest, NextResponse } from "next/server";
import { extract } from "@/lib/subfeed";

export async function POST(req: NextRequest) {
  try {
    const { url, format } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const result = await extract(url, { format });

    if (!result.success) {
      throw new Error(result.error || "Extraction failed");
    }

    return NextResponse.json({
      url,
      title: result.data?.title || "",
      content: result.data?.content || "",
      metadata: result.data?.metadata || {},
    });
  } catch (error) {
    console.error("Extract error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("ADDON_NOT_ENABLED") || message.includes("addon")) {
      return NextResponse.json(
        { error: "Web extract not enabled. Enable the web_extract addon on your entity." },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
