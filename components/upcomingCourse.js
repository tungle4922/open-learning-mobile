import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../theme";
const { width, height } = Dimensions.get("window");

export default function UpcomingCourse({ hideSeeAll }) {
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      imgUrl:
        "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
      title: "HTML, CSS Pro",
    },
    {
      imgUrl:
        "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png",
      title: "JavaScript Pro",
    },
  ]);

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">Khóa học Pro</Text>
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
            <View key={index} className="space-y-1 mr-4">
              <Image
                source={{
                  uri: item.imgUrl,
                }}
                className="rounded-3xl"
                style={{ width: width * 0.6, height: height * 0.18 }}
              />
              <Text className="text-neutral-300 ml-1">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
