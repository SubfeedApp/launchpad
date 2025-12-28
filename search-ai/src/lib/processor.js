/**
 * Process search response into clean format with citations
 */
export function processSearchResponse(response) {
  const results = response.data?.results || [];
  const answer = response.data?.answer || null;

  // Build citations from results
  const citations = results.map((result, index) => ({
    index: index + 1,
    title: result.title,
    url: result.url,
    snippet: result.snippet,
  }));

  return {
    answer,
    citations,
    timestamp: new Date().toISOString(),
  };
}
