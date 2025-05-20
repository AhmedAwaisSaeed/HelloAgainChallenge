import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../../shared/styles/common';
import { BUTTON, SAFE_AREA, LIST, SHADOW } from '../../../../shared/constants/layout';

// Calculate the total bottom space needed
const TOTAL_BOTTOM_PADDING = BUTTON.FIXED_HEIGHT + LIST.BOTTOM_MARGIN + SAFE_AREA.BOTTOM_PADDING;

export const styles = StyleSheet.create({
  listContent: {
    paddingBottom: TOTAL_BOTTOM_PADDING,
  },
  emptyList: {
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  endText: {
    color: colors.textSecondary,
    ...typography.body,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingBottom:spacing.md,
    ...SHADOW.MEDIUM,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  buttonWrapper: {
    marginHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 14,
  },
  fixedCollectedButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: BUTTON.BORDER_RADIUS,
    alignItems: 'center',
    height: BUTTON.FIXED_HEIGHT,
    justifyContent: 'center',
  },
  collectedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
