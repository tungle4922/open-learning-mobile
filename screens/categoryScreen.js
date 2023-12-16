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
} from "../api/apis";
import { styles, theme } from "../theme";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function CategoryScreen() {
  const navigation = useNavigation();
  const [allCourse, setAllCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const [sortedCourses, setSortedCourses] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [title1, setTitle1] = useState("Mặc định");
  const [open2, setOpen2] = useState(false);
  const [title2, setTitle2] = useState("Mặc định");

  useEffect(() => {
    getALLCourse();
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const res = await _retrieveData("user");
    if (res) {
      setUserInfo(JSON.parse(res));
    }
  };

  const getALLCourse = async () => {
    const data = await fetchAllCourses();
    console.log("got all course", data.length);
    if (data) setAllCourse(data);
    setLoading(false);
  };

  const navigateUser = async () => {
    const res = await _retrieveData("user");
    console.log("res from navigateUser", res);
    if (res === undefined) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("User");
    }
  };

  toggle1 = () => {
    setOpen1(!open1);
  };

  toggle2 = () => {
    setOpen2(!open2);
  };

  //khoi tao gia tri ban dau cho sortedCourses
  useEffect(() => {
    setSortedCourses(allCourse);
  }, [allCourse]);

  //get all course
  const handleFilter0 = (title) => {
    setSortedCourses(allCourse);
    setTitle1(title);
    // setTitle2('Mặc định');
    toggle1();
  };

  //get all course
  const handleSort0 = (title) => {
    setSortedCourses(allCourse);
    setTitle2(title);
    toggle2();
  };

  // lọc khóa học cơ bản
  const handleFilter1 = (title) => {
    setSortedCourses(
      [...allCourse].filter((course) => course.type === "Cơ bản")
    );
    setTitle1(title);
    // setTitle2('Mặc định');
    toggle1();
  };

  // lọc khóa học nâng cao
  const handleFilter2 = (title) => {
    setSortedCourses(
      [...allCourse].filter((course) => course.type === "Nâng cao")
    );
    setTitle1(title);
    // setTitle2('Mặc định');
    toggle1();
  };

  // lọc khóa học frontend
  const handleFilter3 = (title) => {
    setSortedCourses(
      [...allCourse].filter((course) => course.type2 === "frontend")
    );
    setTitle1(title);
    // setTitle2('Mặc định');
    toggle1();
  };

  // lọc khóa học backend
  const handleFilter4 = (title) => {
    setSortedCourses(
      [...allCourse].filter((course) => course.type2 === "backend")
    );
    setTitle1(title);
    // setTitle2('Mặc định');
    toggle1();
  };

  //sap xep san pham theo gia tang dan
  const sortedIncCoursesByPrice = (title) => {
    setSortedCourses(sortedCourses.sort((a, b) => a.price - b.price));
    setTitle2(title);
    toggle2();
  };

  //sap xep san pham theo gia giam dan
  const sortedDesCoursesByPrice = (title) => {
    setSortedCourses(sortedCourses.sort((a, b) => b.price - a.price));
    setTitle2(title);
    toggle2();
  };

  //sap xep san pham theo ten tu A - Z
  const sortIncCoursesByName = (title) => {
    const sortedByName = sortedCourses.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedCourses([...sortedByName]);
    setTitle2(title);
    toggle2();
  };

  //sap xep san pham theo ten tu Z - A
  const sortDesCoursesByName = (title) => {
    const sortedByName = sortedCourses.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setSortedCourses([...sortedByName]);
    setTitle2(title);
    toggle2();
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
              Tất cả khóa học
            </Text>
          </View>
          <MagnifyingGlassCircleIcon
            size="27"
            strokeWidth={2.5}
            color="#fff"
            onPress={() => navigation.navigate("SearchCourse")}
          ></MagnifyingGlassCircleIcon>
        </SafeAreaView>
      </View>
      <View className="mt-[100px] ml-4">
        <TouchableOpacity
          onPress={() => toggle1()}
          className="flex-row items-center"
        >
          <FunnelIcon size="23" strokeWidth={2.5} color="#eab308"></FunnelIcon>
          <Text className="text-[#eab308] text-[16px] mb-1 mt-1 ml-1">
            Lọc theo: <Text className="text-neutral-300">{title1}</Text>
          </Text>
        </TouchableOpacity>
        {open1 && (
          <View>
            <Text
              onPress={() => handleFilter0("Mặc định")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Mặc định
            </Text>
            <Text
              onPress={() => handleFilter1("Khóa học cơ bản")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Khóa học cơ bản
            </Text>
            <Text
              onPress={() => handleFilter2("Khóa học nâng cao")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Khóa học nâng cao
            </Text>
            <Text
              onPress={() => handleFilter3("Khóa học frontend")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Khóa học frontend
            </Text>
            <Text
              onPress={() => handleFilter4("Khóa học backend")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Khóa học backend
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => toggle2()}
          className="flex-row items-center mt-1"
        >
          <AdjustmentsHorizontalIcon
            size="23"
            strokeWidth={2.5}
            color="#eab308"
          ></AdjustmentsHorizontalIcon>
          <Text className="text-[#eab308] text-[16px] mb-1 mt-1 ml-1">
            Sắp xếp theo: <Text className="text-neutral-300">{title2}</Text>
          </Text>
        </TouchableOpacity>
        {open2 && (
          <View>
            <Text
              onPress={() => handleSort0("Mặc định")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Mặc định
            </Text>
            <Text
              onPress={() => sortedIncCoursesByPrice("Giá từ thấp đến cao")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Giá từ thấp đến cao
            </Text>
            <Text
              onPress={() => sortedDesCoursesByPrice("Giá từ cao đến thấp")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Giá từ cao đến thấp
            </Text>
            <Text
              onPress={() => sortIncCoursesByName("Tên từ A đến Z")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Tên từ A đến Z
            </Text>
            <Text
              onPress={() => sortDesCoursesByName("Tên từ Z đến A")}
              className="text-neutral-300 text-[16px] my-1"
            >
              Tên từ Z đến A
            </Text>
          </View>
        )}
      </View>
      <View className="my-[20px] flex-row flex-wrap">
        {sortedCourses?.map((item, index) => {
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
