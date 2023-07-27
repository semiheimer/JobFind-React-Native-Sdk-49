import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  NearbyJobs,
  PopularJobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, isLoading, error] = useFetch({
    query: "React Native developer",
    num_pages: "1",
  });

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
