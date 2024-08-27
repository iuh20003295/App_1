import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
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
    if (!username || !email || !phoneNumber || !password || !confirmPassword || !selectedPurpose || !selectedShipScale || !selectedProductType) {
      Alert.alert('Vui lòng điền đầy đủ tất cả thông tin');
      return false;
    }
    if (username.length <= 6) {
      Alert.alert('Tên đăng nhập phải lớn hơn 6 ký tự');
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
      navigation.goBack();
    }
  };

  return (
    <ImageBackground style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>ĐĂNG KÝ</Text>
        <TextInput 
          placeholder="Tên đăng nhập" 
          style={styles.input} 
          value={username}
          onChangeText={setUsername}
        />
        <TextInput 
          placeholder="Email" 
          style={styles.input} 
          keyboardType="email-address" 
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          placeholder="Số điện thoại" 
          style={styles.input} 
          keyboardType="phone-pad" 
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput 
          placeholder="Mật khẩu" 
          style={styles.input} 
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput 
          placeholder="Nhập lại mật khẩu" 
          style={styles.input} 
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <DropDownPicker
          open={purposeOpen}
          value={selectedPurpose}
          items={purposeItems}
          setOpen={setPurposeOpen}
          setValue={setSelectedPurpose}
          style={styles.dropdown}
          placeholder="Mục đích sử dụng"
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
          placeholder="Quy mô vận chuyển"
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
          placeholder="Ngành hàng"
          zIndex={1000}
          zIndexInverse={3000}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


//Các styles giữ nguyên như cũ
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#E0FFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 60,
    textAlign: 'center',
    color: '#6495ED',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  dropdown: {
    marginBottom: 15,
    borderColor: '#CCC',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
export default RegisterScreen;