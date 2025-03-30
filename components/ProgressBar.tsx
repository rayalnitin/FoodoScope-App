import { View, StyleSheet } from "react-native";

export default function ProgressBar({ currentScreen, totalScreens }: { currentScreen: number; totalScreens: number }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalScreens }).map((_, index) => (
        <View 
          key={index}
          style={[
            styles.segment,
            index < currentScreen && styles.filledSegment,
            index === 0 && styles.firstSegment,
            index === totalScreens - 1 && styles.lastSegment,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 4,
    width: '80%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 1,
  },
  filledSegment: {
    backgroundColor: '#000',
  },
  firstSegment: {
    marginLeft: 0,
  },
  lastSegment: {
    marginRight: 0,
  },
});