import { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Reward } from '../../core/types/reward';
import { fetchRewards } from '../../core/api/rewardsApi';
import { collectReward } from '../../core/store/rewardsSlice';
import { RootState } from '../../core/store/store';

export const useRewards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const currentPageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const dispatch = useDispatch();
  const collectedRewards = useSelector((state: RootState) => state.rewards.collectedRewards);

  const loadRewards = useCallback(async (isRefreshing: boolean = false) => {
    // Prevent multiple simultaneous requests
    if (loadingRef.current) {
      return;
    }

    // Don't load more if we've reached the end and it's not a refresh
    if (!hasMoreRef.current && !isRefreshing) {
      console.log('No more pages to load');
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);

      const page = isRefreshing ? 1 : currentPageRef.current;
      console.log('Loading page:', page);
      const response = await fetchRewards(page, 10);

      if (isRefreshing) {
        setRewards(response?.results || []);
        currentPageRef.current = 2;
      } else {
        setRewards(prevRewards => [...prevRewards, ...(response?.results || [])]);
        currentPageRef.current += 1;
      }

      // Update hasMore based on response.next with safety check
      const hasNextPage = Boolean(response?.next);
      hasMoreRef.current = hasNextPage;
      setHasMore(hasNextPage);
      console.log('Has next page:', hasNextPage, 'Current page:', currentPageRef.current);

    } catch (err) {
      console.error('Error loading rewards:', err);
      setError(err instanceof Error ? err.message : 'Failed to load rewards');
      hasMoreRef.current = false;
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []); // No dependencies needed since we're using refs

  const handleCollectReward = useCallback((reward: Reward) => {
    dispatch(collectReward(reward));
  }, [dispatch]);

  const isRewardCollected = useCallback((rewardId: string) => {
    return collectedRewards.some(reward => reward.id === rewardId);
  }, [collectedRewards]);

  return {
    rewards,
    loading,
    error,
    hasMore,
    collectedRewards,
    loadRewards,
    handleCollectReward,
    isRewardCollected,
  };
};
