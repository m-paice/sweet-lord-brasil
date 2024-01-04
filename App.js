import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";
import { ThemedText } from "./components/Themed";
import { Icon } from "./components/Icon";

import Logo from "./assets/sl-logo.jpg";
import { Box } from "./components/Box";
import { API_KEY_LAST_FM } from "./constants/lastfm";

const App = () => {
  const [sound, setSound] = useState();
  const [loadSound, setLoadSound] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [songName, setSongName] = useState("");
  const [albumCover, setAlbumCover] = useState("");

  useEffect(() => {
    const loadSound = async () => {
      setLoadSound(true);

      const { sound } = await Audio.Sound.createAsync({
        uri: "https://srv5.voxon.top:7010/stream/",
      });
      setLoadSound(false);
      setSound(sound);
      sound.playAsync();
      setIsPlaying(true);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
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
              const capaAlbum = data.track.album.image[3]["#text"];
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
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (sound) {
      sound.setVolumeAsync(value);
    }
  };

  const [artist, name] = songName.split(" - ");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} width={50} height={50} />
        <ThemedText size="lg" color="secondary">
          Sweet Lord Brasil
        </ThemedText>
      </View>

      <ScrollView>
        <View style={styles.spacing}>
          <ThemedText size="md" center>
            Special Classic
          </ThemedText>
          <ThemedText size="sm" center>
            19:00 - 21:00
          </ThemedText>
        </View>

        <View style={styles.spacing}>
          <Image source={{ uri: albumCover }} width="100%" height={300} />
          <View style={styles.spacing}>
            <ThemedText color="secondary" size="md">
              {name}
            </ThemedText>
            <ThemedText color="secondary" size="sm">
              {artist}
            </ThemedText>
          </View>

          <View style={{ marginVertical: 40, alignItems: "center" }}>
            {loadSound ? (
              <ActivityIndicator color="#FBF2C0" size={30} />
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
        <Box row center gap={30}>
          <Icon size={40} name="instagram" color="secondary" />
          <Icon size={40} name="facebook" color="secondary" />
          <Icon size={40} name="youtube" color="secondary" />
        </Box>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020024",
    padding: 20,
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

export default App;
