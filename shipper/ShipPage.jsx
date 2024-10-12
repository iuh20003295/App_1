import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  StatusBar,
  Dimensions,
  Animated,
  ScrollView,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ShipPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState(''); // Thêm state để lưu tên người dùng
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;
  useEffect(() => {
    // Lấy username từ AsyncStorage khi trang được mở
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername); // Cập nhật state với tên người dùng
        }
      } catch (error) {
        console.error('Lỗi khi lấy username:', error);
      }
    };
    fetchUsername();
  }, []);
  // Deliveries state and filter state
  const [deliveries, setDeliveries] = useState([
    { id: '1', address: '123 Nguyễn Văn A, Q.1, TP.HCM', status: 'pending' },
    { id: '2', address: '456 Lê Lợi, Q.5, TP.HCM', status: 'in-progress' },
    { id: '3', address: '789 Trần Hưng Đạo, Q.3, TP.HCM', status: 'completed' },
    { id: '4', address: '33 Hoàng Diệu, Q.Gò Vấp, TP.HCM', status: 'in-progress' },
    { id: '5', address: '55 Võ Thị Sáu, Q.Gò Vấp, TP.HCM', status: 'pending' },
    { id: '6', address: '126 Nguyễn Văn Lượng, Q.Gò Vấp, TP.HCM', status: 'in-progress' },
    { id: '7', address: '96 Dương Quảng Hàm, Q.Gò Vấp, TP.HCM', status: 'in-progress' },
    { id: '8', address: '16 Nguyễn Oanh, Q.Gò Vấp, TP.HCM', status: 'pending' },
    { id: '9', address: '43 Lê Đức Thọ, Q.Gò Vấp, TP.HCM', status: 'pending' },
    { id: '10', address: '33 Nguyễn Tri Phương, Q.Gò Vấp, TP.HCM', status: 'completed' },
    { id: '11', address: '16 Nguyễn Văn Nghi, Q.Gò Vấp, TP.HCM', status: 'in-progress' },
  ]);

  // State to track current filter
  const [filterStatus, setFilterStatus] = useState('in-progress');

  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

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
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);
   // Xử lý đăng xuất
   const handleLogout = async () => {
    try {
      // Xóa token và username khỏi AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');

      // Điều hướng về màn hình đăng nhập
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Đảm bảo người dùng không quay lại ShipPage
      });
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  // Switch-based icon rendering
  const renderDeliveryItem = ({ item }) => {
    let iconName;
    let iconColor;

    switch (item.status) {
      case 'pending':
        iconName = 'hourglass-empty'; // Icon cho đơn hàng đang chờ
        iconColor = 'gray';
        break;
      case 'in-progress':
        iconName = 'local-shipping'; // Icon cho đơn hàng đang giao
        iconColor = 'orange';
        break;
      case 'completed':
        iconName = 'check-circle'; // Icon cho đơn hàng hoàn thành
        iconColor = 'green';
        break;
      default:
        iconName = 'local-shipping';
        iconColor = 'orange';
        break;
    }

    return (
      <TouchableOpacity 
        style={[styles.deliveryItem, 
          item.status === 'completed' ? styles.completedDelivery : null
        ]}
        onPress={() => navigation.navigate('DeliveryDetails', { deliveryId: item.id })}
      >
        <Icon 
          name={iconName}
          size={24}
          color={iconColor}
        />
        <Text style={styles.deliveryText}>{item.address}</Text>
        <Icon name="chevron-right" size={24} color="#000" />
      </TouchableOpacity>
    );
  };

  const filteredDeliveries = deliveries
    .filter(item => item.status === filterStatus) // Filter by status
    .filter(item => item.address.toLowerCase().includes(searchQuery.toLowerCase())); // Filter by search query


  // Tính toán số lượng đơn hàng theo trạng thái
  const pendingCount = deliveries.filter(item => item.status === 'pending').length;
  const inProgressCount = deliveries.filter(item => item.status === 'in-progress').length;
  const completedCount = deliveries.filter(item => item.status === 'completed').length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFCC00" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý Giao Hàng</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            {/* Hiển thị tên người dùng trong modal */}
            <Text style={styles.usernameText}>Xin chào, {username}!</Text>
            
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('ProfileShipper');
            }}>
              <Text style={styles.modalText}>Hồ sơ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('Directions');
            }}>
              <Text style={styles.modalText}>Dò đường</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('OrderShip');
            }}>
              <Text style={styles.modalText}>Lịch sử đơn hàng</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('Support');
            }}>
              <Text style={styles.modalText}>Hỗ trợ</Text>
            </TouchableOpacity>
            {/* Nút đăng xuất */}
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalText}>Đăng xuất</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
      <ScrollView style={styles.content}>
        <View style={styles.searchBox}>
          <Icon name="search" size={24} color="#CC0000" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm đơn hàng"
            placeholderTextColor="#999"
            onChangeText={text => setSearchQuery(text)} // Update search query
            value={searchQuery}
          />
        </View>

        {/* Buttons to change delivery status filter */}
        <View style={styles.filterButtons}>
          <TouchableOpacity 
            style={[styles.filterButton, filterStatus === 'pending' && styles.activeFilter]} 
            onPress={() => setFilterStatus('pending')}
          >
            <Text style={styles.filterText}>Đang chờ ({pendingCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterStatus === 'in-progress' && styles.activeFilter]} 
            onPress={() => setFilterStatus('in-progress')}
          >
            <Text style={styles.filterText}>Đang giao ({inProgressCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterStatus === 'completed' && styles.activeFilter]} 
            onPress={() => setFilterStatus('completed')}
          >
            <Text style={styles.filterText}>Hoàn thành ({completedCount})</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Danh sách đơn hàng</Text>
        <FlatList
          data={filteredDeliveries} // Filtered data based on status
          renderItem={renderDeliveryItem}
          keyExtractor={item => item.id}
          style={styles.deliveryList}
        />

        <TouchableOpacity style={styles.scanButton}>
          <Icon name="qr-code-scanner" size={24} color="#FFF" />
          <Text style={styles.scanButtonText}>Quét mã QR đơn hàng</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('ShipPage')}>
          <Icon name="home" size={24} color="orange" />
          <Text style={styles.footerText}>Trang Chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('OrderShip')}>
          <Icon name="assignment" size={24} color="orange" />
          <Text style={styles.footerText}>Đơn Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('ProfileShipper')}>
          <Icon name="person" size={24} color="orange" />
          <Text style={styles.footerText}>Tài Khoản</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFCC00',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CC0000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deliveryList: {
    marginBottom: 20,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  completedDelivery: {
    opacity: 0.6,
  },
  deliveryText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC0000',
    padding: 15,
    borderRadius: 5,
  },
  scanButtonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: '#FFCC00',
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ShipPage;

