import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  View,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";
import { useGetJobDetails } from "../../hook/useFetch";

const JobSearch = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const searchKey = params.searchKey;
  console.log(searchKey)
  const { data, isLoading, error,mutate} =useGetJobDetails("search",{
    query: searchKey,
    num_pages: page,
  });

  const handlePagination = (direction) => {
    let newPage=1
    if (direction === "left" && page > 1) {
      setPage(prev=>{
      newPage=prev-1
        return prev-1
      });
    } else if (direction === "right") {
      setPage(prev=>{   
        newPage=prev+1;
        return prev+1;
      });
     
    }
    mutate("search",{
      query: searchKey,
      num_pages:1,
      page: newPage,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <FlatList
        data={data || []}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.searchKey}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : 
                error ? (<Text>Oops something went wrong</Text>):null
              }
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <Pressable
              style={styles.paginationButton}
              onPress={() => handlePagination("left")}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </Pressable>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <Pressable
              style={styles.paginationButton}
              onPress={() => handlePagination("right")}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
