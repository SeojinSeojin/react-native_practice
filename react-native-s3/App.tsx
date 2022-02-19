import { StyleSheet, View } from 'react-native';
import ImageUploader from './components/ImageUploader';

export default function App() {
  return (
    <View style={styles.container}>
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
});
