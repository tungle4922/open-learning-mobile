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
import Modal from "react-native-modal";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function CertificateScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
              Nhận chứng chỉ
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View className="my-[120px] p-1">
        <Text className="text-white text-[18px] ml-4 text-center mb-3">
          Bạn đã hoàn thành khóa học {item}
        </Text>
        <Image
          source={{
            uri: "https://www.pngkey.com/png/full/413-4136925_we-would-like-to-congratulate-banner-employees-bryan.png",
          }}
          className="w-[320px] h-[230px] mx-auto mb-8"
        />
        <View className="w-3/4 mx-auto mb-2">
          <TextInput
            placeholder="Nhập tên của bạn"
            style={styles.input}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View className=" flex items-center bg-blue-500 py-2 rounded-lg px-7 mx-auto">
          <Text onPress={toggleModal} className="text-white">
            Nhận chứng chỉ {item}
          </Text>
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View className="px-3 py-2 bg-[#272a31]">
          <View className="flex-row justify-between">
            <Text onPress={toggleModal} className="text-white text-[20px]">
              x
            </Text>
          </View>
          <View className="h-[250px] w-[290px] bg-white rounded-xl p-3 mx-auto mb-4 relative">
            <Image
              source={{
                uri: "https://simplecert.net/wp-content/uploads/elementor/thumbs/Acamedic-Achievement-tempate-p2adif7uymj5vx15nb5c0isw92a5epu13ix5kmldeq.png",
              }}
              className="mb-12 h-full w-full"
            />
            <Text className="absolute top-[100px] left-[105px]">{name}</Text>
          </View>
          <Button title="Nhận chứng chỉ" onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
}
