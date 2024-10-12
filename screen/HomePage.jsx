// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   Keyboard,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   StyleSheet,
//   SafeAreaView,
//   Modal,
//   StatusBar,
//   Dimensions,
//   Animated,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const { width, height } = Dimensions.get('window');
// const dismissKeyboard = () => {
//   Keyboard.dismiss();
// };
// const HomePage = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();
//   const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
//   const toggleModal = () => {
//     if (modalVisible) {
//       Animated.timing(slideAnim, {
//         toValue: -width * 0.75,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setModalVisible(false));
//     } else {
//       setModalVisible(true);
//     }
//   };
//   useEffect(() => {
//     if (modalVisible) {
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [modalVisible]);
//   return (
//     <TouchableWithoutFeedback onPress={dismissKeyboard}>
//       <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor="#FFCC00" barStyle="dark-content" />
//         <View style={styles.header}>
//           <TouchableOpacity onPress={toggleModal}>
//             <Icon name="menu" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//         <Modal
//           animationType="none"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={toggleModal}
//         >
//           <View style={styles.modalBackground}>
//             <Animated.View style={[
//               styles.modalContent,
//               {
//                 transform: [{ translateX: slideAnim }],
//               },
//             ]}>
//               <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
//                 <Icon name="close" size={24} color="#000" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton}
//                 onPress={() => {
//                   toggleModal();
//                   navigation.navigate('Login');
//                 }}
//               >
//                 <Text style={styles.modalText}>Đăng nhập</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton} onPress={() => {
//                 toggleModal();
//                 navigation.navigate('Register');
//               }}>
//                 <Text style={styles.modalText}>Đăng ký</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton} onPress={() => {
//                 toggleModal();
//                 navigation.navigate('PriceQuote');
//               }}>
//                 <Text style={styles.modalText}>Bảng giá</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton} onPress={() => {
//                 toggleModal();
//                 navigation.navigate('Follow');
//               }}>
//                 <Text style={styles.modalText}>Theo dõi</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton} onPress={() => {
//                 toggleModal();
//                 navigation.navigate('Law');
//               }}>
//                 <Text style={styles.modalText}>Pháp lý</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton} onPress={() => {
//                 toggleModal();
//                 navigation.navigate('Location');
//               }}>
//                 <Text style={styles.modalText}>Tìm điểm dịch vụ</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </View>
//         </Modal>
//         <Image source={require('../img/backgrlogo.png')} style={styles.backgroundImage} />
//         <View style={styles.content}>
//           <ScrollView>
//             <Text style={styles.greeting}>Xin chào, Khách</Text>
//             <Text style={styles.subTitle}>Theo dõi lô hàng QSHIP Express của bạn</Text>

//             <View style={styles.trackingBox}>
//               <Icon name="qr-code-scanner" size={24} color="#CC0000" style={styles.qrIcon} />
//               <TextInput
//                 style={styles.trackingInput}
//                 placeholder="Nhập số theo dõi có 10 chữ số"
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity style={styles.trackingButton}>
//                 <Icon name="arrow-forward" size={24} color="#FFF" />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.loginSection}>
//               <Text style={styles.startText}>Hãy bắt đầu</Text>
//               <View style={styles.loginButtons}>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                   <Text style={styles.loginButton}>Đăng nhập</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                   <Text style={styles.loginButton}>Đăng ký</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
//                   <Text style={styles.loginButton}>Đăng xuất</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PriceQuote')}>
//               <Icon name="description" size={24} color="orange" />
//               <Text style={styles.menuText}>Lấy báo giá</Text>
//               <Icon name="chevron-right" size={24} color="orange" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CreateOrder')}>
//               <Icon name="create" size={24} color="orange" />
//               <Text style={styles.menuText}>Tạo đơn Hàng</Text>
//               <View style={styles.newBadge}><Text style={styles.newText}>Mới</Text></View>
//               <Icon name="chevron-right" size={24} color="orange" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CallHelp')}>
//               <Icon name="phone" size={24} color="orange" />
//               <Text style={styles.menuText}>Gọi Để Gửi Hàng</Text>
//               <Icon name="headset-mic" size={24} color="orange" style={styles.supportIcon} />
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//         <View style={styles.footer}>
//           <TouchableOpacity style={styles.footerItem}>
//             <Icon name="home" size={24} color="orange" />
//             <Text style={styles.footerText}>Trang Chủ</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem}>
//             <Icon name="assignment-return" size={24} color="orange" />
//             <Text style={styles.footerText}>Hàng nhận</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem}>
//             <Icon name="local-shipping" size={24} color="orange" />
//             <Text style={styles.footerText}>Hàng gửi</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Location')}>
//             <Icon name="place" size={24} color="orange" />
//             <Text style={styles.footerText}>Điểm Dịch Vụ</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Modal,
  StatusBar,
  Dimensions,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('customer_name'); // Lấy username từ AsyncStorage
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  // const handleLogout = async () => {
  //   await AsyncStorage.removeItem('customer_name'); // Xóa username khi đăng xuất
  //   setUsername('');
  //   Alert.alert('Đăng xuất thành công');
  // };
  const handleLogout = async () => {
    try {
      // Xóa token và username khỏi AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('customer_name');

      // Điều hướng về màn hình đăng nhập
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Đảm bảo người dùng không quay lại ShipPage
      });
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFCC00" barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={[
              styles.modalContent,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
              {username ? ( // Nếu đã đăng nhập, hiển thị tên người dùng
                <>
                  <Text style={styles.modalText}>Xin chào, {username}!</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                    <Text style={styles.modalText}>Đăng xuất</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.modalButton} onPress={() => {
                    toggleModal();
                    navigation.navigate('Login');
                  }}>
                    <Text style={styles.modalText}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={() => {
                    toggleModal();
                    navigation.navigate('Register');
                  }}>
                    <Text style={styles.modalText}>Đăng ký</Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                toggleModal();
                navigation.navigate('PriceQuote');
              }}>
                <Text style={styles.modalText}>Bảng giá</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                toggleModal();
                navigation.navigate('Follow');
              }}>
                <Text style={styles.modalText}>Theo dõi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                toggleModal();
                navigation.navigate('Law');
              }}>
                <Text style={styles.modalText}>Pháp lý</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                toggleModal();
                navigation.navigate('Location');
              }}>
                <Text style={styles.modalText}>Tìm điểm dịch vụ</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
        <Image source={require('../img/backgrlogo.png')} style={styles.backgroundImage} />
        <View style={styles.content}>
          <ScrollView>
            <Text style={styles.greeting}>Xin chào, {username || 'Khách'}</Text>
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
                {!username && ( // Chỉ hiển thị nút đăng nhập và đăng ký nếu chưa đăng nhập
                  <>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.loginButton}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={styles.loginButton}>Đăng ký</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PriceQuote')}>
              <Icon name="description" size={24} color="orange" />
              <Text style={styles.menuText}>Lấy báo giá</Text>
              <Icon name="chevron-right" size={24} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CreateOrder')}>
              <Icon name="create" size={24} color="orange" />
              <Text style={styles.menuText}>Tạo đơn Hàng</Text>
              <View style={styles.newBadge}><Text style={styles.newText}>Mới</Text></View>
              <Icon name="chevron-right" size={24} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CallHelp')}>
              <Icon name="phone" size={24} color="orange" />
              <Text style={styles.menuText}>Gọi Để Gửi Hàng</Text>
              <Icon name="headset-mic" size={24} color="orange" style={styles.supportIcon} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Icon name="home" size={24} color="orange" />
            <Text style={styles.footerText}>Trang Chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Icon name="assignment-return" size={24} color="orange" />
            <Text style={styles.footerText}>Hàng nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Icon name="local-shipping" size={24} color="orange" />
            <Text style={styles.footerText}>Hàng gửi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Location')}>
            <Icon name="place" size={24} color="orange" />
            <Text style={styles.footerText}>Điểm Dịch Vụ</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
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
    marginTop: 0,
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
    color: 'orange',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    top: 70,
    bottom: 30,
    width: width * 0.75,
    height: height,
    backgroundColor: 'grey',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalButton: {
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  footerTextModal: {
    width: '100%',
    height: 30,
    backgroundColor: 'yellow',
  },
});
export default HomePage;