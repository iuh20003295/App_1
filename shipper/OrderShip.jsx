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

const OrderShip = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState(new Date()); // Ngày mặc định
  const [showDatePicker, setShowDatePicker] = useState(false); // Trạng thái hiển thị date picker

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const employeeId = await AsyncStorage.getItem('employee_id');
        if (employeeId) {
          const formattedDate = deliveryDate.toISOString().split('T')[0]; // Định dạng ngày thành YYYY-MM-DD
          const response = await axios.post('https://qship.pro.vn/API_QSHIP/delivery/getOrders', {
            employee_id: employeeId,
            delivery_date: formattedDate,
          });

          if (response.data.success) {
            // Lọc đơn hàng chỉ lấy phần ngày 'YYYY-MM-DD' từ 'delivery_date' và trạng thái là 'pending'
            const filteredOrders = response.data.data.filter(order => 
              order.delivery_date.split(' ')[0] === formattedDate && order.status === 'pending' // So sánh phần ngày của 'delivery_date' và trạng thái
            );
            setOrders(filteredOrders); // Cập nhật danh sách đơn hàng
          } else {
            Alert.alert('Lỗi', response.data.message);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [deliveryDate]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Mã đơn hàng: <Text style={styles.orderNumber}>{item.order_number}</Text></Text>
      <Text style={styles.orderText}>Tên đơn hàng: {item.order_name}</Text>
      <Text style={styles.orderText}>Người nhận: {item.recipient_name}</Text>
      <Text style={styles.orderText}>Địa chỉ: {item.shipping_address}</Text>
      <Text style={styles.orderText}>Trạng thái: <Text style={styles[item.status]}>{item.status}</Text></Text>
      <Text style={styles.orderText}>Ngày giao: {item.delivery_date}</Text>
    </View>
  );

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') { // Kiểm tra nếu người dùng chọn ngày
      const currentDate = selectedDate || deliveryDate;
      setShowDatePicker(false);
      setDeliveryDate(currentDate); // Cập nhật ngày đã chọn
    } else {
      setShowDatePicker(false); // Đóng DateTimePicker nếu không chọn
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách đơn hàng</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={showPicker}>
        <Text style={styles.datePickerText}>
          {deliveryDate.toLocaleDateString()} {/* Hiển thị ngày hiện tại */}
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
        <Text style={styles.noOrdersText}>Không có đơn hàng</Text> // Hiển thị khi không có đơn hàng
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
    backgroundColor: '#f9f9f9',
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  orderItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  orderNumber: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  pending: {
    color: 'orange',
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
    fontWeight: 'bold',
  },
  canceled: {
    color: 'red',
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderShip;
