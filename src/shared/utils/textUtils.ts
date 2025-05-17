import { REGEX } from '../constants/regex';

/**
 * Removes HTML tags from a string
 * @param text - The text containing HTML tags
 * @returns Clean text without HTML tags
 */
export const removeHtmlTags = (text?: string): string => {
  if (!text) {return '';}
  return text.replace(REGEX.HTML_TAGS, '');
};
