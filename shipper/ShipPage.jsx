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

const { width, height } = Dimensions.get('window');

const ShipPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current;

  const [deliveries, setDeliveries] = useState([
    { id: '1', address: '123 Nguyễn Văn A, Q.1, TP.HCM', status: 'pending' },
    { id: '2', address: '456 Lê Lợi, Q.5, TP.HCM', status: 'in-progress' },
    { id: '3', address: '789 Trần Hưng Đạo, Q.3, TP.HCM', status: 'completed' },
  ]);

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

  const renderDeliveryItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.deliveryItem, 
        item.status === 'completed' ? styles.completedDelivery : null
      ]}
      onPress={() => navigation.navigate('DeliveryDetails', { deliveryId: item.id })}
    >
      <Icon 
        name={item.status === 'completed' ? 'check-circle' : 'local-shipping'} 
        size={24} 
        color={item.status === 'completed' ? 'green' : 'orange'} 
      />
      <Text style={styles.deliveryText}>{item.address}</Text>
      <Icon name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );

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
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('Profile');
            }}>
              <Text style={styles.modalText}>Hồ sơ Shipper</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('HistoryShip');
            }}>
              <Text style={styles.modalText}>Lịch sử giao hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
              toggleModal();
              navigation.navigate('Support');
            }}>
              <Text style={styles.modalText}>Hỗ trợ</Text>
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
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Đơn hàng chờ</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Đang giao</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Hoàn thành</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Đơn hàng cần giao</Text>
        <FlatList
          data={deliveries}
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
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="home" size={24} color="orange" />
          <Text style={styles.footerText}>Trang Chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="assignment" size={24} color="orange" />
          <Text style={styles.footerText}>Đơn Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
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
});

export default ShipPage;