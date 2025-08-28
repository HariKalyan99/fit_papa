import { View, Text, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { urlFor } from "@/lib/sanity/client";
import { Exercise } from "@/lib/sanity/sanity.types";

export default function ExerciseDetails() {
  const router = useRouter();
  const [exercise, setExercise] = useState<Exercise>(null);
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="default" backgroundColor={"#000"}/>
      
        <View className="absolute top-12 left-0 right-0 z-10 px-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-sm">
            <Ionicons name="close" size={24} color={"white"}/>
          </TouchableOpacity>
        </View>



        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {exercise.image ? (
            <Image source={{uri: urlFor(exercise.image?.asset?._ref).url()}} className="w-full h-full" resizeMode="contain" />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
            <Ionicons name="fitness" size={24} color={"white"} />
          </View>
          )}
        </ScrollView>
    </SafeAreaView>
  );
}
