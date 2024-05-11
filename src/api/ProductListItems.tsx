import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import { Product } from "@/types";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import defaultImageLink from "@/constants/DefaultImage";

type ProductListItemsProps = {
  product: Product;
};

const ProductListItems = ({ product }: ProductListItemsProps) => {
  return (
    <Link
      href={{ pathname: "/(tabs)/menu/[id]", params: { id: `${product.id}` } }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          style={styles.images}
          source={{ uri: product.image || defaultImageLink }}
          resizeMode="contain"
        />
        <Text style={styles.names}>{product.name}</Text>
        <Text style={styles.prices}>{product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    flex: 1,
    maxWidth: "50%",
    overflow: "hidden",
  },
  images: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  names: {
    fontSize: 20,
    fontWeight: "bold",
  },
  prices: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
