import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFCC00" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={require('../img/qship-logo.png')} style={styles.logo} />
      </View>
      
      <Image source={require('../img/background-signup.png')} style={styles.backgroundImage} />
      
      <View style={styles.content}>
        <Text style={styles.greeting}>Xin chào, Khách</Text>
        <Text style={styles.subTitle}>Theo dõi lô hàng QSHIP Express của bạn</Text>
        
        <View style={styles.trackingBox}>
          <Icon name="qr-code-scanner" size={24} color="#CC0000" style={styles.qrIcon} />
          <TextInput 
            style={styles.trackingInput} 
            placeholder="Nhập số theo dõi có 10 chữ số"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.trackingButton}>
            <Icon name="arrow-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.loginSection}>
          <Text style={styles.startText}>Hãy bắt đầu</Text>
          <View style={styles.loginButtons}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginButton}>Đăng nhập</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.loginButton}>Đăng ký</Text></TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="description" size={24} color="#FFCC00" />
          <Text style={styles.menuText}>Lấy báo giá</Text>
          <Icon name="chevron-right" size={24} color="#FFCC00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="local-shipping" size={24} color="#FFCC00" />
          <Text style={styles.menuText}>Tạo Lô Hàng</Text>
          <View style={styles.newBadge}><Text style={styles.newText}>Mới</Text></View>
          <Icon name="chevron-right" size={24} color="#FFCC00" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="phone" size={24} color="#FFCC00" />
          <Text style={styles.menuText}>Gọi Để Gửi Hàng</Text>
          <Icon name="headset-mic" size={24} color="#FFCC00" style={styles.supportIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="home" size={24} color="#FFCC00" />
          <Text style={styles.footerText}>Trang Chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="assignment-return" size={24} color="#FFCC00" />
          <Text style={styles.footerText}>Hàng nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="delivery-dining" size={24} color="#FFCC00" />
          <Text style={styles.footerText}>Hàng gửi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="place" size={24} color="#FFCC00" />
          <Text style={styles.footerText}>Điểm Dịch Vụ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  greeting: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 5,
  },
  trackingBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  qrIcon: {
    padding: 10,
  },
  trackingInput: {
    flex: 1,
    padding: 10,
  },
  trackingButton: {
    backgroundColor: '#CC0000',
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  loginSection: {
    marginTop: 20,
  },
  startText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loginButton: {
    color: '#FFCC00',
    marginLeft: 20,
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  menuText: {
    color: '#FFF',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  newBadge: {
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  newText: {
    color: '#000',
    fontSize: 12,
  },
  supportIcon: {
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    padding: 10,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#FFCC00',
    fontSize: 12,
  },
});

export default HomePage;