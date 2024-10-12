import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateOrder = () => {
  const [order, setOrder] = useState({
    order_id: '',
    user_id: '', // user_id sẽ được lấy từ AsyncStorage
    order_name: '',
    order_number: '',
    recipient_name: '',
    recipient_phone: '',
    shipping_address: '',
    weight: '',
    height: '',
    width: '',
    length: '',
    shipping_method: '', // Chọn từ Picker
    shipping_cost: '',
    order_note: '',
    tracking_number: '',
    order_date: '',
    typeOrders: '', // Chọn từ Picker
    shippingCOD_cost: '',
    total_amount: '',
    order_classification: '',
    delivery_area: '',
  });

  // Fetch user_id từ AsyncStorage khi component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const customerId = await AsyncStorage.getItem('customer_id');
      if (customerId) {
        setOrder(prevOrder => ({ ...prevOrder, user_id: customerId }));
      }
    };

    fetchUserId();
  }, []);

  const handleInputChange = (field, value) => {
    setOrder({ ...order, [field]: value });
  };

  const handleSubmit = async () => {
    // Validation cho các trường bắt buộc
    const requiredFields = [
      'order_id', 'user_id', 'order_name', 'order_number', 'recipient_name', 'recipient_phone',
      'shipping_address', 'weight', 'height', 'width', 'length', 'shipping_method', 'shipping_cost',
      'order_note', 'tracking_number', 'order_date', 'typeOrders', 'shippingCOD_cost', 'total_amount',
      'order_classification', 'delivery_area'
    ];

    for (let field of requiredFields) {
      if (!order[field]) {
        Alert.alert('Thông báo', `Vui lòng nhập trường bắt buộc: ${field.replace(/_/g, ' ')}`);
        return;
      }
    }

    try {
      console.log('Dữ liệu gửi đi:', order);
      const response = await axios.post('https://qship.pro.vn/API_QSHIP/order/add', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Thành công', 'Tạo đơn hàng thành công!');
        console.log('Phản hồi từ máy chủ:', response.data);
      } else {
        Alert.alert('Lỗi', response.data.message || 'Tạo đơn hàng thất bại');
        console.error('Error:', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Lỗi từ máy chủ:', error.response.data);
        Alert.alert('Lỗi', error.response.data.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      } else if (error.request) {
        console.error('Không có phản hồi từ máy chủ:', error.request);
        Alert.alert('Lỗi', 'Không có phản hồi từ máy chủ');
      } else {
        console.error('Lỗi:', error.message);
        Alert.alert('Lỗi', 'Có lỗi xảy ra: ' + error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Tạo Đơn Hàng Mới</Text>
        {/* Render input fields for all JSON fields */}
        {Object.keys(order).map((key, index) => (
          key !== 'user_id' && ( // Không render trường user_id
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Text>
            {key === 'shipping_method' ? ( // Render Picker cho shipping_method
              <Picker
                selectedValue={order.shipping_method}
                onValueChange={(itemValue) => handleInputChange('shipping_method', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Chọn phương thức giao hàng" value="" />
                <Picker.Item label="GHN" value="GHN" />
                <Picker.Item label="GHTK" value="GHTK" />
              </Picker>
            ) : key === 'typeOrders' ? ( // Render Picker cho typeOrders
              <Picker
                selectedValue={order.typeOrders}
                onValueChange={(itemValue) => handleInputChange('typeOrders', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Chọn loại đơn hàng" value="" />
                <Picker.Item label="Giao hàng vào ngày thường" value="Giao hàng vào ngày thường" />
                <Picker.Item label="Giao hàng trong giờ hành chính" value="Giao hàng trong giờ hành chính" />
                <Picker.Item label="Giao hàng vào ngày lễ" value="Giao hàng vào ngày lễ" />
              </Picker>
            ) : (
              <TextInput
                style={styles.input}
                value={order[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                placeholder={`Nhập ${key.replace(/_/g, ' ')}`}
                keyboardType={['weight', 'height', 'width', 'length', 'shipping_cost', 'total_amount', 'shippingCOD_cost'].includes(key) ? 'numeric' : 'default'}
              />
            )}
          </View>
          )
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Tạo Đơn Hàng" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // Thêm khoảng cách dưới cho ScrollView
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    paddingTop: 40, // Thêm padding phía trên
  },
  inputContainer: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    margin: 10,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  buttonContainer: {
    marginTop: 20, // Thêm khoảng cách trên cho nút
  },
});

export default CreateOrder;
