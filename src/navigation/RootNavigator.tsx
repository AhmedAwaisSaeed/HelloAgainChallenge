import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AvailableRewardsScreen from '../features/rewards/screens/AvailableRewardsScreen';
import CollectedRewardsScreen from '../features/collected-rewards/screens/CollectedRewardsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen
        name="AvailableRewards"
        component={AvailableRewardsScreen}
      />
      <Stack.Screen
        name="CollectedRewards"
        component={CollectedRewardsScreen}
      />
    </Stack.Navigator>
  );
};
