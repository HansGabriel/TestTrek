import { Audio, AVPlaybackSource } from "expo-av";

interface AudioProps {
  music?: AVPlaybackSource;
  sound?: Audio.Sound;
  volume?: number;
}

export const unloadAudio = async ({ sound }: AudioProps) => {
  if (sound) {
    return await sound.unloadAsync();
  }
};

export const playSound = async ({ music, sound }: AudioProps) => {
  if (sound && music) {
    await sound
      .loadAsync(music)
      .then(async () => {
        const checkLoaded = await sound.getStatusAsync();
        if (checkLoaded.isLoaded === true) {
          await sound.setIsLoopingAsync(true).then(async (status) => {
            if (status.isLoaded) {
              await sound.replayAsync();
            }
          });
        } else {
          console.log("Error in Loading mp3", checkLoaded.isLoaded);
        }
      })
      .catch((error: Error) => {
        console.log("Error in loading sound: ", error);
      });
  }
};

export const playEffects = async ({ sound, music }: AudioProps) => {
  if (sound && music) {
    await sound.loadAsync(music);
    await sound.playAsync();
  }
};
