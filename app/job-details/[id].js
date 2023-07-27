import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [data, isLoading, error, refetch] = useFetch(
    {
      job_id: params.id,
    },
    "job-details"
  );

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   refetch();
  //   setRefreshing(false);
  // }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  const contentTab = {
    Qualifications: (
      <Specifics
        title="Qualifications"
        points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
      />
    ),
    About: <JobAbout info={data[0]?.job_description ?? "No data provided"} />,
    Responsibilities: (
      <Specifics
        title="Responsibilities"
        points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
      />
    ),
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!error && isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : null}
          {error && <Text>Something went wrong</Text>}
          {!isLoading && !error && data?.length === 0 && (
            <Text>No data available</Text>
          )}
          {!error && !isLoading && data?.length > 0 && (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {contentTab[activeTab]}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
