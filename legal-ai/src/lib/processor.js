export function processLegalResponse(response) {
  // Handle both string and object responses
  let responseText = typeof response === 'string' ? response : ((response.data && response.data.response) || JSON.stringify(response));

  // Extract citations: [Source: X] → array
  const citationsArray = [];
  const citationRegex = /\[Source: ([^\]]+)\]/g;
  let match;
  while ((match = citationRegex.exec(responseText)) !== null) {
    citationsArray.push(match[1]);
  }

  const citations = [...new Set(citationsArray)]; // Dedupe

  // Parse confidence
  const confidenceMatch = responseText.match(/Confidence:\s*(HIGH|MEDIUM|LOW)/i);
  const confidence = confidenceMatch ? confidenceMatch[1].toLowerCase() : 'unknown';

  // Add disclaimer
  const disclaimer = '\n\n---\n⚠️ This is legal information, not legal advice. Consult a licensed attorney.';

  return {
    response: responseText + disclaimer,
    citations,
    confidence,
    disclaimer_shown: true,
  };
}
