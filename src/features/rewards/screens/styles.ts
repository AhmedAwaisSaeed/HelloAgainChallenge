import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../shared/styles/common';

export const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  endText: {
    color: colors.textSecondary,
    ...typography.body,
  },
  collectedButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
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
