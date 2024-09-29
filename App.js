import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screen/MainScreen';
import RegisterScreen from './screen/Register';
import LoginScreen from './screen/LogIn'; 
import HomePage from './screen/HomePage';
import PriceQuote from './screen/PriceQuote';
import Location from './screen/Location';
import Law from './screen/Law';
import SplashScreen from './screen/SplashScreen'; 
import ForgotPass from './screen/ForgotPass';
import ShipPage from './shipper/ShipPage';
import HistoryShip from './shipper/HistoryShip';
import CallHelp from './screen/CallHelp';
const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="PriceQuote" component={PriceQuote} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Law" component={Law} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="ShipPage" component={ShipPage} />
      <Stack.Screen name="HistoryShip" component={HistoryShip} />
      <Stack.Screen name="CallHelp" component={CallHelp} />

      
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
