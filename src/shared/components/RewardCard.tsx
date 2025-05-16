import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Reward } from '../../core/types/reward';
import { rewardCardStyles as styles } from './styles';

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
          resizeMode="contain"
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

export default memo(RewardCard);
