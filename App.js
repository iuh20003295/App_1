import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import MainScreen from './screen/MainScreen';
import RegisterScreen from './screen/Register';
import LoginScreen from './screen/LogIn'; 
import HomePage from './screen/HomePage';
const Stack = createStackNavigator();
//LOAD MÀN HÌNH(start)
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main'); //2 giây
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={
            require('./img/favicon-48.png')
          }
        />
        <Text style={styles.text}>QSHIP Express Mobile</Text>
        <ActivityIndicator style={styles.horizontal} size="large" color="black" />
      </View>
    </SafeAreaView>
  );
};
//LOAD MÀN HÌNH(end)
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomePage" component={HomePage} />

    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    bottom: 0,
  },
  IconClose: {
    left: 0,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  btnlogin: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  btnregister: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;