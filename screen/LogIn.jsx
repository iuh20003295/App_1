import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      navigation.navigate('HomePage');
    }else if
      (username === 'shipper' && password === '123') {
        navigation.navigate('ShipPage');
    } 
    else {
      Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>ĐĂNG NHẬP</Text>
        <TextInput 
          value ={username}
          onChangeText={setUsername}
          placeholder="Tên đăng nhập" 
          style={styles.input} 
        />
        <TextInput 
          value ={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu" 
          style={styles.input} 
          secureTextEntry={true} 
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
          <Text style={styles.link}>Quên mật khẩu</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E0FFFF',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  link: {
    color: '#007BFF',
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default LoginScreen;