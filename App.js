import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorIcon from "react-native-vector-icons/FontAwesome";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import { Music } from "./src/screens/Music";
import { Program } from "./src/screens/Program";
import { Write } from "./src/screens/Write";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const Tab = createBottomTabNavigator();

export default function App() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
