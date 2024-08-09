import React, { useEffect, useState } from "react";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { Header } from "../components/Header";
import { ThemedText } from "../components/Themed";
import { Icon } from "../components/Icon";

import Logo from "../../assets/sl-logo.jpg";

export const Music = () => {
  const isPlayingTrack = useIsPlaying();

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlayingTrack.playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isPlayingTrack.playing]);

  const playSound = async () => {
    TrackPlayer.play();
    setIsPlaying(true);
  };

  const pauseSound = async () => {
    TrackPlayer.pause();
    setIsPlaying(false);
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
            {isPlaying ? (
              <TouchableOpacity onPress={pauseSound}>
                <Icon size={80} name="pause" color="secondary" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={playSound}>
                <Icon size={80} name="play" color="secondary" />
              </TouchableOpacity>
            )}
          </View>
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
