export type RootStackParamList = {
  AvailableRewards: undefined;
  CollectedRewards: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
