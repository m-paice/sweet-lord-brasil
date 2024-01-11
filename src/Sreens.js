import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./Home";

const Stack = createStackNavigator();

export function Screens() {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        option={{
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
