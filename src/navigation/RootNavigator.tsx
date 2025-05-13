import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AvailableRewardsScreen from '../features/rewards/screens/AvailableRewardsScreen';
import CollectedRewardsScreen from '../features/collected-rewards/screens/CollectedRewardsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AvailableRewards"
        component={AvailableRewardsScreen}
        options={{ title: 'Available Rewards' }}
      />
      <Stack.Screen
        name="CollectedRewards"
        component={CollectedRewardsScreen}
        options={{ title: 'Collected Rewards' }}
      />
    </Stack.Navigator>
  );
};
