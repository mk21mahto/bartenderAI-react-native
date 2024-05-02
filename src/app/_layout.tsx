import "../global.css";

// EXPO
import { Stack } from "expo-router";

export default function Layout() {
  return (
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
  );
}
