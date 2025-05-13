import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Reward } from '../../core/types/reward';
import { colors, spacing, typography } from '../styles/common';

interface RewardCardProps {
  reward: Reward;
  onCollect?: (reward: Reward) => void;
  isCollected?: boolean;
}

const RewardCard = ({ reward, onCollect, isCollected }: RewardCardProps) => {
  const imageUrl = reward.pictures?.[0];

  return (
    <View style={[styles.container, isCollected && styles.collectedContainer]}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.name}>{reward.name}</Text>
        <Text style={styles.points}>{reward.needed_points} points</Text>
        {reward.description && (
          <Text style={styles.description} numberOfLines={2}>
            {reward.description.replace(/<[^>]*>/g, '')}
          </Text>
        )}
        {!isCollected && onCollect && reward.is_active && !reward.is_expired && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onCollect(reward)}
          >
            <Text style={styles.buttonText}>Collect</Text>
          </TouchableOpacity>
        )}
        {isCollected && (
          <Text style={styles.collectedText}>Collected</Text>
        )}
        {!reward.is_active && (
          <Text style={styles.inactiveText}>Not Available</Text>
        )}
        {reward.is_expired && (
          <Text style={styles.expiredText}>Expired</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '600' as const,
  },
  points: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: '400' as const,
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
    fontWeight: '500' as const,
  },
  collectedText: {
    color: colors.success,
    ...typography.body,
    fontWeight: '500' as const,
  },
  inactiveText: {
    color: colors.textSecondary,
    ...typography.body,
    fontWeight: '500' as const,
  },
  expiredText: {
    color: colors.error,
    ...typography.body,
    fontWeight: '500' as const,
  },
});

export default memo(RewardCard);
