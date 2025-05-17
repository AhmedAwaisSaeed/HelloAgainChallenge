import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Reward } from '../../core/types/reward';
import { rewardCardStyles as styles } from './styles';
import HtmlText from './HtmlText';

type RewardCardProps = {
  reward: Reward;
  onCollect?: (reward: Reward) => void;
  isCollected?: boolean;
}

const RewardCard = ({ reward, onCollect, isCollected }: RewardCardProps) => {
  const {
    pictures,
    name,
    needed_points,
    description,
    is_active,
    is_expired,
  } = reward || {};

  const imageUrl = pictures?.[0];

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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.points}>{needed_points} points</Text>
        <HtmlText
          html={description}
          style={styles.description}
          numberOfLines={2}
        />
        {!isCollected && onCollect && is_active && !is_expired && (
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
        {!is_active && (
          <Text style={styles.inactiveText}>Not Available</Text>
        )}
        {is_expired && (
          <Text style={styles.expiredText}>Expired</Text>
        )}
      </View>
    </View>
  );
};

export default memo(RewardCard);
