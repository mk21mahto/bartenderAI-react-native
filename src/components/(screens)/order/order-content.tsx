// REACTJS IMPORTS
import React from "react";

// REACT NATIVE IMPORTS
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// EXPO
import { Link } from "expo-router";

// COMPONENTS
import { Button } from "@/components/ui/button";
import Quantity from "@/components/ui/quantity";

type NewDataType = OrderDataType[];

type OrderDataType = {
  product: string;
  quantity: number;
};

const processData = (data: string[]): NewDataType => {
  const result: Record<string, OrderDataType> = {};
  data.forEach((item) => {
    const [quantityStr, product] = item.split(" - ")[0].split(" ");
    const quantity = parseInt(quantityStr);
    if (result[product]) {
      result[product].quantity += quantity;
    } else {
      result[product] = { product, quantity };
    }
  });

  return Object.values(result);
};

export const OrderContent = () => {
  const { top, bottom } = useSafeAreaInsets();

  const data = [
    "1 cappuccino - 4.5 EUR",
    "1 croissant - 2.5 EUR",
    "1 cappuccino - 4.5 EUR",
    "1 cappuccino - 4.5 EUR",
  ];

  const newData = processData(data);
  console.log(newData);
  return (
    <View
      style={{ paddingTop: top, paddingBottom: bottom }}
      className="flex flex-1"
    >
      <View className="flex flex-1 h-dvh justify-between mx-2">
        <View className="flex bg-slate-200 p-3">
          <Text className="font-bold">My Bucket</Text>
          {newData.map((item, index) => {
            return (
              <View key={index} className="flex flex-row justify-between p-5">
                <View className="">
                  <Text>{item.product}</Text>
                </View>
                <Quantity quantity={item.quantity} />
              </View>
            );
          })}
        </View>

        <View>
          <View className="flex bg-slate-200 p-3">
            <Text className="font-bold">payment</Text>
            <View className="flex flex-row justify-between">
              <Text> Item total</Text>
              <Text> 2.5 EUR</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text> Tax</Text>
              <Text> 0.0 EUR</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text> To Pay</Text>
              <Text> 2.5 EUR</Text>
            </View>

            <Link href="(screens)/confirmation">Go to Confirmation</Link>
          </View>
          <Button onPress={""}>Continue Payment</Button>
        </View>
      </View>
    </View>
  );
};
