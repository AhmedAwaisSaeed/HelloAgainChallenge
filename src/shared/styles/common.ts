import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#007AFF',
  background: '#F8F8F8',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E5E5E5',
  error: '#FF3B30',
  success: '#34C759',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '600' as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: spacing.md,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
});
