import axios from "axios";
import { apiKey } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const courseBaseApiUrl = "https://coursewebbackend.vercel.app";
const allCourseEndpoint = `${courseBaseApiUrl}/course`;

// endpoints with dynamic params

// course
const courseDetailsEndpoint = (id) => `${courseBaseApiUrl}/course/${id}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

// home screen apis
export const fetchAllCourses = () => {
  return apiCall(allCourseEndpoint);
};

// course screen apis
export const fetchCourseDetails = (id) => {
  return apiCall(courseDetailsEndpoint(id));
};

//login
export const login = async (username, password) => {
  try {
    const body = {
      username: username,
      password: password,
    };
    const res = await axios.post(
      `https://coursewebbackend.vercel.app/v1/auth/login`,
      body
    );
    return res.data;
  } catch (err) {
    return 0;
  }
};

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("store success");
  } catch (error) {
    return 0;
    console.log(error);
  }
};

export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("get store success");
      return value;
    }
  } catch (error) {
    return 0;
    console.log(error);
  }
};

export const _clearStore = async () => {
  try {
    await AsyncStorage.clear();
    console.log("clear store success");
  } catch (error) {
    console.log(error);
    return 0;
  }
};
