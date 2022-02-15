import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const code = '000ABC';
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>초대 코드를</Text>
              <Text style={styles.textTitle}>가족과 공유해볼까요?</Text>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.textCode}>{code}</Text>
              <Text style={styles.textCodeDescription}>
                초대 코드는 48시간 유효합니다
              </Text>
            </View>
          </View>
          <Text style={styles.btnShare}>초대 코드 공유하기</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  safeAreaContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
  },
  textContainer: {
    marginTop: 49,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#446CFF',
    paddingVertical: 28,
    borderRadius: 10,
  },
  textCode: {
    color: 'white',
    fontWeight: '600',
    fontSize: 32,
    letterSpacing: 9,
  },
  textCodeDescription: {
    color: 'white',
    fontSize: 14,
    marginTop: 12,
  },
  btnShare: {
    textAlign: 'center',
    backgroundColor: '#446CFF',
    paddingVertical: 17,
    color: 'white',
    borderRadius: 5,
  },
});
