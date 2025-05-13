import React, { useEffect, useCallback, useRef } from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRewards } from '../../../shared/hooks/useRewards';
import RewardCard from '../../../shared/components/RewardCard';
import { commonStyles, colors, spacing, typography } from '../../../shared/styles/common';
import { Reward } from '../../../core/types/reward';
import { RootStackParamList } from '../../../navigation/types';

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

  const renderItem = useCallback(({ item }: { item: Reward }) => {
    return (
      <RewardCard
        reward={item}
        onCollect={handleCollectReward}
        isCollected={isRewardCollected(item.id)}
      />
    );
  }, [handleCollectReward, isRewardCollected]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !isLoadingMore.current) {
      isLoadingMore.current = true;
      loadRewards().finally(() => {
        isLoadingMore.current = false;
      });
    }
  }, [loading, hasMore, loadRewards]);

  const renderFooter = () => {
    if (!loading && !isLoadingMore.current) {
      if (!hasMore) {
        return (
          <View style={styles.footer}>
            <Text style={styles.endText}>No more rewards available</Text>
          </View>
        );
      }
      return null;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  const renderHeader = useCallback(() => (
    <TouchableOpacity
      style={styles.collectedButton}
      onPress={() => navigation.navigate('CollectedRewards')}
    >
      <Text style={styles.collectedButtonText}>
        View Collected Rewards ({collectedRewards.length})
      </Text>
    </TouchableOpacity>
  ), [navigation, collectedRewards.length]);

  const renderEmpty = () => {
    if (loading) {return null;}
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {error || 'No rewards available'}
        </Text>
      </View>
    );
  };

  const keyExtractor = useCallback((item: Reward) => item.id, []);

  return (
    <View style={commonStyles.container}>
      <FlatList
        ref={flatListRef}
        data={rewards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl
            refreshing={loading && rewards.length === 0}
            onRefresh={() => loadRewards(true)}
            enabled={hasMore}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          rewards.length === 0 && styles.emptyList,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: '500' as const,
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

export default AvailableRewardsScreen;
