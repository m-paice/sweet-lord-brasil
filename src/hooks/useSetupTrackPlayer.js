import { useEffect, useRef } from "react";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
  useActiveTrack,
} from "react-native-track-player";

export const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log("Event.RemotePause");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log("Event.RemotePlay");
    TrackPlayer.play();
  });
};

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10, // 10 mb
  });

  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      // Capability.SkipToNext,
      // Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
    ],
    progressUpdateEventInterval: 2,
  });

  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const useSetupTrackPlayer = ({ onLoad }) => {
  const isInitialized = useRef(false);
  const activeTrack = useActiveTrack();

  useEffect(() => {
    console.log("isInitialized", isInitialized.current);

    if (activeTrack) {
      console.log("activeTrack", activeTrack);
      isInitialized.current = true;
    } else {
      setupPlayer()
        .then(() => {
          isInitialized.current = true;
          if (onLoad) onLoad();
        })
        .catch((error) => {
          console.error("error on setupPlayer: ", error);
          isInitialized.current = false;
        });
    }
  }, []);
};
