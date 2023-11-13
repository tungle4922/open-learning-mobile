import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { fetchAllCourses, fetchTopRatedMovies } from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { styles } from "../theme";
import MainCourse from "../components/mainCourse";
import UpcomingCourse from "../components/upcomingCourse";
import CourseList from "../components/courseList";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [allCourse, setAllCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getALLCourse();
  }, []);

  const getALLCourse = async () => {
    const data = await fetchAllCourses();
    console.log("got all course", data.length);
    if (data) setAllCourse(data);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <View className="flex-row items-center">
            <Image
              className="rounded-3xl w-[25px] h-[25px] mr-2"
              source={{
                uri: "https://seeklogo.com/images/O/opensea-logo-7DE9D85D62-seeklogo.com.png",
              }}
            />
            <Text className="text-white text-xl font-bold">
              <Text className="text-[#4177be]">Open</Text>Learning
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* All course Carousel */}
          {allCourse.length > 0 && <MainCourse data={allCourse.filter((item) => item.price > 0)} />}

          {/* All upcoming course */}
          <UpcomingCourse />

          {/* top rated movies row */}
          {allCourse.length > 0 && (
            <CourseList title="Khóa học miễn phí" data={allCourse.filter((item) => item.price === 0)} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
