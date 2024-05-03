import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface QuantityProps {
  quantity: number;
}

const Quantity: React.FC<QuantityProps> = ({ quantity }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={{ borderRadius: 4, backgroundColor: "#e64b4f" }} className="mx-2">
        <Text className="text-white"> - </Text>
      </TouchableOpacity>
      <Text>{quantity}</Text>
      <TouchableOpacity style={{ borderRadius: 4, backgroundColor: "#e64b4f" }} className="mx-2">
        <Text className="text-white"> + </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;
