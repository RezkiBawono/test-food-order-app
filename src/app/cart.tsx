import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { UseCart } from "./provider/CartContext";
import CartListItem from "./CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  const { items, total } = UseCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />
      <Text style={{ marginTop: "auto" }}>Total: {total}</Text>
      <Button text="Check Out" />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
