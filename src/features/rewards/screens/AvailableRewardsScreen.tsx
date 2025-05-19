import React, { useEffect, useCallback, useRef } from 'react';
import { View, FlatList, Text, RefreshControl, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRewards } from '../../../shared/hooks/useRewards';
import RewardCard from '../../../shared/components/RewardCard';
import CustomHeader from '../../../shared/components/CustomHeader';
import Spinner from '../../../shared/components/Spinner';
import Button from '../../../shared/components/Button';
import { commonStyles, colors } from '../../../shared/styles/common';
import { Reward } from '../../../core/types/reward';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from './styles';

// Keep RewardCard memoized as it's a list item
const MemoizedRewardCard = React.memo(RewardCard);

// Keep ListFooter memoized as it's reused in the list with same props frequently
const ListFooter = React.memo(({ loading, hasMore, rewardsCount }: { loading: boolean; hasMore: boolean; rewardsCount: number }) => {
  if (!loading) {
    if (!hasMore) {
      return (
        <View style={styles.footer}>
          <Text style={styles.endText}>No more rewards available</Text>
        </View>
      );
    }
    return null;
  }
  // Only show loading indicator if we're not in a pull-to-refresh state
  if (loading && rewardsCount > 0) {
    return (
      <View style={styles.footer}>
        <Spinner size="small" />
      </View>
    );
  }
  return null;
});

// Simple component, no need for memo
const ListEmpty = ({ loading, error }: { loading: boolean; error: string | null }) => {
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Spinner size="large" />
      </View>
    );
  }
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {error || 'No rewards available'}
      </Text>
    </View>
  );
};

const AvailableRewardsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const flatListRef = useRef<FlatList>(null);
  const isLoadingMore = useRef(false);

  const {
    rewards,
    loading,
    error,
    hasMore,
    loadRewards,
    handleCollectReward,
    isRewardCollected,
    collectedRewards,
  } = useRewards();

  useEffect(() => {
    loadRewards(true);
  }, [loadRewards]);

  const renderItem = useCallback(({ item }: { item: Reward }) => (
    <MemoizedRewardCard
      reward={item}
      onCollect={handleCollectReward}
      isCollected={isRewardCollected(item.id)}
    />
  ), [handleCollectReward, isRewardCollected]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !isLoadingMore.current) {
      isLoadingMore.current = true;
      loadRewards().finally(() => {
        isLoadingMore.current = false;
      });
    }
  }, [loading, hasMore, loadRewards]);

  const handleNavigateToCollected = useCallback(() => {
    navigation.navigate('CollectedRewards');
  }, [navigation]);

  const keyExtractor = useCallback((item: Reward) => item.id, []);

  // Show fullscreen spinner on initial load
  if (loading && rewards.length === 0) {
    return (
      <View style={commonStyles.container}>
        <CustomHeader title="Available Rewards" />
        <Spinner fullscreen />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <CustomHeader title="Available Rewards" />
      <FlatList
        ref={flatListRef}
        data={rewards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <ListFooter
            loading={loading}
            hasMore={hasMore}
            rewardsCount={rewards.length}
          />
        }
        ListEmptyComponent={
          <ListEmpty loading={loading} error={error} />
        }
        removeClippedSubviews={true}
        initialNumToRender={8}
        windowSize={5}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => loadRewards(true)}
            enabled={true}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          rewards.length === 0 && styles.emptyList,
        ]}
      />
      <SafeAreaView style={styles.fixedButtonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title={`View Collected Rewards (${collectedRewards.length})`}
            onPress={handleNavigateToCollected}
            variant="primary"
            fullWidth
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AvailableRewardsScreen;
