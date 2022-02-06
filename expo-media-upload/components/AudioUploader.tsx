import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { StyleSheet, Button, View } from 'react-native';
import { postFetcher } from '../utils/postFetcher';
import { blobURItoBLOB } from '../utils/blobExtractor';

export default function AudioUploader() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioURI, setAudioURI] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<Audio.Sound | null>(null);

  const startRecord = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecord = async () => {
    if (!recording) {
      alert('녹음 중인 파일이 없어요ㅜ');
      return;
    }
    await recording.stopAndUnloadAsync();
    const recordingURI = recording.getURI();
    setAudioURI(recordingURI);
    setRecording(null);
  };

  const playRecord = async () => {
    if (!audioURI) {
      alert('녹음된 파일이 없어요ㅜ');
      return;
    }
    const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
    setPlayingTrack(sound);
    sound.playAsync();
  };

  const uploadRecord = async () => {
    if (!audioURI) return;
    const audioBLOB = await blobURItoBLOB(audioURI);
    const audioFile = new File(
      [audioBLOB],
      `${new Date().toLocaleString()}.webm`
    );
    const formData = new FormData();
    formData.append('file', audioFile);
    const response = await postFetcher(
      'http://localhost:4444/upload',
      formData,
      'multipart'
    );
    if (!response.ok) alert('녹음 전송 실패!');
    else alert('녹음 전송 성공!');
  };

  useEffect(() => {
    () => {
      return playingTrack ? () => playingTrack.unloadAsync() : undefined;
    };
  }, [playingTrack]);

  return (
    <View style={styles.container}>
      <Button title='녹음 시작' onPress={startRecord} />
      <Button title='녹음 중지' onPress={stopRecord} />
      <Button title='녹음 재생' onPress={playRecord} />
      <Button title='녹음 전송' onPress={uploadRecord} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
