// REACTJS IMPORTS
import React, { useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// REACT NATIVE IMPORTS
import { RootSiblingParent } from 'react-native-root-siblings';

// EXPO
import { Stack } from "expo-router";

// STORES
import useAuthStore from '@/store/useAuthStore';

// ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';

// STYLES
import "../global.css";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootSiblingParent>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen 
            name="(screens)/index" 
            options={{ 
              title: "Welcome to Staff AI", 
              headerStyle: { backgroundColor: "#e64b4f" }, 
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              /*headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 20 }}>
                  <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
              )*/
            }} 
          />

          <Stack.Screen 
            name="(screens)/home" 
            options={{ 
              title: "Home", 
              headerStyle: { backgroundColor: "#e64b4f" }, 
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              /*headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 20 }}>
                  <AntDesign name="arrowleft" size={24} />
                </TouchableOpacity>
              )*/
            }}
          />
        </Stack>
      </RootSiblingParent>
    </QueryClientProvider>
  );
}