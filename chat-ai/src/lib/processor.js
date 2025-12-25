export function processChatResponse(response) {
  // Handle both string and object responses
  const responseText = typeof response === 'string' 
    ? response 
    : (response?.data?.response || JSON.stringify(response));

  const tokenEstimate = Math.ceil(responseText.split(/\s+/).length * 1.3);

  return {
    response: responseText,
    token_estimate: tokenEstimate,
    timestamp: new Date().toISOString(),
  };
}