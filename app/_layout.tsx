import { router, Stack } from "expo-router";
import Token from "./temp/token.temp";
import { useEffect } from "react";

export default function RootLayout() {
  const token = new Token();

  useEffect(() => {
    if (!token.getToken()) {
      router.push("/login");
      return;
    }
  })

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={
          {
            headerShown: false,
          }
        }
      />
      <Stack.Screen
        name="login"
        options={
          {
            headerShown: false,
          }
        }
      />
    </Stack>
  );
}
