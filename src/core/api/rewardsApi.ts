import axios from 'axios';
import { RewardApiResponse, Reward } from '../types/reward';

const BASE_URL = 'https://staging.helloagain.at/api/v1/clients/5189';

const hasValidImage = (reward: Reward): boolean => {
  const { image, pictures } = reward || {};

  // Check if either image or pictures array has valid content
  return Boolean(
    (image && image.trim() !== '') ||
    (Array.isArray(pictures) && pictures.length > 0 &&
      pictures.every(pic => pic && typeof pic === 'string' && pic.trim() !== ''))
  );
};

const isValidReward = (reward: Reward): boolean => {
  if (!reward) {return false;}

  const { id, name, needed_points } = reward || {};

  return Boolean(
    id &&
    name &&
    name.trim() !== '' &&
    typeof needed_points === 'number' &&
    needed_points >= 0 &&
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

    // Add safety checks for response data
    if (!response?.data) {
      throw new Error('Invalid API response: No data received');
    }

    // Filter out invalid rewards and transform the response
    const filteredResults = (response.data.results || [])
      .filter(isValidReward)
      .map(reward => ({
        ...reward,
        // Ensure pictures is always an array and includes the image field if it exists
        pictures: [
          ...(reward.pictures || []),
          ...(reward.image ? [reward.image] : []),
        ].filter(pic => pic && typeof pic === 'string' && pic.trim() !== ''),
      }));

    const totalCount = response.data.count ?? 0;
    const hasNextPage = Boolean(response.data?.next);

    console.log('hasNextPage', hasNextPage);
    console.log('totalCount', totalCount);
    console.log('response.data', response.data);

    return {
      ...response.data,
      results: filteredResults,
      count: totalCount,
      // Use the API's pagination URLs directly with safety checks
      next: response.data?.next ?? null,
      previous: response.data?.previous ?? null,
    };
  } catch (error) {
    throw error;
  }
};
