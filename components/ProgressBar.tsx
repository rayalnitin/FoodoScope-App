import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentScreen: number;
  totalScreens: number;
}

/**
 * A visual progress bar for onboarding screens
 */
export default function ProgressBar({
  currentScreen,
  totalScreens
}: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalScreens }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index + 1 <= currentScreen
              ? styles.activeDot
              : styles.inactiveDot,
            index === 0 && styles.firstDot,
            index === totalScreens - 1 && styles.lastDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 8,
  },
  dot: {
    flex: 1,
    height: 5,
    marginHorizontal: 2,
  },
  firstDot: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastDot: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#e0e0e0',
  },
});