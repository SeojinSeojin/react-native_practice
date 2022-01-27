import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
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

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput style={styles.input} placeholder='글자 입력' />
      <Button title='사진 입력' onPress={uploadImage} />
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  input: {
    width: '90%',
    padding: 12,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
