import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

type HabitCardProps = {
  title: string;
  streak: number;
  isCompleted?: boolean;
  onToggle?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HabitCard({ title, streak, isCompleted = false, onToggle }: HabitCardProps) {
  const [completed, setCompleted] = useState(isCompleted);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(completed ? 1.02 : 1, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const handlePress = () => {
    setCompleted(!completed);
    onToggle?.();
  };

  return (
    <AnimatedPressable
      style={[styles.card, cardStyle]}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.streak}>{streak} day streak</Text>
        </View>
        <CheckCircle2 
          size={28} 
          color={completed ? '#7C3AED' : '#71717A'}
          fill={completed ? '#7C3AED' : 'transparent'}
        />
      </View>
      <View style={[styles.progress, { width: `${Math.min(streak * 10, 100)}%` }]} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1B1E',
    marginBottom: 4,
  },
  streak: {
    fontSize: 14,
    color: '#71717A',
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: '#7C3AED',
    borderRadius: 3,
  },
});