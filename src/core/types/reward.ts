export interface RewardImage {
  id: number;
  url: string;
}

export interface RewardApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Reward[];
}

export interface Reward {
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
}
