import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

function NearbyJobs({ data }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show all</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {data?.length > 0 ? (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        ) : (
          <Text>No data found</Text>
        )}
      </View>
    </View>
  );
}

export default NearbyJobs;
