/**
 * Regular expressions used across the app
 */

export const REGEX = {
  // HTML tags
  HTML_TAGS: /<[^>]*>/g,
  // Common validation patterns
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  // Content validation
  NON_EMPTY_STRING: /\S+/,
  NUMBERS_ONLY: /^\d+$/,

  // Special characters
  SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/,
};
