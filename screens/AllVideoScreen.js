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
import VideoList from "../components/videoList";
import { getYoutubeMeta } from "react-native-youtube-iframe";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function AllVideoSceen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [course, setCourse] = useState({});
  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  const [userInfo, setUserInfo] = useState(undefined);
  const [isBought, setIsBought] = useState(false);

  useEffect(() => {
    getUserInfo();
    getCourseDetail(item._id);
  }, [item._id]);

  const getUserInfo = async () => {
    const res = await _retrieveData("user");
    if (res) {
      setUserInfo(JSON.parse(res));
    }
  };

  const getCourseDetail = async (id) => {
    const data = await fetchCourseDetails(id);
    console.log("got course details success");
    if (data) {
      setCourse({ ...course, ...data });
      let listImg = [];
      for (const item of data?.youtube || []) {
        const meta = await getYoutubeMeta(item.ytUrl?.split("/").pop());
        listImg.push(meta.thumbnail_url);
      }
      setThumbnailUrl(listImg);

      const userJSON = await _retrieveData("user");
      const user = userJSON !== undefined && JSON.parse(userJSON);
      const res = data?.purchasedUser?.find((item) => item === user?._id);
      if (res) {
        setIsBought(true);
      } else {
        setIsBought(false);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row items-center px-4 " + topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.push("Course", item)}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <Text className="text-neutral-300 text-lg ml-3">
            Tất cả video ({course?.youtube?.length})
          </Text>
        </SafeAreaView>
      </View>
      <View className="my-[60px] flex-row flex-wrap">
        {userInfo?.accessToken &&
          (isBought === true || course?.price === 0) && (
            <VideoList
              data={course?.youtube}
              thumbnailUrl={thumbnailUrl}
              typeList={"col"}
            />
          )}
      </View>
    </ScrollView>
  );
}
