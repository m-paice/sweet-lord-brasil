import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "../components/Themed";
import { Box } from "../components/Box";
import { Header } from "../components/Header";

const programations = [
  {
    id: 1,
    day: "Segunda-feira",
    schedules: [
      { name: "Special Classics", time: "08:30 - 20:00" },
      { name: "WORLD JAZZ", time: "20:00 - 00:00" },
    ],
  },
  {
    id: 2,
    day: "Terça-feira",
    schedules: [
      { name: "Special Classics", time: "00:00 - 21:00" },
      { name: "SWEET BALLADS	", time: "21:00 - 00:15" },
    ],
  },
  {
    id: 3,
    day: "Quarta-feira",
    schedules: [
      { name: "Special Classics", time: "00:15 - 21:00" },
      { name: "UNPLUGGED CLASSICS", time: "21:00 - 00:00" },
    ],
  },
  {
    id: 4,
    day: "Quinta-feira",
    schedules: [
      { name: "Special Classics", time: "00:00 - 21:00" },
      { name: "SWEET BALLADS", time: "21:00 - 00:30" },
    ],
  },
  {
    id: 5,
    day: "Sexta-feira",
    schedules: [
      { name: "Special Classics", time: "00:30 - 21:00" },
      { name: "BLUES, SOUL AND R&B", time: "21:00 - 00:00" },
    ],
  },
  {
    id: 6,
    day: "Sábado",
    schedules: [
      { name: "Special Classics", time: "00:10 - 07:00" },
      { name: "COUNTRY CLASSICS", time: "07:00 - 14:00" },
      { name: "ROCK BRASIL", time: "14:00 - 18:00" },
      { name: "RAÍZES - MPB", time: "18:00 - 21:00" },
      { name: "NIGHT SOUL", time: "21:00 - 00:30" },
    ],
  },
  {
    id: 7,
    day: "Domingo",
    schedules: [
      { name: "Special Classics", time: "00:30 - 10:00" },
      { name: "SWEET BALLADS", time: "10:00 - 15:50" },
      { name: "SPECIAL CLASSICS", time: "19:00 - 22:00" },
      { name: "SOFT ROCK", time: "22:00 - 08:30" },
    ],
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
      </View>

      <ScrollView style={{ marginVertical: 20 }}>
        {programations.map((programation) => (
          <View key={programation.id} style={styles.item}>
            <ThemedText size="sm" color="tertiary">
              {programation.day}
            </ThemedText>
            {programation.schedules.map((item) => (
              <Box key={item.name} between row>
                <ThemedText size="sm" color="secondary">
                  {item.name}
                </ThemedText>
                <ThemedText size="xsm" color="tertiary">
                  {item.time}
                </ThemedText>
              </Box>
            ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  item: {
    borderBottomWidth: 1,
    borderColor: "#FBF2C0",
    marginBottom: 10,
  },
});
