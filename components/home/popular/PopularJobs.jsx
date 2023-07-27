import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable, FlatList } from "react-native";
import styles from "./popularjobs.style";
import { SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

const PopularJobs = ({ data }) => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show all</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {data?.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        ) : (
          <Text>No data found</Text>
        )}
      </View>
    </View>
  );
};

export default PopularJobs;
