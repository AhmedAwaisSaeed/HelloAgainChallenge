import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../styles/common';

type SpinnerSize = 'small' | 'large';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  fullscreen?: boolean;
  style?: object;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'large',
  color = colors.primary,
  fullscreen = false,
  style,
}) => {
  if (fullscreen) {
    return (
      <View style={[styles.fullscreenContainer, style]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default Spinner;
