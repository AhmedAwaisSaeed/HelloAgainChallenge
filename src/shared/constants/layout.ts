import { IS_IOS } from './platform';

/**
 * Layout constants used across the app
 */

// Button dimensions
export const BUTTON = {
  FIXED_HEIGHT: 50,
  BORDER_RADIUS: 8,
} as const;

// Safe area and spacing
export const SAFE_AREA = {
  PADDING: 20,
  BOTTOM_PADDING: IS_IOS ? 20 : 32, // More padding for Android
} as const;

// List spacing
export const LIST = {
  BOTTOM_MARGIN: 16 * 2, // spacing.md * 2
  ITEM_SPACING: 16,
} as const;

// Component dimensions
export const COMPONENT = {
  HEADER_HEIGHT: IS_IOS ? 44 : 56,
  CARD_BORDER_RADIUS: 8,
} as const;

// Shadow styles
export const SHADOW = {
  LIGHT: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  MEDIUM: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
} as const;
