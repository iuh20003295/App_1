// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity,StyleSheet,Keyboard, ImageBackground, Alert, ScrollView,TouchableWithoutFeedback } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const RegisterScreen = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [purposeOpen, setPurposeOpen] = useState(false);
//   const [selectedPurpose, setSelectedPurpose] = useState(null);
//   const [shipScaleOpen, setShipScaleOpen] = useState(false);
//   const [selectedShipScale, setSelectedShipScale] = useState(null);
//   const [productTypeOpen, setProductTypeOpen] = useState(false);
//   const [selectedProductType, setSelectedProductType] = useState(null);

//   const [purposeItems] = useState([
//     { label: 'Cá nhân', value: 'Cá nhân' },
//     { label: 'Doanh nghiệp', value: 'Doanh nghiệp' }
//   ]);

//   const [shipScaleItems] = useState([
//     { label: 'Không thường xuyên', value: 'Không thường xuyên' },
//     { label: 'Dưới 100 đơn/tháng', value: 'Dưới 100 đơn/tháng' },
//     { label: 'Trên 100 đơn/tháng', value: 'Trên 100 đơn/tháng' }
//   ]);

//   const [productTypeItems] = useState([
//     { label: 'Thời trang', value: 'Thời trang' },
//     { label: 'Thể thao & dã ngoại', value: 'Thể thao & dã ngoại' },
//     { label: 'Trang sức và phụ kiện thời trang', value: 'Trang sức và phụ kiện thời trang' },
//     { label: 'Mỹ phẩm', value: 'Mỹ phẩm' },
//   ]);

//   const validateInputs = () => {
//     if (!username || !email || !phoneNumber || !password || !confirmPassword || !selectedPurpose || !selectedShipScale || !selectedProductType) {
//       Alert.alert('Vui lòng điền đầy đủ tất cả thông tin');
//       return false;
//     }
//     if (username.length <= 6) {
//       Alert.alert('Tên đăng nhập phải lớn hơn 6 ký tự');
//       return false;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       Alert.alert('Email không đúng định dạng');
//       return false;
//     }
//     if (!/^0\d{9}$/.test(phoneNumber)) {
//       Alert.alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0');
//       return false;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Mật khẩu nhập lại không khớp');
//       return false;
//     }
//     return true;
//   };

//   const handleSignUp = () => {
//     if (validateInputs()) {
//       Alert.alert('Thành công', 'Đăng ký thành công!', );
//       navigation.goBack();
//     }
//   };
//   const usernameInputRef = useRef(null);
//   const passwordInputRef = useRef(null);
//   const emailInputRef = useRef(null);
//   const phoneInputRef = useRef(null);

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };
//   return (
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//     <ImageBackground style={styles.backgroundImage}>
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.header}>ĐĂNG KÝ</Text>
//         <ScrollView>
//         <TextInput 
//           placeholder="Tên đăng nhập" 
//           style={styles.input} 
//           value={username}
//           onChangeText={setUsername}
//           ref={usernameInputRef}
//         />
//         <TextInput 
//           placeholder="Email" 
//           style={styles.input} 
//           keyboardType="email-address" 
//           value={email}
//           onChangeText={setEmail}
//           ref={emailInputRef}
//         />
//         <TextInput 
//           placeholder="Số điện thoại" 
//           style={styles.input} 
//           keyboardType="phone-pad" 
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           ref={phoneInputRef}
//         />
//         <TextInput 
//           placeholder="Mật khẩu" 
//           style={styles.input} 
//           secureTextEntry={true}
//           value={password}
//           onChangeText={setPassword}
//           ref={passwordInputRef}
//         />
//         <TextInput 
//           placeholder="Nhập lại mật khẩu" 
//           style={styles.input} 
//           secureTextEntry={true}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           ref={passwordInputRef}
//         />

//         <DropDownPicker
//           open={purposeOpen}
//           value={selectedPurpose}
//           items={purposeItems}
//           setOpen={setPurposeOpen}
//           setValue={setSelectedPurpose}
//           style={styles.dropdown}
//           placeholder="Mục đích sử dụng"
//           zIndex={3000}
//           zIndexInverse={1000}

          
//         />

//         <DropDownPicker
//           open={shipScaleOpen}
//           value={selectedShipScale}
//           items={shipScaleItems}
//           setOpen={setShipScaleOpen}
//           setValue={setSelectedShipScale}
//           style={styles.dropdown}
//           placeholder="Quy mô vận chuyển"
//           zIndex={2000}
//           zIndexInverse={2000}
//         />

//         <DropDownPicker
//           open={productTypeOpen}
//           value={selectedProductType}
//           items={productTypeItems}
//           setOpen={setProductTypeOpen}
//           setValue={setSelectedProductType}
//           style={styles.dropdown}
//           placeholder="Ngành hàng"
//           zIndex={1000}
//           zIndexInverse={3000}
//         />

//         <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//           <Text style={styles.buttonText}>Đăng ký</Text>
//         </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </ImageBackground>
//     </TouchableWithoutFeedback>
//   );
// };
// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     backgroundColor: '#E0FFFF',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     marginTop: 60,
//     textAlign: 'center',
//     color: '#6495ED',
//   },
//   input: {
//     height: 50,
//     borderColor: '#CCC',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     fontSize: 16,
//   },
//   dropdown: {
//     marginBottom: 15,
//     borderColor: '#CCC',
//     borderRadius: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
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
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   }
// });
// export default RegisterScreen;





// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Ionicons';

// const RegisterScreen = () => {
//   const navigation = useNavigation();
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [purposeOpen, setPurposeOpen] = useState(false);
//   const [selectedPurpose, setSelectedPurpose] = useState(null);
//   const [shipScaleOpen, setShipScaleOpen] = useState(false);
//   const [selectedShipScale, setSelectedShipScale] = useState(null);
//   const [productTypeOpen, setProductTypeOpen] = useState(false);
//   const [selectedProductType, setSelectedProductType] = useState(null);

//   const [purposeItems] = useState([
//     { label: 'Cá nhân', value: 'Cá nhân' },
//     { label: 'Doanh nghiệp', value: 'Doanh nghiệp' }
//   ]);

//   const [shipScaleItems] = useState([
//     { label: 'Không thường xuyên', value: 'Không thường xuyên' },
//     { label: 'Dưới 100 đơn/tháng', value: 'Dưới 100 đơn/tháng' },
//     { label: 'Trên 100 đơn/tháng', value: 'Trên 100 đơn/tháng' }
//   ]);

//   const [productTypeItems] = useState([
//     { label: 'Thời trang', value: 'Thời trang' },
//     { label: 'Thể thao & dã ngoại', value: 'Thể thao & dã ngoại' },
//     { label: 'Trang sức và phụ kiện thời trang', value: 'Trang sức và phụ kiện thời trang' },
//     { label: 'Mỹ phẩm', value: 'Mỹ phẩm' },
//   ]);

//   const validateInputs = () => {
//     if (!username || !email || !phoneNumber || !password || !confirmPassword || !selectedPurpose || !selectedShipScale || !selectedProductType) {
//       Alert.alert('Vui lòng điền đầy đủ tất cả thông tin');
//       return false;
//     }
//     if (username.length <= 6) {
//       Alert.alert('Tên đăng nhập phải lớn hơn 6 ký tự');
//       return false;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       Alert.alert('Email không đúng định dạng');
//       return false;
//     }
//     if (!/^0\d{9}$/.test(phoneNumber)) {
//       Alert.alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0');
//       return false;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Mật khẩu nhập lại không khớp');
//       return false;
//     }
//     return true;
//   };

//   const handleSignUp = () => {
//     if (validateInputs()) {
//       Alert.alert('Thành công', 'Đăng ký thành công!', );
//       navigation.goBack();
//     }
//   };

//   const dismissKeyboard = () => {
//     Keyboard.dismiss();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={require('../img/backgrlogo.png')} // Replace with your actual logo path
//           style={styles.logo}
//         />
//         <Text style={styles.title}>Create an Account</Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={true}
//         />
//         <TouchableOpacity style={styles.eyeIcon}>
//           <Icon name="eye-outline" size={24} color="#666" />
//         </TouchableOpacity>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry={true}
//       />

//       <DropDownPicker
//         open={purposeOpen}
//         value={selectedPurpose}
//         items={purposeItems}
//         setOpen={setPurposeOpen}
//         setValue={setSelectedPurpose}
//         style={styles.dropdown}
//         placeholder="Purpose of Use"
//         zIndex={3000}
//         zIndexInverse={1000}
//       />

//       <DropDownPicker
//         open={shipScaleOpen}
//         value={selectedShipScale}
//         items={shipScaleItems}
//         setOpen={setShipScaleOpen}
//         setValue={setSelectedShipScale}
//         style={styles.dropdown}
//         placeholder="Shipping Scale"
//         zIndex={2000}
//         zIndexInverse={2000}
//       />

//       <DropDownPicker
//         open={productTypeOpen}
//         value={selectedProductType}
//         items={productTypeItems}
//         setOpen={setProductTypeOpen}
//         setValue={setSelectedProductType}
//         style={styles.dropdown}
//         placeholder="Product Type"
//         zIndex={1000}
//         zIndexInverse={3000}
//       />

//       <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//         <Text style={styles.signUpButtonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.guestButton}>
//         <Text style={styles.guestButtonText}>As a Guest</Text>
//       </TouchableOpacity>

//       <View style={styles.loginPrompt}>
//         <Text style={styles.loginText}>You don't have an account yet? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.loginLink}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, FlatList, Image, Alert, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [purposeOpen, setPurposeOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [shipScaleOpen, setShipScaleOpen] = useState(false);
  const [selectedShipScale, setSelectedShipScale] = useState(null);
  const [productTypeOpen, setProductTypeOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);

  const [purposeItems] = useState([
    { label: 'Cá nhân', value: 'Cá nhân' },
    { label: 'Doanh nghiệp', value: 'Doanh nghiệp' }
  ]);

  const [shipScaleItems] = useState([
    { label: 'Không thường xuyên', value: 'Không thường xuyên' },
    { label: 'Dưới 100 đơn/tháng', value: 'Dưới 100 đơn/tháng' },
    { label: 'Trên 100 đơn/tháng', value: 'Trên 100 đơn/tháng' }
  ]);

  const [productTypeItems] = useState([
    { label: 'Thời trang', value: 'Thời trang' },
    { label: 'Thể thao & dã ngoại', value: 'Thể thao & dã ngoại' },
    { label: 'Trang sức và phụ kiện thời trang', value: 'Trang sức và phụ kiện thời trang' },
    { label: 'Mỹ phẩm', value: 'Mỹ phẩm' },
  ]);

  const validateInputs = () => {
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword || !selectedPurpose || !selectedShipScale || !selectedProductType) {
      Alert.alert('Vui lòng điền đầy đủ tất cả thông tin');
      return false;
    }
    if (fullName.length <= 6) {
      Alert.alert('Tên của bạn quá ngắn vui lòng nhập đủ');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Email không đúng định dạng');
      return false;
    }
    if (!/^0\d{9}$/.test(phoneNumber)) {
      Alert.alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu nhập lại không khớp');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (validateInputs()) {
      Alert.alert('Thành công', 'Đăng ký thành công!', );
      navigation.navigate('Login');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <FlatList
      style={styles.container}
      data={[]}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Image
              source={require('../img/backgrlogo.png')} // Replace with your actual logo path
              style={styles.logo}
            />
            <Text style={styles.title}>Create an Account</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Tên đầy đủ"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />


          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Icon name="eye-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          <DropDownPicker
            open={purposeOpen}
            value={selectedPurpose}
            items={purposeItems}
            setOpen={setPurposeOpen}
            setValue={setSelectedPurpose}
            style={styles.dropdown}
            placeholder="Purpose of Use"
            zIndex={3000}
            zIndexInverse={1000}
          />

          <DropDownPicker
            open={shipScaleOpen}
            value={selectedShipScale}
            items={shipScaleItems}
            setOpen={setShipScaleOpen}
            setValue={setSelectedShipScale}
            style={styles.dropdown}
            placeholder="Shipping Scale"
            zIndex={2000}
            zIndexInverse={2000}
          />

          <DropDownPicker
            open={productTypeOpen}
            value={selectedProductType}
            items={productTypeItems}
            setOpen={setProductTypeOpen}
            setValue={setSelectedProductType}
            style={styles.dropdown}
            placeholder="Product Type"
            zIndex={1000}
            zIndexInverse={3000}
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton}>
            <Text style={styles.guestButtonText}>As a Guest</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>You don't have an account yet? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    />
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
  dropdown: {
    marginBottom: 15,
    borderColor: '#E0E0E0',
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
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
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    marginBottom: 50,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;