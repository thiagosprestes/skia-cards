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
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <CardProvider>
        <Home />
      </CardProvider>
    </GestureHandlerRootView>
  );
}
