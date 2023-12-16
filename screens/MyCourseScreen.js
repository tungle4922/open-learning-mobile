import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Touchable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  AdjustmentsHorizontalIcon,
  BriefcaseIcon,
  ChevronLeftIcon,
  FunnelIcon,
  InformationCircleIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  _clearStore,
  _retrieveData,
  fallbackPersonImage,
  fetchAllCourses,
  fetchCourseDetails,
  getInfoUser,
} from "../api/apis";
import { styles, theme } from "../theme";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function MyCourseScreen() {
  const navigation = useNavigation();
  const [myCourse, setMyCourse] = useState([]);

  useEffect(() => {
    getMyCourse();
  }, []);

  const getMyCourse = async () => {
    const res = await _retrieveData("user");
    const resUserInfo = await getInfoUser(JSON.parse(res)._id);
    console.log(resUserInfo?.purchasedCourse);
    const data = await fetchAllCourses();
    console.log("got all course", data.length);
    const myCourse = data?.filter((item) =>
      resUserInfo?.purchasedCourse?.includes(item._id)
    );
    // console.log("my course", myCourse);
    setMyCourse(myCourse);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row items-center px-4 justify-between" +
            topMargin
          }
        >
          <View className="flex-row items-center">
            <TouchableOpacity
              style={styles.background}
              className="rounded-xl p-1"
              onPress={() => navigation.navigate("Home")}
            >
              <ChevronLeftIcon size="28" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <Text className="text-neutral-300 text-lg ml-3">
              Khóa học đã mua
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View className="my-[120px] flex-row flex-wrap">
        {myCourse?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Course", item)}
            >
              <View className="ml-3 mb-3">
                <Image
                  source={{
                    uri: item.imageUrl || fallbackMoviePoster,
                  }}
                  className="rounded-3xl"
                  style={{ width: width * 0.45, height: height * 0.14 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.name.length > 14
                    ? item.name.slice(0, 14) + "..."
                    : item.name}
                </Text>
                <View className="py-1 flex-row justify-center bg-blue-500 mt-2">
                  <Text className="text-white text-[12px]">Tiếp tục học</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
}
