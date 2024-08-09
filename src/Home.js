import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorIcon from "react-native-vector-icons/FontAwesome";
import TrackPlayer from "react-native-track-player";

import { Music } from "./screens/Music";
import { Program } from "./screens/Program";
import { Write } from "./screens/Write";
import { useSetupTrackPlayer } from "./hooks/useSetupTrackPlayer";
import Icon from "../assets/icon.png";

const Tab = createBottomTabNavigator();
const sound = "https://stm.roxcast.com.br:7036";

export function Home() {
  useSetupTrackPlayer({
    onLoad: () => {
      TrackPlayer.add([
        {
          id: "trackId",
          url: sound,
          title: "Sweet Lord Brasil",
          artist: "Special Classic",
          artwork: Icon,
        },
      ]);

      TrackPlayer.play();
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Music"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#160105",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === "Program") {
            iconName = "folder";
            iconColor = focused ? "#FBF2C0" : "#E62948";
          } else if (route.name === "Music") {
            iconName = "music";
            iconColor = focused ? "#FBF2C0" : "#E62948";
          } else if (route.name === "Write") {
            iconName = "edit";
            iconColor = focused ? "#FBF2C0" : "#E62948";
          }
          return <VectorIcon name={iconName} size={35} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen
        options={{
          title: "",
        }}
        name="Program"
        component={Program}
      />
      <Tab.Screen
        options={{
          title: "",
        }}
        name="Music"
        component={Music}
      />
      <Tab.Screen
        options={{
          title: "",
        }}
        name="Write"
        component={Write}
      />
    </Tab.Navigator>
  );
}
