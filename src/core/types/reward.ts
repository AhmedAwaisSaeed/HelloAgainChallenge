export type RewardImage = {
  id: number;
  url: string;
};

export type RewardApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Reward[];
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  needed_points: number;
  pictures: string[];
  image: string;
  is_active: boolean;
  activation_description: string;
  redeem_description: string;
  amount: number;
  limited: boolean;
  manual_claim: boolean;
  is_expired: boolean;
  bounty_redeem_alert_header: string;
  bounty_redeem_alert_text: string;
  show_confirmation_dialog: string;
  isCollected?: boolean;
};

export type UseRewardsReturn = {
  rewards: Reward[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  collectedRewards: Reward[];
  loadRewards: (isRefreshing?: boolean) => Promise<void>;
  handleCollectReward: (reward: Reward) => void;
  isRewardCollected: (rewardId: string) => boolean;
};
