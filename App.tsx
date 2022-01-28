import { StyleSheet, TextInput, View } from 'react-native';
import ImageUploader from './components/ImageUploader';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='글자 입력' />
      <ImageUploader />
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
  input: {
    width: '90%',
    padding: 12,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
