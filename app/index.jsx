import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { NearbyJobs, PopularJobs, ScreenHeaderBtn, Welcome } from '../components';

function Home() {
    const router = useRouter();

    const screenHeaderBtnLeft = <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />;
    const screenHeaderBtnRigt = <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => screenHeaderBtnLeft,
                    headerRight: () => screenHeaderBtnRigt,
                    headerTitle: '',
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome />
                    <PopularJobs />
                    <NearbyJobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
