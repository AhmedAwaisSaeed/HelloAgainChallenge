import React from 'react';
import { Text, TextProps } from 'react-native';
import { removeHtmlTags } from '../utils/textUtils';

interface HtmlTextProps extends TextProps {
  html?: string;
}

/**
 * A component that safely displays text that may contain HTML tags
 * by stripping them out before rendering
 */
const HtmlText: React.FC<HtmlTextProps> = ({ html, style, ...props }) => {
  if (!html) {return null;}

  const cleanText = removeHtmlTags(html);
  if (!cleanText.trim()) {return null;}

  return (
    <Text style={style} {...props}>
      {cleanText}
    </Text>
  );
};

export default React.memo(HtmlText);
