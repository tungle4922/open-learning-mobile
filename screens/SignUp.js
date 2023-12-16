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
import { _retrieveData, _storeData, login, registerUser } from "../api/apis";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showAlert = (title, content) =>
    Alert.alert(title, content, [
      {
        text: "Cancel",
        cancelable: true,
        style: "cancel",
      },
    ]);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      showAlert("SignUp failed", "Mật khẩu nhập lại không khớp");
      return;
    }
    const body = {
      email: email,
      password: password,
      username: username,
    };
    console.log(body);
    const res = await registerUser(body);
    console.log(res);
    if (res === 0) {
      console.log(res);
      showAlert("SignUp failed", "Username đã tồn tại");
    } else {
      showAlert("SignUp success", "Đăng ký thành công");
      navigation.navigate("Login");
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="mt-[140px] mb-7 flex-row justify-center items-center">
        <Image
          className="rounded-3xl w-[25px] h-[25px] mr-2"
          source={{
            uri: "https://seeklogo.com/images/O/opensea-logo-7DE9D85D62-seeklogo.com.png",
          }}
        />
        <Text className="text-white text-2xl text-center">SignUp</Text>
      </View>
      <SafeAreaView>
        <Text className="text-white text-[16px] ml-4">Email</Text>
        <TextInput
          placeholder="Nhập email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <Text className="text-white text-[16px] ml-4">Username</Text>
        <TextInput
          placeholder="Nhập username"
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        />
        <Text className="text-white text-[16px] ml-4">Mật khẩu</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Nhập mật khẩu"
          onChangeText={(text) => setPassword(text)}
        />
        <Text className="text-white text-[16px] ml-4">Nhập lại mật khẩu</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View className="px-3 mt-6">
          <Button onPress={() => handleSignUp()} title="Đăng ký"></Button>
        </View>
      </SafeAreaView>
      <Text className="text-white text-[15px] ml-4 text-center mt-5">
        Bạn đã có tài khoản?{" "}
        <Text
          onPress={() => navigation.navigate("Login")}
          className="text-[#eab308]"
        >
          Đăng nhập
        </Text>{" "}
      </Text>
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
