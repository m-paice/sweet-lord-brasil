import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorIcon from "react-native-vector-icons/FontAwesome";

import { Music } from "./src/screens/Music";
import { Program } from "./src/screens/Program";
import { Write } from "./src/screens/Write";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
