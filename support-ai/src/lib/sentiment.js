const NEGATIVE_WORDS = [
  'angry', 'frustrated', 'upset', 'terrible', 'worst', 'hate', 'awful',
  'horrible', 'bad', 'poor', 'disappointing', 'annoyed', 'furious'
];

const POSITIVE_WORDS = [
  'thanks', 'thank you', 'great', 'awesome', 'helpful', 'amazing', 'love',
  'excellent', 'perfect', 'wonderful', 'fantastic', 'appreciate'
];

export function detectSentiment(message) {
  const lower = message.toLowerCase();
  
  const hasNegative = NEGATIVE_WORDS.some(word => lower.includes(word));
  const hasPositive = POSITIVE_WORDS.some(word => lower.includes(word));
  
  if (hasNegative && !hasPositive) return 'negative';
  if (hasPositive && !hasNegative) return 'positive';
  return 'neutral';
}
