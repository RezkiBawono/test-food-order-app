import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItems from "@/components/OrderListItems";
import Colors from "@/constants/Colors";
import { OrderStatus, OrderStatusList } from "@/types";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseInt(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: updatedOrder } = useUpdateOrder();

  const updateStatus = (status: OrderStatus) => {
    updatedOrder({ id: id, updatedFields: { status } });
  };

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error || !order) {
    return <Text>Data fetch failed. Please try again.</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order # ${order.id}` }} />

      <FlatList
        data={order}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItems order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
});
