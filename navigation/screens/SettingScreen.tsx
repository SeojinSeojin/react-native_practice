import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParams } from '../types/RootStackParams';

type settingScreenProp = StackNavigationProp<RootStackParams, 'Setting'>;

function SettingScreen() {
  const navigation = useNavigation<settingScreenProp>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Setting Screen</Text>
      <Button title='Home' onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default SettingScreen;
