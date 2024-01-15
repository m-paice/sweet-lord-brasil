import { Image } from "expo-image";
import { Linking, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../Themed";
import { Box } from "../Box";
import { Icon } from "../Icon";

import Logo from "../../../assets/sl-logo.jpg";

export function Header() {
  return (
    <View>
      <Text style={{ textAlign: "right", color: "#fff" }}>
        {require("../../../package.json").version}
      </Text>
      <View style={styles.header}>
        <Image
          source={Logo}
          width={50}
          height={50}
          style={{ borderRadius: 50 }}
        />
        <ThemedText size="lg" color="secondary">
          Sweet Lord Brasil
        </ThemedText>
      </View>
      <Box row center gap={30}>
        <Icon
          onPress={() =>
            Linking.openURL("https://www.instagram.com/radiosweetlord")
          }
          size={25}
          name="instagram"
          color="secondary"
        />
        <Icon
          onPress={() =>
            Linking.openURL("https://www.facebook.com/radiosweetlord")
          }
          size={25}
          name="facebook"
          color="secondary"
        />
        <Icon
          onPress={() =>
            Linking.openURL("https://www.youtube.com/@radiosweetlord7115")
          }
          size={25}
          name="youtube"
          color="secondary"
        />
      </Box>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
