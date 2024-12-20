import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { moviesData } from "../constants";
import { useNavigation } from "@react-navigation/native";
import {
  fallbackMoviePoster,
  image185,
  image342,
  poster342,
} from "../api/apis";
import { styles } from "../theme";
const { width, height } = Dimensions.get("window");

export default function CourseList({ title, hideSeeAll, data }) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate("Category")}>
            <Text style={styles.text} className="text-lg">
              Xem tất cả
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Course", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{
                    uri: item.imageUrl || fallbackMoviePoster,
                  }}
                  className="rounded-3xl"
                  style={{ width: width * 0.6, height: height * 0.18 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.name.length > 14
                    ? item.name.slice(0, 14) + "..."
                    : item.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
