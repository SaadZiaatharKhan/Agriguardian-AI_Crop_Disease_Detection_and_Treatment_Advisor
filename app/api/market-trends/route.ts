import { NextResponse } from "next/server";
import { SerpAPILoader } from "@langchain/community/document_loaders/web/serpapi";

export async function GET(req: Request) {
  try {
    // Extract crop name from query parameters
    const { searchParams } = new URL(req.url);
    const crop = searchParams.get("crop");

    if (!crop) {
      return NextResponse.json({ error: "Crop name is required" }, { status: 400 });
    }

    // Initialize SerpAPI Loader
    const loader = new SerpAPILoader({
      q: `current market price of ${crop} in India`,
      apiKey: process.env.NEXT_PUBLIC_SERPAPI_KEY!,
    });

    // Fetch search results from SerpAPI
    const docs = await loader.load();

    // Extract relevant data from search results
    const searchResults = docs.map(doc => ({
      title: doc.metadata?.title || "No title",
      link: doc.metadata?.source || "No link",
      snippet: doc.pageContent || "No snippet available",
    }));

    return NextResponse.json({ crop, searchResults });
  } catch (error) {
    console.error("Error fetching market trends:", error);
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
  }
}
