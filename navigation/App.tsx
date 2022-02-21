import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './components/BottomNavigation';
import SettingScreen from './screens/SettingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Main' component={BottomNavigation} />
        <Stack.Screen name='Setting' component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
