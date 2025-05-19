export const API_CONFIG = {
  BASE_URL: 'https://staging.helloagain.at/api/v1',
  CLIENT_ID: '5189',
} as const;

export const getBaseUrl = () => `${API_CONFIG.BASE_URL}/clients/${API_CONFIG.CLIENT_ID}`;
