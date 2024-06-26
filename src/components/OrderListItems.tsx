import { StyleSheet, Text, View, Pressable } from "react-native";
import { Href, Link, useSegments } from "expo-router";
import { Order } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

type OrderListItemsProps = {
  order: {
    created_at: string;
    id: number;
    status: string | null;
    total: number | null;
    user_id: string | null;
  };
};

const OrderListItems = ({ order }: OrderListItemsProps) => {
  const segments = useSegments();
  return (
    <Link
      href={{
        pathname: `/${segments[0]}/orders/[id]` as Href<string>,
        params: { id: `${order.id}` as Href<string> },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  time: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
  },
});
