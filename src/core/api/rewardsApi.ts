import axios from 'axios';
import { RewardApiResponse, Reward } from '../types/reward';

const BASE_URL = 'https://staging.helloagain.at/api/v1/clients/5189';

const hasValidImage = (reward: Reward): boolean => {
  // Check if either image or pictures array has valid content
  return Boolean(
    (reward.image && reward.image.trim() !== '') ||
    (Array.isArray(reward.pictures) && reward.pictures.length > 0 &&
      reward.pictures.every(pic => pic && typeof pic === 'string' && pic.trim() !== ''))
  );
};

const isValidReward = (reward: Reward): boolean => {
  return Boolean(
    reward &&
    reward.id &&
    reward.name &&
    reward.name.trim() !== '' &&
    typeof reward.needed_points === 'number' &&
    reward.needed_points >= 0 &&
    hasValidImage(reward)
  );
};

export const fetchRewards = async (page: number = 1, limit: number = 10): Promise<RewardApiResponse> => {
  try {
    // Ensure page and limit are positive integers
    const validPage = Math.max(1, Math.floor(page));
    const validLimit = Math.max(1, Math.floor(limit));

    const response = await axios.get<RewardApiResponse>(`${BASE_URL}/bounties/`, {
      params: {
        limit: validLimit,
        page: validPage,
      },
    });

    // Filter out invalid rewards and transform the response
    const filteredResults = response.data.results
      .filter(isValidReward)
      .map(reward => ({
        ...reward,
        // Ensure pictures is always an array and includes the image field if it exists
        pictures: [
          ...(reward.pictures || []),
          ...(reward.image ? [reward.image] : []),
        ].filter(pic => pic && typeof pic === 'string' && pic.trim() !== ''),
      }));

    const totalCount = response.data.count;
    const hasNextPage = Boolean(response.data.next);

    console.log('hasNextPage', hasNextPage);
    console.log('totalCount', totalCount);
    console.log('response.data', response.data);

    return {
      ...response.data,
      results: filteredResults,
      count: totalCount,
      // Use the API's pagination URLs directly
      next: response.data.next,
      previous: response.data.previous,
    };
  } catch (error) {
    throw error;
  }
};
