import { View, Text } from 'react-native'
import React from 'react'
import { Exercise } from '@/lib/sanity.types';

interface ExerciseCardProps {
    item: Exercise;
    onPress: () => void;
    showChevron?: boolean;
}

export default function ExerciseCard({
    item, onPress, showChevron = false
}) {
  return (
    <View>
      <Text>ExerciseCard</Text>
    </View>
  )
}