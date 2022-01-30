import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { postFetcher } from '../utils/postFetcher';
import { dataURItoBLOB } from '../utils/blobExtractor';

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const getImage = async () => {
    const _image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!_image.cancelled) setImage(_image.uri);
  };

  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', dataURItoBLOB(image));
    const response = await postFetcher(
      'http://localhost:4444/upload',
      formData,
      'multipart'
    );
    if (!response.ok) alert('사진 전송 실패!');
    else alert('사진 전송 성공!');
  };

  const checkCameraPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    //if (status !== 'granted') alert('카메라 권한을 허용해주세요');
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title='사진 입력' onPress={getImage} />
      <Button title='사진 전송' onPress={uploadImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
