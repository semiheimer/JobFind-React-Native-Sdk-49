import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  NearbyJobs,
  PopularJobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { useGetJobs } from "../hook/useFetch";
import { RefreshControl } from "react-native";

const Home=()=> {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, mutateData } = useGetJobs(
  "search",{
      query: "React Native developer",
      num_pages: "1",
    },
  );
  const [refreshing, setRefreshing] = useState(false);

  const screenHeaderBtnLeft = (
    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
  );
  const screenHeaderBtnRigt = (
    <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
  );
  const onPressHandler = () => {
    if (searchTerm?.toString()?.length > 0)
      router.push(`/search/${searchTerm}`);
    else alert("Please enter the value  to search");
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      mutate();
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => screenHeaderBtnLeft,
          headerRight: () => screenHeaderBtnRigt,
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handlePress={onPressHandler}
          />
          {!error && isLoading && (
            <ActivityIndicator size="large" color={COLORS.primary} />
          )}
          {!isLoading && error && <Text>Something went wrong</Text>}
          {!error && !isLoading && (
            <>
              <PopularJobs data={data} />
              <NearbyJobs data={data} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
