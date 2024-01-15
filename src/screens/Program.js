import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "../components/Themed";
import { Box } from "../components/Box";
import { Header } from "../components/Header";

const programations = [
  {
    id: 1,
    day: "Domingo",
    time: "06:00 às 08:00",
    name: "Programa 1",
  },
  {
    id: 2,
    day: "Segunda-feira",
    time: "06:00 às 08:00",
    name: "Programa 2",
  },
  {
    id: 3,
    day: "Terça-feira",
    time: "06:00 às 08:00",
    name: "Programa 3",
  },
  {
    id: 4,
    day: "Quarta-feira",
    time: "06:00 às 08:00",
    name: "Programa 4",
  },
  {
    id: 5,
    day: "Quinta-feira",
    time: "06:00 às 08:00",
    name: "Programa 5",
  },
  {
    id: 6,
    day: "Sexta-feira",
    time: "06:00 às 08:00",
    name: "Programa 6",
  },
  {
    id: 7,
    day: "Sábado",
    time: "06:00 às 08:00",
    name: "Programa 7",
  },
];

export const Program = () => {
  return (
    <LinearGradient
      colors={["#3b2e50", "#3c1515", "#160105"]}
      style={styles.background}
    >
      <Header />
      <View style={{ marginTop: 20 }}>
        <ThemedText size="md">Acompanha a programação</ThemedText>
        <ThemedText size="sm" color="secondary">
          Fique ligado por tudo que esta tocando na rádio
        </ThemedText>

        <ScrollView style={{ marginTop: 30 }}>
          {programations.map((programation) => (
            <View
              key={programation.id}
              style={{
                borderBottomWidth: 1,
                borderColor: "#FBF2C0",
                marginBottom: 10,
              }}
            >
              <ThemedText size="sm" color="tertiary">
                {programation.day}
              </ThemedText>
              <Box between row>
                <ThemedText size="sm" color="secondary">
                  {programation.name}
                </ThemedText>
                <ThemedText size="xsm" color="tertiary">
                  {programation.time}
                </ThemedText>
              </Box>
            </View>
          ))}
        </ScrollView>
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
  spacing: {
    marginVertical: 20,
  },
});
