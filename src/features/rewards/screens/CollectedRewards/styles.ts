import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/styles/common';

export const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    fontWeight: '400',
  },
});
