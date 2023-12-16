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
  TextInput,
  StyleSheet,
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
} from "../api/apis";
import { styles, theme } from "../theme";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function SearchCourseScreen() {
  const navigation = useNavigation();
  const [allCourse, setAllCourse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = [...allCourse].filter((course) =>
    course?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    getALLCourse();
  }, [searchTerm]);

  const getALLCourse = async () => {
    const data = await fetchAllCourses();
    console.log("got all course", data.length);
    if (data && searchTerm !== "") setAllCourse(data);
    else if (searchTerm === "") setAllCourse([]);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // console.log(searchTerm);
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
              onPress={() => navigation.navigate("Category")}
            >
              <ChevronLeftIcon size="28" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <Text className="text-neutral-300 text-lg ml-3">
              Tìm kiếm khóa học
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View className="mt-[100px] flex-row items-center w-full justify-between px-4">
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-[5.5px]"
        >
          <MagnifyingGlassIcon
            size="27"
            strokeWidth={2.5}
            color="#fff"
          ></MagnifyingGlassIcon>
        </TouchableOpacity>

        <TextInput
          placeholder="Nhập từ khóa"
          style={styles.input}
          className="!w-[85%] !rounded-xl"
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      <View className="my-[20px] flex-row flex-wrap">
        {filteredProducts?.map((item, index) => {
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
                <Text className="text-[#eab308] ml-1">
                  {item.price.length > 14
                    ? item.price.slice(0, 14).toLocaleString() + "..."
                    : item.price.toLocaleString()}{" "}
                  đ
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
}
