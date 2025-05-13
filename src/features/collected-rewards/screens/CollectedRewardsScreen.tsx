import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRewards } from '../../../shared/hooks/useRewards';
import RewardCard from '../../../shared/components/RewardCard';
import { commonStyles, colors, typography } from '../../../shared/styles/common';
import { Reward } from '../../../core/types/reward';

const CollectedRewardsScreen = () => {
  const { collectedRewards } = useRewards();

  const renderItem = ({ item }: { item: Reward }) => (
    <RewardCard
      reward={item}
      isCollected={true}
    />
  );

  if (collectedRewards.length === 0) {
    return (
      <View style={[commonStyles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>No collected rewards yet</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={collectedRewards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    fontWeight: '400' as const,
  },
});

export default CollectedRewardsScreen;
