import React, { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

import { Header } from "../components/Header";
import { ThemedText } from "../components/Themed";

import Logo from "../../assets/sl-logo.jpg";
import { Icon } from "../components/Icon";
import { Image } from "expo-image";

const BACKGROUND_MUSIC_TASK = "BACKGROUND_MUSIC_TASK";

TaskManager.defineTask(BACKGROUND_MUSIC_TASK, async () => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: "https://stm.roxcast.com.br:7036",
    });
    await sound.playAsync();
    await sound.setIsLoopingAsync(true);
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error(error);
    return BackgroundFetch.Result.Failed;
  }
});

export const Music = () => {
  const sound = useRef(new Audio.Sound());

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true, // No caso de Android, essa configuração não é relevante
        });

        await sound.current.loadAsync({
          uri: "https://stm.roxcast.com.br:7036",
        });
        await sound.current.playAsync();
        await sound.current.setIsLoopingAsync(true);

        await BackgroundFetch.registerTaskAsync(BACKGROUND_MUSIC_TASK, {
          minimumInterval: 15,
          stopOnTerminate: false,
          startOnBoot: true,
        });

        setIsPlaying(true);
      } catch (error) {
        console.error(error);
        setIsPlaying(false);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  const playSound = async () => {
    if (sound.current) {
      await sound.current.playAsync();

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

  return (
    <LinearGradient
      colors={["#3b2e50", "#3c1515", "#160105"]}
      style={styles.background}
    >
      <Header />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View>
          <ThemedText size="md" center>
            Special Classic
          </ThemedText>
        </View>

        <View>
          <Image source={Logo} width="100%" height={250} />

          <View style={{ marginVertical: 20, alignItems: "center" }}>
            {loading ? (
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
