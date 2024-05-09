// REACTJS IMPORTS
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// REACT NATIVE IMPORTS
import { RootSiblingParent } from 'react-native-root-siblings';

// EXPO
import { Stack } from "expo-router";

// LIBRARIES
import * as Sentry from '@sentry/react-native';

// STYLES
import "../global.css";

const queryClient = new QueryClient();

Sentry.init({
  dsn: 'https://165a44b1f8056d26c0646f681b5662af@o4507210397581312.ingest.de.sentry.io/4507210398957648',
});

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

          <Stack.Screen 
            name="(screens)/ai-order" 
            options={{ 
              title: "Order with AI", 
              headerStyle: { backgroundColor: "#e64b4f" }, 
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}
          />

          <Stack.Screen 
            name="(screens)/manual-order" 
            options={{ 
              title: "Manual order", 
              headerStyle: { backgroundColor: "#e64b4f" }, 
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}
          />

          <Stack.Screen 
            name="(screens)/final-order" 
            options={{ 
              title: "Order details", 
              headerStyle: { backgroundColor: "#e64b4f" }, 
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              }
            }}
          />
        </Stack>
      </RootSiblingParent>
    </QueryClientProvider>
  );
}