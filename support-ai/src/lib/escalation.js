const ESCALATION_TRIGGERS = [
  'human', 'agent', 'manager', 'person', 'real person', 'speak to someone', 'talk to someone',
  'refund', 'cancel', 'money back', 'chargeback', 'charge back',
  'angry', 'frustrated', 'upset', 'furious', 'terrible', 'worst', 'sue', 'lawyer', 'legal action'
];

export function detectEscalation(message) {
  const lower = message.toLowerCase();
  
  for (const trigger of ESCALATION_TRIGGERS) {
    if (lower.includes(trigger)) {
      return {
        escalation: true,
        escalation_reason: trigger,
      };
    }
  }
  
  return {
    escalation: false,
    escalation_reason: null,
  };
}

export function extractEmail(message) {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const match = message.match(emailRegex);
  return match ? match[0] : null;
}
