import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../theme";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View className="w-full mt-4">
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
          <Text className="text-white text-lg ml-3">About Us</Text>
        </SafeAreaView>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>
          Xây dựng môi trường học tập trực tuyến mở
        </Text>
        <Text style={styles.paragraph1}>
          OpenLearning là một trang web giáo dục trực tuyến, cung cấp các khóa
          học lập trình chất lượng cao cho mọi đối tượng từ những người mới bắt
          đầu đến các chuyên gia. Nếu bạn đang tìm kiếm một trang web giáo dục
          chuyên sâu và đầy đủ về lập trình, OpenLearning có thể là lựa chọn phù
          hợp cho bạn. Với OpenLearning, bạn có thể truy cập vào hàng trăm khóa
          học về lập trình từ các chuyên gia đến từ khắp nơi trên thế giới. Bạn
          sẽ được học tập các kỹ năng lập trình cơ bản như HTML, CSS và
          JavaScript đến các kỹ năng lập trình phức tạp hơn như máy học và trí
          tuệ nhân tạo. Các khóa học tại OpenLearning được thiết kế với cách
          tiếp cận học tập linh hoạt và trực quan.
        </Text>
        <Text style={styles.paragraph2}>
          Với các video hướng dẫn, các bài tập thực hành, các câu hỏi trắc
          nghiệm và các hoạt động thảo luận trong cộng đồng học tập trực tuyến,
          bạn có thể học lập trình một cách dễ dàng và hiệu quả. Một điểm đặc
          biệt khác của OpenLearning là cộng đồng học tập của nó. Bạn sẽ được
          kết nối với các học viên khác trên toàn thế giới, hỗ trợ và tương tác
          với nhau trong suốt quá trình học tập. Bên cạnh đó, các giáo viên của
          OpenLearning sẽ cung cấp cho bạn phản hồi và hỗ trợ trong suốt quá
          trình học tập.
        </Text>
      </View>
      <Image
        source={{
          uri: "https://img.coin-labs.com/wp-content/uploads/2023/02/Services-Provided-by-OpenSea-as-of-2023-768x798.jpg",
        }}
        className="mb-12 w-[95%] h-[300px]"
      />
    </ScrollView>
  );
};

// CSS cho component
const styles = StyleSheet.create({
  container: {
    flex: 100,
    padding: 20,
    backgroundColor: "black",
  },
  section: {
    marginTop: 70,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginLeft: 4
  },
  paragraph1: {
    marginRight: 10,
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  paragraph2: {
    marginRight: 10,
    marginLeft: 5,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  text: { color: theme.text },
  background: { backgroundColor: theme.background },
});

export default AboutUsScreen;
