import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu.');
      return;
    }

    try {
      // Đăng nhập nhân viên
      const employeeResponse = await axios.post('https://qship.pro.vn/API_QSHIP/auth/authenticateForEmployee.php', {
        userPhone: username,
        userPassword: password
      });
      if (employeeResponse.data && employeeResponse.data.token) {
        const { roles, username: employeeUsername, id: employeeId } = employeeResponse.data;

        if (roles === 'shipper') {
          // Chỉ nhận roles "shipper"
          await AsyncStorage.setItem('jwt_token', employeeResponse.data.token); // Lưu token
          await AsyncStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
          await AsyncStorage.setItem('username', employeeUsername); // Lưu tên người dùng
          await AsyncStorage.setItem('employee_id', employeeId); // Lưu employee_id
          await AsyncStorage.setItem('userRole', 'employee'); // Lưu employee
          Alert.alert('Thành công', `Xin chào, ${employeeUsername}! Bạn đã đăng nhập thành công với vai trò Shipper.`);
          navigation.navigate('ShipPage'); // Chuyển hướng đến trang ShipPage
        } else {
          Alert.alert('Lỗi', 'Chỉ tài khoản Shipper được phép đăng nhập.');
        }
        return;
      }
    } catch (error) {
      console.log("Đăng nhập phân quyền khách hàng");
    }


    // Nếu không thành công với tài khoản nhân viên, thử đăng nhập tài khoản khách hàng
    try {
      const customerResponse = await axios.post('https://qship.pro.vn/API_QSHIP/auth/authenticate.php', {
        userPhone: username,
        userPassword: password
      });
  
      if (customerResponse.data && customerResponse.data.token) {
        const { username: customerName, id: customerId } = customerResponse.data;
        await AsyncStorage.setItem('jwt_token', customerResponse.data.token); // Lưu token
        await AsyncStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
        await AsyncStorage.setItem('customer_name', customerName); // Lưu tên khách hàng
        await AsyncStorage.setItem('customer_id', customerId); // Lưu customer_id
        await AsyncStorage.setItem('userRole', 'customer'); // Lưu customer

        Alert.alert('Thành công', `Xin chào, ${customerName}! Đăng nhập khách hàng thành công.`);
        navigation.navigate('HomePage'); // Điều hướng đến HomePage
      } else {
        Alert.alert('Lỗi', 'Sai thông tin đăng nhập hoặc phản hồi từ máy chủ không hợp lệ.');
      }
    } catch (error) {
      console.error('Lỗi trong quá trình đăng nhập:', error.response ? error.response.data : error.message);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.header}>ĐĂNG NHẬP</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Tên đăng nhập"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          style={styles.input}
          secureTextEntry={true}
        />
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
