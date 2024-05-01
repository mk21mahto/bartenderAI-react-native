import React from "react";
import { SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { Image, Text, StyleSheet } from "react-native";
import MyOrder from "./MyOrder";
import Confirmation from "./Confirmation";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function Page() {
  return (
    <View className="flex flex-1">
      <SafeAreaView />
      <ScrollView>
        <View style={styles.container}>
          <Stack.Screen
            options={{
              title: "My home",
              headerStyle: { backgroundColor: "#f4511e" },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <View className="py-12 md:py-24 lg:py-32 xl:py-48">
            <View className="px-4 md:px-6">
              <View className="flex flex-col items-center gap-4 text-center">
                <Text
                  role="heading"
                  className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  Welcome to bartender AI
                </Text>
                <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
                  Speak and order
                </Text>

                <View className="gap-4">
                  <TouchableOpacity>
                    <Text>Start</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Finish</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <Link href={{ pathname: "Confirmation" }}>
            Go to Confirmation
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
