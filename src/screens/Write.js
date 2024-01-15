import React from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Linking, ScrollView } from "react-native";

import { ThemedText } from "../components/Themed";
import { Icon } from "../components/Icon";
import { Box } from "../components/Box";
import Logo from "../../assets/sl-logo.jpg";
import { Header } from "../components/Header";

export const Write = () => {
  return (
    <LinearGradient
      colors={["#3b2e50", "#3c1515", "#160105"]}
      style={styles.background}
    >
      <Header />
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
