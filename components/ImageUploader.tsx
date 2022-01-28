import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const uploadImage = async () => {
    const _image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });
    if (!_image.cancelled) setImage(_image.uri);
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
      <Button title='사진 입력' onPress={uploadImage} />
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
