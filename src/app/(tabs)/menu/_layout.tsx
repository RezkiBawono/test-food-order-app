import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
      {/* <Stack.Screen name="[id]" options={{ title: `${product.name}` }} /> */}
    </Stack>
  );
}
