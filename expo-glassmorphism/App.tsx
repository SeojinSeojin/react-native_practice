import {
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/background.jpeg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <BlurView style={styles.glassView} intensity={65}>
          <Image
            source={require('./assets/image-main.png')}
            style={styles.mainImage}
          />
          <BlurView style={styles.glassViewInner} intensity={10}>
            <Text style={styles.textTitle}>
              Choose {'\n'}your {'\n'}top goal
            </Text>
            <Text style={styles.textSub}>
              Practice your breathing, relax your body, listen the calming sound
              music make you feel better.
            </Text>
            <View style={styles.horizontalView}>
              <Text style={styles.buttonSkip}>Skip</Text>
              <LinearGradient
                colors={['#ffffffd9', '#ffffff7c']}
                style={styles.buttonNext}
              >
                <Text style={styles.textNext}>Next</Text>
              </LinearGradient>
            </View>
          </BlurView>
        </BlurView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  mainImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginTop: 70,
  },
  glassView: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  glassViewInner: {
    width: 320,
    gap: 16,
    borderRadius: 30,
    padding: 30,
    marginTop: 36,
    marginBottom: 44,
    borderColor: '#ffffff15',
    borderWidth: 4,
  },
  horizontalView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 41,
  },
  textSub: {
    color: '#ffffffaf',
    fontSize: 15,
    lineHeight: 20,
  },
  buttonSkip: {
    color: '#ffffff7e',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  buttonNext: {
    borderRadius: 20,
    borderColor: '#ffffff8e',
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 1,
  },
  textNext: { fontSize: 17, lineHeight: 22, fontWeight: '600' },
});
