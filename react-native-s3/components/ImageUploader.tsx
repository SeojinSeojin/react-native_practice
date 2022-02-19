import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { dataURItoBLOB } from '../utils/blobExtractor';

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const getImage = async () => {
    const _image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
    });
    if (!_image.cancelled) setImage(_image.uri);
  };

  const uploadImage = async () => {
    if (!image) return;
    try {
      const fileName = `${new Date().toLocaleString()}.png`;
      const presignedURLResponse = await fetch(
        'http://localhost:4444/presigned_url',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            fileName,
          }),
        }
      );
      const { presignedURL } = await presignedURLResponse.json();

      const imageBLOB = dataURItoBLOB(image);
      const imageFile = new File([imageBLOB], fileName);

      const s3UploadResponse = await fetch(
        new Request(presignedURL, {
          method: 'PUT',
          credentials: 'omit',
          body: imageFile,
          headers: new Headers({
            'Content-Type': 'image/*',
          }),
        })
      );
      console.log(s3UploadResponse);
    } catch (e) {
      console.error(e);
    }
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
