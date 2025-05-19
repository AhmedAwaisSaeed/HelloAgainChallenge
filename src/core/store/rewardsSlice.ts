import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../types/reward';

type RewardsState ={
  collectedRewards: Reward[];
}

const initialState: RewardsState = {
  collectedRewards: [],
};

export const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    collectReward: (state, action: PayloadAction<Reward>) => {
      const reward = { ...action.payload, isCollected: true };
      state.collectedRewards.push(reward);
    },
  },
});

export const { collectReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;
