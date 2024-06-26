import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router/stack";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { PizzaSize } from "@/types";
import defaultImageLink from "@/constants/DefaultImage";
import { UseCart } from "@/providers/CartContext";
import { useProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";

const pizzaSize: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = UseCart();
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error || !product) {
    return <Text>Data fetch failed. Please try again.</Text>;
  }

  // const product = products.find((p) => p.id.toString() == id);
  // This function is to dynamically choose each object inside products - only use for local mock data and is commented when using database.

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  // if (!product) {
  //   return <Text>Product is not Found</Text>;
  // }
  // This statement is to make sure that product is type safe i.e (product.name) not (product?.name). Is commented because is replaced by error statement.

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: product.name, headerTitleAlign: "center" }}
      />
      <RemoteImage
        fallback={defaultImageLink}
        path={product.image ? product.image : ""}
        style={styles.images}
        resizeMode="contain"
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {pizzaSize.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size); // This function is to choose between pizzaSize
            }}
            style={[
              styles.sizeTextContainer,
              { backgroundColor: selectedSize == size ? "grey" : "white" },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize == size ? "white" : "black",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.names}>{product.name}</Text>
      <Text style={styles.prices}>${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  images: {
    width: "80%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  select: {},
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeTextContainer: {
    backgroundColor: "grey",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "400",
  },
  names: {
    fontSize: 20,
    fontWeight: "bold",
    margin: "auto",
  },
  prices: {
    color: Colors.light.tint,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
