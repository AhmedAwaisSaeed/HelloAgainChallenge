import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../styles/common';

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
}

const CustomHeader = ({ title, showBack }: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === 'ios' ? insets.top : 16,
          height: Platform.OS === 'ios' ? 44 + insets.top : 56,
        },
      ]}
    >
      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {Platform.OS === 'ios' ? (
              <Text style={styles.backText}>Back</Text>
            ) : (
              <Text style={styles.backIcon}>‹</Text>
            )}
          </TouchableOpacity>
        )}
        <Text style={[styles.title, showBack && styles.titleWithBack]}>{title}</Text>
        {/* Add empty View for layout balance when back button is shown */}
        {showBack && <View style={styles.backButtonPlaceholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    minWidth: 44,
    height: 44,
    justifyContent: 'center',
    marginLeft: Platform.OS === 'ios' ? -8 : -12,
  },
  backButtonPlaceholder: {
    minWidth: 44,
  },
  backText: {
    ...typography.body,
    color: 'white',
    fontSize: 17,
  },
  backIcon: {
    color: 'white',
    fontSize: 32,
    marginTop: -2,
  },
  title: {
    ...typography.subtitle,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  titleWithBack: {
    marginHorizontal: Platform.OS === 'ios' ? 0 : 16,
  },
});

export default CustomHeader;
