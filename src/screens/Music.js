import React, { useState, useEffect, useRef } from "react";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Text,
} from "react-native";

import { ThemedText } from "../components/Themed";
import { Icon } from "../components/Icon";
import { Box } from "../components/Box";
import { API_KEY_LAST_FM } from "../constants/lastfm";
import Logo from "../../assets/sl-logo.jpg";

Audio.setAudioModeAsync({
  staysActiveInBackground: true,
});

export const Music = () => {
  const sound = useRef(new Audio.Sound());

  const [loadSound, setLoadSound] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [songName, setSongName] = useState("");
  const [albumCover, setAlbumCover] = useState("");

  useEffect(() => {
    const loadSound = async () => {
      setLoadSound(true);

      const status = await sound.current.loadAsync(
        { uri: "https://srv5.voxon.top:7010/stream/" },
        { shouldPlay: isPlaying }
      );

      if (status.isLoaded) {
        setLoadSound(false);
      }
    };

    loadSound();

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const soundName = async () => {
      fetch("https://player.voxon.top/proxy/7010/currentsong?sid=1")
        .then((response) => response.text())
        .then((response) => {
          setSongName(response);

          const [artist, music] = response.split(" - ");

          const baseURL = "http://ws.audioscrobbler.com/2.0";
          const path = `/?method=track.getInfo&api_key=${API_KEY_LAST_FM}&artist=${artist}&track=${music}&format=json`;

          const API_URL = baseURL + path;

          fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
              const capaAlbum = data?.track?.album?.image?.[3]?.["#text"] || "";
              setAlbumCover(capaAlbum);
            });
        });
    };

    const interval = setInterval(() => {
      soundName();
    }, 2_000);

    return () => clearInterval(interval);
  }, []);

  const playSound = async () => {
    if (sound.current) {
      await sound.current.playAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Radio Sweet Lord Brasil",
          body: "A música está tocando!",
          data: {},
        },
        trigger: null,
      });
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound.current) {
      await sound.current.pauseAsync();

      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (sound.current) {
      sound.current.setVolumeAsync(value);
    }
  };

  const [artist, name] = songName.split(" - ");

  return (
    <LinearGradient
      colors={["#3b2e50", "#3c1515", "#160105"]}
      style={styles.background}
    >
      <StatusBar style="light" />
      <Text style={{ textAlign: "right", color: "#fff" }}>
        {require("../../package.json").version}
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
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View>
          <ThemedText size="md" center>
            Special Classic
          </ThemedText>
        </View>

        <View>
          {albumCover ? (
            <Image source={{ uri: albumCover }} width="100%" height={250} />
          ) : (
            <Image source={Logo} width="100%" height={250} />
          )}
          <View>
            <ThemedText color="secondary" size="md">
              {name}
            </ThemedText>
            <ThemedText color="secondary" size="sm">
              {artist}
            </ThemedText>
          </View>

          <View style={{ marginVertical: 20, alignItems: "center" }}>
            {loadSound ? (
              <ActivityIndicator color="#FBF2C0" size={80} />
            ) : isPlaying ? (
              <TouchableOpacity onPress={pauseSound}>
                <Icon size={80} name="pause" color="secondary" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={playSound}>
                <Icon size={80} name="play" color="secondary" />
              </TouchableOpacity>
            )}
          </View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor="#FBF2C0"
            maximumTrackTintColor="#FBF2C0"
            minimumTrackTintColor="#FBF2C0"
            value={volume}
            step={0.1}
            onValueChange={handleVolumeChange}
          />
        </View>
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
