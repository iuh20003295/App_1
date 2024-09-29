import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Image, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main'); //3 giây
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../img/backgrlogo.png')} 
        />
        <Text style={styles.text}>QSHIP Express Mobile</Text>
        <ActivityIndicator style={styles.horizontal} size="large" color="black" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, // Bo góc hình tròn
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    bottom: 0,
  },
});

export default SplashScreen;
