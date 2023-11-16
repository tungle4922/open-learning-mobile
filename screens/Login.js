import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { _retrieveData, _storeData, login } from "../api/apis";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const showAlert = () =>
    Alert.alert("Login failed", "Tài khoản hoặc mật khẩu không đúng", [
      {
        text: "Cancel",
        cancelable: true,
        style: "cancel",
      },
    ]);

  const checkUser = async () => {
    const res = await _retrieveData("user");
    console.log(res);
    if (res !== undefined) {
      navigation.navigate("Home");
    }
  };

  const handleLogin = async () => {
    console.log(username, password);
    const res = await login(username, password);
    if (res === 0) {
      console.log(res);
      showAlert();
    } else {
      _storeData("user", JSON.stringify(res));
      // console.log(res);
      // console.log("id", res._id);
      // console.log("accessToken", res.accessToken);
      navigation.navigate("Home");
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="mt-[200px] mb-7 flex-row justify-center items-center">
        <Image
          className="rounded-3xl w-[25px] h-[25px] mr-2"
          source={{
            uri: "https://seeklogo.com/images/O/opensea-logo-7DE9D85D62-seeklogo.com.png",
          }}
        />
        <Text className="text-white text-2xl text-center">Login</Text>
      </View>
      <SafeAreaView>
        <Text className="text-white text-[16px] ml-4">Username</Text>
        <TextInput
          placeholder="Nhập username"
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        />
        <Text className="text-white text-[16px] ml-4">Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập password"
          onChangeText={(text) => setPassword(text)}
        />
        <View className="px-3 mt-6">
          <Button onPress={() => handleLogin()} title="Đăng nhập"></Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
