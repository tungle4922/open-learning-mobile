import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BriefcaseIcon,
  ChevronLeftIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  _clearStore,
  _retrieveData,
  fallbackPersonImage,
  fetchCourseDetails,
} from "../api/apis";
import { styles, theme } from "../theme";
import Loading from "../components/loading";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import VideoList from "../components/videoList";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function UserScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const res = await _retrieveData("user");
    console.log(res);
    if (res === undefined) {
      navigation.navigate("Login");
    } else {
      setUserInfo(JSON.parse(res));
    }
  };

  const handleLogout = async () => {
    const res = await _clearStore();
    if (res !== 0) {
      navigation.navigate("Login");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View className="my-[150px]">
        <TouchableOpacity className="mr-4 items-center">
          <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
            <Image
              className="rounded-2xl h-24 w-20"
              source={{
                uri: fallbackPersonImage,
              }}
            />
          </View>

          <Text className="text-white text-xs mt-1">@{userInfo?.username}</Text>
          <Text className="text-white text-xs mt-1">
            UserId: {userInfo?._id}
          </Text>
          <View className="px-14 mt-12 w-full">
            <View className="flex-row items-center">
              <BriefcaseIcon size="24" strokeWidth={1.5} color="white" />
              <Text className="text-white text-base mt-1 ml-2">
                Khóa học đã mua
              </Text>
            </View>
            <View className="h-[1px] bg-white my-4"></View>
            <View className="flex-row items-center">
              <InformationCircleIcon
                size="24"
                strokeWidth={1.5}
                color="white"
              />
              <Text className="text-white text-base mt-1 ml-2">
                Về chúng tôi
              </Text>
            </View>
            <View className="h-[1px] bg-white my-4"></View>
            <View className="flex-row items-center">
              <PaperAirplaneIcon size="24" strokeWidth={1.5} color="white" />
              <Text className="text-white text-base mt-1 ml-2">
                Gửi thông tin phản hồi
              </Text>
            </View>
            <View className="h-[1px] bg-white my-4"></View>
          </View>
          <View className="px-3 mt-6">
            <Button onPress={() => handleLogout()} title="Đăng xuất"></Button>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
