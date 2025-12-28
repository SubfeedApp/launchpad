import { detectEscalation, extractEmail } from './escalation.js';
import { detectSentiment } from './sentiment.js';

export function processSupportResponse(response, userMessage) {
  const responseText = typeof response === 'string' 
    ? response 
    : (response?.data?.response || response?.response || JSON.stringify(response));

  const { escalation, escalation_reason } = detectEscalation(userMessage);
  const extracted_email = extractEmail(userMessage);
  const sentiment = detectSentiment(userMessage);
  const quick_replies = generateQuickReplies(escalation, sentiment);
  
  return {
    response: responseText,
    escalation,
    escalation_reason,
    extracted_email,
    sentiment,
    quick_replies,
  };
}

function generateQuickReplies(escalation, sentiment) {
  if (escalation) {
    return ['Yes, connect me', 'No, I\'ll try again', 'Cancel'];
  }
  
  if (sentiment === 'negative') {
    return ['Talk to human', 'Try again', 'Cancel request'];
  }
  
  return ['Tell me more', 'That helps!', 'Talk to human'];
}
