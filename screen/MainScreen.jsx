import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

const MainScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../img/background-signup.png')}
        style={styles.background}
      >
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <Text style={styles.header1}>QSHIP</Text>
          <Text style={styles.header1}>XIN CHÀO</Text>
          <Text style={styles.header2}>Hãy đăng nhập để sử dụng dịch vụ của chúng tôi</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.homeButton]} 
              onPress={() => navigation.navigate('HomePage')}
            >
              <Text style={styles.buttonText}>HOME PAGE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header1: {
    color: '#FFFFFF',
    fontSize: width * 0.12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  header2: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: height * 0.06,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: 30,
    marginBottom: height * 0.02,
    width: width * 0.8,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  homeButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});

export default MainScreen;