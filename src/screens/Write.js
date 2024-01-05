import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Linking, ScrollView } from "react-native";

import { ThemedText } from "../components/Themed";
import { Icon } from "../components/Icon";
import { Box } from "../components/Box";
import Logo from "../../assets/sl-logo.jpg";

export const Write = () => {
  return (
    <LinearGradient
      colors={["#3b2e50", "#3c1515", "#160105"]}
      style={styles.background}
    >
      <StatusBar style="light" />
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
      <View style={{ marginTop: 20 }}>
        <ThemedText size="md">Peça sua música favorita</ThemedText>
        <ThemedText size="sm" color="secondary">
          Preencha os campos abaixo
        </ThemedText>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  spacing: {
    marginVertical: 20,
  },
});
