import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/common';

export const rewardCardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collectedContainer: {
    opacity: 0.6,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  points: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '400',
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    ...typography.body,
    fontWeight: '500',
  },
  collectedText: {
    color: colors.success,
    ...typography.body,
    fontWeight: '500',
  },
  inactiveText: {
    color: colors.textSecondary,
    ...typography.body,
    fontWeight: '500',
  },
  expiredText: {
    color: colors.error,
    ...typography.body,
    fontWeight: '500',
  },
});
