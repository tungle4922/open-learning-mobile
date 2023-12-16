import React, { Component, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
  Button,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import qs from "qs";

export default function ContactScreen() {
  const ios = Platform.OS == "ios";
  const topMargin = ios ? "" : " mt-3";
  var { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // send feedback to email
  const handleSubmit = async (to, subject, body) => {
    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
    });

    if (query.length) {
      url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error("Provided URL can not be handled");
    }

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View className="w-full mt-8">
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
          <Text className="text-white text-lg ml-3">Contact Us</Text>
        </SafeAreaView>
      </View>
      <View style={styles.phanhoi}>
        <Text style={styles.title}>Gửi phản hồi cho chúng tôi</Text>
        <TextInput
          placeholder="Họ và tên"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.txtInput}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Địa chỉ Email"
          underlineColorAndroid="transparent"
          placeholderTextColor="white"
          style={styles.txtInput}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Nội dung phản hồi"
          underlineColorAndroid="transparent"
          placeholderTextColor="white"
          textAlignVertical="top"
          style={styles.txtnd}
          onChangeText={(text) => setMessage(text)}
        />
        <View className="px-3 mt-6 w-[95%]">
          <Button
            onPress={() =>
              handleSubmit(
                "adcourseweb4922@gmail.com",
                `Hi from ${email}`,
                message
              )
            }
            title="Gửi phản hồi"
          ></Button>
        </View>
      </View>
    </View>
  );
}
const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  phanhoi: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    color: theme.text,
    marginBottom: 20,
  },
  txtInput: {
    backgroundColor: "#494D52",
    width: DEVICE_WIDTH - 40,
    paddingLeft: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 8,
    borderRadius: 20,
    fontSize: 14,
    color: "#fff",
    marginTop: 2,
  },
  txtnd: {
    backgroundColor: "#494D52",
    width: DEVICE_WIDTH - 40,
    paddingLeft: 22,
    paddingBottom: 270,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 8,
    borderRadius: 20,
    fontSize: 14,
    color: "#fff",
    marginTop: 2,
    height: 300,
  },
  btncontract: {
    width: DEVICE_WIDTH - 40,
    backgroundColor: "rgba(0,145,234,1)",
    padding: 8,
    borderRadius: 20,
    marginTop: 2,
  },
  txtcontract: {
    color: "#fff",
    textAlign: "center",
  },
  text: { color: theme.text },
  background: { backgroundColor: theme.background },
});
