import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../types/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/style';

type homeScreenProp = StackNavigationProp<RootStackParams, 'Home'>;

function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title='Setting' onPress={() => navigation.navigate('Setting')} />
    </View>
  );
}

export default HomeScreen;
