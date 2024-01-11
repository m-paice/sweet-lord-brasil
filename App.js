import "react-native-gesture-handler";

import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { Screens } from "./src/Sreens";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Screens />
    </NavigationContainer>
  );
}
