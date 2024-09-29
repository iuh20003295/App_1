import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function Sound({ isPlaying }) {
  const [sound, setSound] = useState(null);

  async function setupAudio() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.error('Failed to set audio mode', error);
    }
  }

  async function loadSound() {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../sound/khatvongtuoitre.mp3'),
        { shouldPlay: isPlaying, isLooping: true },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    }
  }

  async function playSound() {
    if (sound) {
      await sound.playAsync();
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
    }
  }

  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded && status.isPlaying !== isPlaying) {
      if (isPlaying) {
        playSound();
      } else {
        pauseSound();
      }
    }
  }

  useEffect(() => {
    setupAudio();
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      if (isPlaying) {
        playSound();
      } else {
        pauseSound();
      }
    }
  }, [isPlaying]);

  return null; // Không cần hiển thị gì, chỉ quản lý âm thanh
}
