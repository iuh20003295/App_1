// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };
//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu.');
//       return;
//     }

//     try {
//       // Đăng nhập nhân viên
//       const employeeResponse = await axios.post('https://qship.pro.vn/API_QSHIP/auth/authenticateForEmployee.php', {
//         userPhone: username,
//         userPassword: password
//       });
//       if (employeeResponse.data && employeeResponse.data.token) {
//         const { roles, username: employeeUsername, id: employeeId } = employeeResponse.data;
//         if (roles === 'shipper') {
//           // Chỉ nhận roles "shipper"
//           await AsyncStorage.setItem('jwt_token', employeeResponse.data.token); // Lưu token
//           await AsyncStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
//           await AsyncStorage.setItem('username', employeeUsername); // Lưu tên người dùng
//           await AsyncStorage.setItem('employee_id', employeeId); // Lưu employee_id
//           await AsyncStorage.setItem('userRole', 'employee'); // Lưu employee_id
//           Alert.alert('Thành công', `Xin chào, ${employeeUsername}! Bạn đã đăng nhập thành công với vai trò Shipper.`);
//           navigation.navigate('ShipPage'); 
//         } else {
//           Alert.alert('Lỗi', 'Đăng nhập không thành công');
//         }
//         return;
//       }
//     } catch (error) {
//       console.log("Đăng nhập phân quyền khách hàng");
//     }

//     //Đăng nhập tài khoản khách hàng
//     try {
//       const customerResponse = await axios.post('https://qship.pro.vn/API_QSHIP/auth/authenticate.php', {
//         userPhone: username,
//         userPassword: password
//       });

//       if (customerResponse.data && customerResponse.data.token) {
//         const { username: customerName, id: customerId } = customerResponse.data;
//         await AsyncStorage.setItem('jwt_token', customerResponse.data.token); // Lưu token
//         await AsyncStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
//         await AsyncStorage.setItem('customer_name', customerName); // Lưu tên khách hàng
//         await AsyncStorage.setItem('customer_id', customerId); // Lưu customer_id
//         await AsyncStorage.setItem('userRole', 'customer'); // Lưu customer
//         Alert.alert('Thành công', `Xin chào, ${customerName}!`);
//         navigation.navigate('HomePage');
//       } else {
//         Alert.alert('Lỗi', 'Sai thông tin đăng nhập hoặc phản hồi từ máy chủ không hợp lệ.');
//       }
//     } catch (error) {
//       console.error('Lỗi trong quá trình đăng nhập:', error.response ? error.response.data : error.message);
//       Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.');
//     }
//   };
//   return (
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <View style={styles.container}>
//         <Text style={styles.header}>ĐĂNG NHẬP</Text>
//         <TextInput
//           value={username}
//           onChangeText={setUsername}
//           placeholder="Tên đăng nhập"
//           style={styles.input}
//         />
//         <TextInput
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Mật khẩu"
//           style={styles.input}
//           secureTextEntry={true}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Đăng nhập</Text>
//         </TouchableOpacity>
//         {/* Google Login Button */}
//         <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={()=>navigation.navigate('SignInWithGoogle')}>
//           <Text style={styles.buttonText}>Đăng nhập bằng Google</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("HomePage")}>
//           <Text style={styles.buttonText}>Trang Chủ</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#333',
//   },
//   input: {
//     height: 50,
//     borderColor: '#CCC',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#FFF',
//   },
//   link: {
//     color: '#007BFF',
//     marginBottom: 15,
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 5,
//     textAlign: 'center',
//     color: '#555',
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     backgroundColor: '#007BFF',
//     padding: 5,
//     borderRadius: 8,
//   },
//   backButtonText: {
//     color: '#FFF',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   googleButton: {
//     backgroundColor: '#db4a39', // Google brand color
//   }
// });

// export default LoginScreen;



import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

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
          await AsyncStorage.setItem('userRole', 'employee'); // Lưu employee_id
          Alert.alert('Thành công', `Xin chào, ${employeeUsername}!`);
          navigation.navigate('ShipPage'); 
        } else {
          Alert.alert('Lỗi', 'Đăng nhập không thành công');
        }
        return;
      }
    } catch (error) {
      console.log("Đăng nhập phân quyền khách hàng");
    }

    //Đăng nhập tài khoản khách hàng
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
        Alert.alert('Thành công', `Xin chào, ${customerName}!`);
        navigation.navigate('HomePage');
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
      <Image
        source={require('../img/qship-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Qship chúng tôi sẽ mang đến cho khách hàng trải nghiệm tuyệt vời</Text>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.eyeIcon}>
          {/* Add eye icon here */}
        </TouchableOpacity>
      </View>

      <View style={styles.rememberForgotContainer}>
        <TouchableOpacity style={styles.rememberMe}>
          {/* Add checkbox component here */}
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={()=>navigation.navigate('ForgotPass')}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={()=>navigation.navigate('HomePage')}>
        <Text style={styles.guestButtonText}>Không đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={()=>navigation.navigate('SignInWithGoogle')}>
        {/* <Text style={styles.googleButtonText}>Continue with Google</Text> */}
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
        <Text style={{ color: "#4285F4" }}>
          G<Text style={{ color: "#EA4336" }}>o</Text>
          <Text style={{ color: "#FBBC04" }}>o</Text>
          <Text style={{ color: "#4285F4" }}>g</Text>
          <Text style={{ color: "#34A853" }}>l</Text>
          <Text style={{ color: "#EA4336" }}>e</Text>
        </Text>
      </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>You don't have an account yet? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink} onPress={()=>navigation.navigate('Register')}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 100,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
  },
  forgotPassword: {
    color: '#007AFF',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButton: {
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;