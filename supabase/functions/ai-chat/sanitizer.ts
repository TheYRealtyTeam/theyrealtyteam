// Input sanitization for AI chat to prevent prompt injection and abuse

const SUSPICIOUS_PATTERNS = [
  // Command injection attempts
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|commands|rules|directives)/gi,
  /disregard\s+(all\s+)?(previous|prior|above)\s+(instructions|commands|rules|directives)/gi,
  /forget\s+(all\s+)?(previous|prior|above)\s+(instructions|commands|rules|directives)/gi,
  
  // System prompt manipulation
  /you\s+are\s+(now|instead|actually)/gi,
  /new\s+(instructions|commands|rules|system\s+prompt)/gi,
  /override\s+(instructions|commands|rules|system)/gi,
  /act\s+as\s+(if|though)/gi,
  /pretend\s+(to\s+be|you\s+are)/gi,
  /roleplay\s+as/gi,
  
  // Prompt leaking attempts
  /show\s+(me\s+)?(your|the)\s+(prompt|instructions|system\s+message)/gi,
  /what\s+(are|is)\s+your\s+(instructions|system\s+prompt|rules)/gi,
  /reveal\s+your\s+(prompt|instructions)/gi,
  /print\s+your\s+(prompt|instructions)/gi,
  
  // Jailbreak attempts
  /dan\s+mode/gi,
  /developer\s+mode/gi,
  /jailbreak/gi,
  /hypothetically/gi,
  
  // Code execution attempts (in case model tries to execute code)
  /<script[^>]*>/gi,
  /javascript:/gi,
  /data:text\/html/gi,
  
  // SQL injection patterns
  /;\s*drop\s+table/gi,
  /;\s*delete\s+from/gi,
  /union\s+select/gi,
];

const MAX_REPEATED_CHARS = 50; // Detect spam patterns like "aaaaaaa..."
const MAX_REPEATED_WORDS = 10; // Detect spam patterns like "test test test..."

export interface SanitizationResult {
  isSafe: boolean;
  sanitizedMessage: string;
  warnings: string[];
}

export const sanitizeInput = (message: string): SanitizationResult => {
  const warnings: string[] = [];
  let sanitizedMessage = message.trim();

  // Check for suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(sanitizedMessage)) {
      warnings.push('Suspicious content detected');
      // Remove the suspicious content
      sanitizedMessage = sanitizedMessage.replace(pattern, '[REDACTED]');
    }
  }

  // Check for excessive character repetition (spam detection)
  const charRepeatMatch = sanitizedMessage.match(/(.)\1{50,}/g);
  if (charRepeatMatch) {
    warnings.push('Excessive character repetition detected');
    // Replace with a limited version
    sanitizedMessage = sanitizedMessage.replace(/(.)\1{50,}/g, (match) => 
      match.charAt(0).repeat(10) + '...'
    );
  }

  // Check for excessive word repetition
  const words = sanitizedMessage.toLowerCase().split(/\s+/);
  const wordCounts: { [key: string]: number } = {};
  for (const word of words) {
    if (word.length > 3) { // Only check words longer than 3 chars
      wordCounts[word] = (wordCounts[word] || 0) + 1;
      if (wordCounts[word] > MAX_REPEATED_WORDS) {
        warnings.push('Excessive word repetition detected');
        break;
      }
    }
  }

  // Remove excessive whitespace
  sanitizedMessage = sanitizedMessage.replace(/\s+/g, ' ').trim();

  // Check for empty message after sanitization
  if (sanitizedMessage.length === 0 || sanitizedMessage === '[REDACTED]') {
    return {
      isSafe: false,
      sanitizedMessage: '',
      warnings: ['Message contains only suspicious content']
    };
  }

  // Check for too many warnings (likely a malicious attempt)
  const isSafe = warnings.length < 3;

  return {
    isSafe,
    sanitizedMessage,
    warnings
  };
};

export const sanitizeConversationHistory = (
  history: Array<{ role: string; content: string }>
): Array<{ role: string; content: string }> => {
  return history
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .slice(-8) // Keep only last 8 messages
    .map(msg => ({
      role: msg.role,
      content: msg.content.substring(0, 2000) // Limit each message to 2000 chars
    }));
};
