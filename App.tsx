import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ActivityIndicator } from "react-native";
import { Home } from "./src/screens/Home";
import { CardProvider } from "./src/contexts/card";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <CardProvider>
        <Home />
      </CardProvider>
    </>
  );
}
