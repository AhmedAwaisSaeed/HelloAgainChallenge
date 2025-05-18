import React, { useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRewards } from '../../../shared/hooks/useRewards';
import RewardCard from '../../../shared/components/RewardCard';
import CustomHeader from '../../../shared/components/CustomHeader';
import { commonStyles } from '../../../shared/styles/common';
import { Reward } from '../../../core/types/reward';
import { styles } from './styles';

// Keep RewardCard memoized as it's a list item
const MemoizedRewardCard = React.memo(RewardCard);

const EmptyState = () => (
  <View style={[commonStyles.container, styles.centerContent]}>
    <Text style={styles.emptyText}>No collected rewards yet</Text>
  </View>
);

const CollectedRewardsScreen = () => {
  const { collectedRewards } = useRewards();

  const renderItem = useCallback(({ item }: { item: Reward }) => (
    <MemoizedRewardCard
      reward={item}
      isCollected={true}
    />
  ), []);

  const keyExtractor = useCallback((item: Reward) => item.id, []);

  if (collectedRewards.length === 0) {
    return (
      <>
        <CustomHeader title="Collected Rewards" showBack />
        <EmptyState />
      </>
    );
  }

  return (
    <View style={commonStyles.container}>
      <CustomHeader title="Collected Rewards" showBack />
      <FlatList
        data={collectedRewards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        initialNumToRender={8}
        windowSize={5}
      />
    </View>
  );
};

export default CollectedRewardsScreen;
