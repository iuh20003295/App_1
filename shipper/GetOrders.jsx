import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const GetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const employeeId = await AsyncStorage.getItem('employee_id');
      if (employeeId) {
        const formattedDate = deliveryDate.toISOString().split('T')[0];
        const response = await axios.post('https://qship.pro.vn/API_QSHIP/delivery/getOrders', {
          employee_id: employeeId,
          delivery_date: formattedDate,
        });

        if (response.data.success) {
          const filteredOrders = response.data.data.filter(order => 
            order.delivery_date.split(' ')[0] === formattedDate && order.status === 'waiting'
          );
          setOrders(filteredOrders);
        } else {
          Alert.alert('Lỗi', response.data.message);
        }
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Không có đơn hàng tồn tại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [deliveryDate]);

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.post('https://qship.pro.vn/API_QSHIP/delivery/updateOrderStatus', {
        order_id: orderId,
        status: 'pending',
      });

      if (response.data.success) {
        Alert.alert('Thông báo', 'Bạn đã nhận đơn hàng thành công!');
        fetchOrders();
      } else {
        Alert.alert('Lỗi', response.data.message);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật đơn hàng. Vui lòng thử lại sau.');
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Mã đơn hàng: <Text style={styles.orderNumber}>{item.order_number}</Text></Text>
      <Text style={styles.orderText}>Tên đơn hàng: {item.order_name}</Text>
      <Text style={styles.orderText}>Người nhận: {item.recipient_name}</Text>
      <Text style={styles.orderText}>Địa chỉ: {item.shipping_address}</Text>
      <Text style={styles.orderText}>Trạng thái: <Text style={styles[item.status]}>{item.status}</Text></Text>
      <Text style={styles.orderText}>Ngày tạo đơn: {item.delivery_date}</Text>

      {item.status === 'waiting' && (
        <TouchableOpacity 
          style={styles.acceptButton} 
          onPress={() => handleAcceptOrder(item.order_id)}
        >
          <Text style={styles.acceptButtonText}>Nhận đơn</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || deliveryDate;
      setShowDatePicker(false);
      setDeliveryDate(currentDate);
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách chờ lấy hàng</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={showPicker}>
        <Text style={styles.datePickerText}>
          {deliveryDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={deliveryDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>Không có đơn hàng</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.schedule_id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  datePickerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  datePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderNumber: {
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6c757d',
    marginTop: 20,
  },
});
export default GetOrders;