import React from "react";
import { View, Text, Button } from "react-native";
import { Stack, Link } from "expo-router";
const Confirmation = () => {
  return (
    <View>
      <Text>My Order</Text>
      <Link href={{ pathname: "MyOrder" }}>Go to My Orders</Link>
    </View>
  );
};

export default Confirmation;
