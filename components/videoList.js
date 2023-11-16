import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster } from "../api/apis";
import { styles } from "../theme";
const { width, height } = Dimensions.get("window");

export default function VideoList({ title, hideSeeAll, data, thumbnailUrl }) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Video", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: thumbnailUrl[index] || fallbackMoviePoster,
                  }}
                  className="rounded-3xl"
                  style={{ width: width * 0.6, height: height * 0.18 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.ytName.length > 30
                    ? item.ytName.slice(0, 30) + "..."
                    : item.ytName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
