import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeftIcon, XCircleIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  _clearStore,
  _retrieveData,
  fallbackMoviePoster,
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

export default function CartScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(undefined);
  const [data, setData] = useState([{}]);
  const [refreshing, setRefreshing] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    getUserInfo();
    getAllCoursesOnCart();
  }, []);

  const getUserInfo = async () => {
    const res = await _retrieveData("user");
    if (res === undefined) {
      navigation.navigate("Login");
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllCoursesOnCart();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getAllCoursesOnCart = async () => {
    try {
      const user = await _retrieveData("user");
      const res = await axios.get("https://coursewebbackend.vercel.app/cart");
      const rawData = res.data;
      const filteredData = rawData.filter(
        (item) => item.user[0] === JSON.parse(user)._id
      );
      setData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://coursewebbackend.vercel.app/cart/${id}`
      );
      console.log(res.data);
      setData([...data].filter((course) => course._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  //cal sum
  useEffect(() => {
    const sum = data.reduce((acc, obj) => acc + obj.price, 0);
    setSumPrice(sum);
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg ml-3">
              My cart ({data?.length})
            </Text>
          </SafeAreaView>
        </View>
        <View className="mr-4 px-6 my-[110px]">
          {data.map((item, index) => {
            return (
              <View
                key={index}
                className="flex-row mb-6 justify-between items-center"
              >
                <View className="flex-row">
                  <Image
                    source={{
                      uri: item.imageUrl || fallbackMoviePoster,
                    }}
                    className="rounded-3xl mr-3"
                    style={{ width: width * 0.3, height: height * 0.1 }}
                  />
                  <View>
                    <Text className="text-neutral-300 ml-1 mt-2 text-xs font-bold">
                      Khóa học{" "}
                      {item?.name?.length > 14
                        ? item.name.slice(0, 14) + "..."
                        : item.name}
                    </Text>
                    <Text className="text-neutral-300 ml-1 mt-1 text-xs">
                      {item?.price?.toLocaleString()} ₫
                    </Text>
                    <Text className="text-neutral-300 ml-1 mt-1 text-[10px]">
                      Số lượng: x1
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item?._id)}>
                  <XCircleIcon size="22" strokeWidth={2} color="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="p-4 flex-row justify-between items-center bg-[#3c3b3b]">
        <View>
          <Text className="text-white text-base">
            <Text className="font-bold">Total:</Text>{" "}
            {sumPrice.toLocaleString()} ₫
          </Text>
        </View>
        <Button className="!text-xs" title="Thanh toán"></Button>
      </View>
    </View>
  );
}
