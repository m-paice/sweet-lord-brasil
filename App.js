import "react-native-gesture-handler";

import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";

import { playbackService } from "./src/hooks/useSetupTrackPlayer";
import { Screens } from "./src/Sreens";

export default function App() {
  TrackPlayer.registerPlaybackService(() => playbackService);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Screens />
    </NavigationContainer>
  );
}
