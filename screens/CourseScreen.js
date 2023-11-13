import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import {
  fallbackMoviePoster,
  fallbackPersonImage,
  fetchCourseDetails,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import { styles, theme } from "../theme";
import Loading from "../components/loading";
import YoutubePlayer from "react-native-youtube-iframe";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function CourseScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [course, setCourse] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCourseDetail(item._id);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getCourseDetail = async (id) => {
    const data = await fetchCourseDetails(id);
    console.log("got course details success");
    setLoading(false);
    if (data) {
      setCourse({ ...course, ...data });
    }
  };

  const getMovieDetials = async (id) => {
    const data = await fetchMovieDetails(id);
    console.log("got movie details");
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    console.log("got movie credits");
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    console.log("got similar movies");
    if (data && data.results) {
      setSimilarMovies(data.results);
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
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {course?.type2} • {course?.type} • {course?.duration}
          </Text>
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

      <View>
        {course?.youtube?.map((item, index) => {
          return (
            <View key={index}>
              {/* <YoutubePlayer
                height={300}
                play={false}
                videoId={item.ytUrl?.split("/").pop()}
              /> */}
              {/* <Text className="text-white mt-[-85px] mb-12">{item.ytName}</Text> */}
            </View>
          );
        })}
      </View>

      {/* similar movies section */}
      {movie?.id && similarMovies.length > 0 && (
        <MovieList
          title={"Similar Movies"}
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
