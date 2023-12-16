import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  _retrieveData,
  fallbackPersonImage,
  fetchCourseDetails,
} from "../api/apis";
import { styles, theme } from "../theme";
import Loading from "../components/loading";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import VideoList from "../components/videoList";
import axios from "axios";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function CourseScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [course, setCourse] = useState({});
  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const [isBought, setIsBought] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserInfo();
    getCourseDetail(item._id);
  }, [item]);

  const getUserInfo = async () => {
    const res = await _retrieveData("user");
    if (res) {
      setUserInfo(JSON.parse(res));
    }
  };

  const getCourseDetail = async (id) => {
    const data = await fetchCourseDetails(id);
    console.log("got course details success");
    setLoading(false);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCourseDetail(item._id);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const addToCart = async () => {
    if (userInfo) {
      const newItems = {
        name: course?.name,
        price: course?.price,
        type: course?.type,
        imageUrl: course?.imageUrl,
        user: userInfo?._id,
      };
      try {
        const res = await axios.post(
          "https://coursewebbackend.vercel.app/cart",
          newItems
        );
        Alert.alert("Order Success", "Thêm vào giỏ hàng thành công", [
          {
            text: "Cancel",
            cancelable: true,
            style: "cancel",
          },
        ]);
      } catch (err) {
        Alert.alert("Order Failed", "Thêm vào giỏ hàng thất bại", [
          {
            text: "Cancel",
            cancelable: true,
            style: "cancel",
          },
        ]);
      }
    }
  };

  const alertLogin = () => {
    Alert.alert("Warning", "Vui lòng đăng nhập", [
      {
        text: "Cancel",
        cancelable: true,
        style: "cancel",
      },
    ]);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={{ width, height: height * 0.4 }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
          {course?.name}
        </Text>

        {/* status, release year, runtime */}
        {course?._id ? (
          <>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {course?.type2} • {course?.type} • {course?.duration}
            </Text>
            {course?.price > 0 ? (
              <Text className="text-[#eab308] font-semibold text-lg text-center">
                ₫{course?.price.toLocaleString()}
              </Text>
            ) : (
              <Text className="text-[#eab308] font-semibold text-lg text-center">
                Miễn phí
              </Text>
            )}
          </>
        ) : null}

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {course?.description}
        </Text>
      </View>

      {/* author */}
      <View className="my-6">
        <Text className="text-white text-lg mx-4 mb-5">Tác giả</Text>
        <TouchableOpacity className="mr-4 items-center">
          <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
            <Image
              className="rounded-2xl h-24 w-20"
              source={{
                uri: course?.autherImg || fallbackPersonImage,
              }}
            />
          </View>

          <Text className="text-white text-xs mt-1">
            {course?.autherName?.length > 20
              ? course?.autherName.slice(0, 20) + "..."
              : course?.autherName}
          </Text>
        </TouchableOpacity>
      </View>

      {userInfo?.accessToken && (isBought === true || course?.price === 0) && (
        <VideoList
          title={"Danh sách bài học"}
          hideSeeAll={true}
          data={course?.youtube}
          thumbnailUrl={thumbnailUrl}
        />
      )}

      {userInfo?.accessToken && isBought === false && course?.price !== 0 && (
        <View className="px-3 mt-4 flex justify-center">
          <Button
            onPress={() => addToCart()}
            title="Thêm vào giỏ hàng"
          ></Button>
        </View>
      )}

      {!userInfo?.accessToken && course?.price > 0 && (
        <View className="px-3 mt-4 flex justify-center">
          <Button
            onPress={() => alertLogin()}
            title="Thêm vào giỏ hàng"
          ></Button>
        </View>
      )}

      {!userInfo?.accessToken && course?.price === 0 && (
        <View className="px-3 mt-4 flex justify-center">
          <Button onPress={() => alertLogin()} title="Xem khóa học"></Button>
        </View>
      )}
    </ScrollView>
  );
}
