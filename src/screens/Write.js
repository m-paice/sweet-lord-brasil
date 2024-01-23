import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { Formik } from "formik";

import { ThemedText } from "../components/Themed";
import { Header } from "../components/Header";
import { sendMessage } from "../services/sendMessage";

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

      <Formik
        initialValues={{ name: "", music: "", artist: "" }}
        onSubmit={async (values) => {
          await sendMessage({
            name: values.name,
            music: values.music,
            artist: values.artist,
          });

          Alert.alert(
            "Pedido enviado com sucesso.",
            "Seu pedido já está com o locutor, em breve ele irá tocar sua música!"
          );
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <View>
            <View style={styles.wrapperInput}>
              <ThemedText size="sm"> Seu nome </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome aqui..."
                placeholderTextColor="gray"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              ></TextInput>
            </View>

            <View style={styles.wrapperInput}>
              <ThemedText size="sm"> Nome da música </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome da música aqui..."
                placeholderTextColor="gray"
                onChangeText={handleChange("music")}
                onBlur={handleBlur("music")}
                value={values.music}
              ></TextInput>
            </View>

            <View style={styles.wrapperInput}>
              <ThemedText size="sm"> Nome do artísta </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do artísta aqui..."
                placeholderTextColor="gray"
                onChangeText={handleChange("artist")}
                onBlur={handleBlur("artist")}
                value={values.artist}
              ></TextInput>
            </View>

            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              title="Enviar pedido"
              color="#E62948"
            ></Button>
          </View>
        )}
      </Formik>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  wrapperInput: {
    marginVertical: 15,
  },
  input: {
    color: "gray",
    fontSize: 17,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  spacing: {
    marginVertical: 20,
  },
});
