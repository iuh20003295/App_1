// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Adds from './Adds'; 
// import { Picker } from '@react-native-picker/picker';

// const CreateOrder = () => {
//   const [order, setOrder] = useState({
//     user_id: '',
//     order_name: 'PC',
//     order_number: 'PC233',
//     recipient_name: 'Ho Duc Phu',
//     recipient_phone: '0987654321',
//     shipping_address: '308 Hoàng Diệu',
//     weight: '5',
//     height: '2',
//     width: '2',
//     length: '2',
//     shipping_method: 'GHN',
//     shippingCOD_cost: '0', // Đảm bảo là boolean 0 hoặc 1
//     shipping_cost: '', // Sẽ được tính qua API
//     order_note: 'None',
//     tracking_number: 'Tracking74',
//     order_date: '2024-10-15',
//     total_amount: '5',
//     order_classification: 'Hàng nặng dễ vỡ',
//     delivery_area: 'GOVAP',
//     typeOrders: 'Giao hàng vào ngày lễ'
//   });

//   const [locationData, setLocationData] = useState({
//     province_code_giao:'',
//     province_code_nhan:'',
//     district_code_giao:'',
//     district_code_nhan:'',
//     ward_code_giao:'',
//     ward_code_nhan:'',
//   });
  
//   // Fetch user_id từ AsyncStorage khi component mount
//   useEffect(() => {
//     const fetchUserId = async () => {
//       const customerId = await AsyncStorage.getItem('customer_id');
//       if (customerId) {
//         setOrder(prevOrder => ({ ...prevOrder, user_id: customerId }));
//       }
//     };

//     fetchUserId();
//   }, []);

//   // Gọi API tính phí khi các giá trị cần thiết thay đổi
//   useEffect(() => {
//     calculateShippingCost();
//   }, [order.weight, order.shipping_method, order.total_amount, locationData]);

//   const handleInputChange = (field, value) => {
//     setOrder({ ...order, [field]: value });
//   };

//   const handleAddressChange = (addressData) => {
//     console.log("Address Data:", addressData); // Log thông tin địa chỉ nhận được
//     setLocationData(addressData);
//   };

//   const calculateShippingCost = async () => {
//     const { weight, shipping_method, total_amount } = order;
//     const {
//       province_code_giao, province_code_nhan,
//       district_code_giao, district_code_nhan,
//       ward_code_giao, ward_code_nhan
//     } = locationData;
  
//     const requestData = {
//       khoiluong: weight,
//       amount: total_amount,
//       province_code_giao: province_code_giao,
//       province_code_nhan: province_code_nhan,
//       district_code_giao: district_code_giao,
//       district_code_nhan: district_code_nhan,
//       ward_code_giao: ward_code_giao,
//       ward_code_nhan: ward_code_nhan,
//       shipping_method: shipping_method,
//       ShipCOD: order.shippingCOD_cost
//     };
  
//     console.log("Thông tin hiện tại để tính phí:", requestData);
  
//     if (!weight || !total_amount || !shipping_method || !province_code_giao || !province_code_nhan || !district_code_giao || !district_code_nhan || !ward_code_giao || !ward_code_nhan) {
//       return;
//     }
  
//     try {
//       const response = await axios.post('https://qship.pro.vn/API_QSHIP/order/calculating', requestData);
  
//       // Kiểm tra và cập nhật phí vận chuyển
//       if (response.data && response.data.tongGia) {
//         setOrder(prevOrder => ({
//           ...prevOrder,
//           shipping_cost: response.data.tongGia.toString(), // Sử dụng tongGia thay vì shipping_cost
//         }));
//         console.log("Phí vận chuyển đã tính toán:", response.data.tongGia);
//       } else {
//         Alert.alert('Lỗi', 'Không thể tính phí vận chuyển');
//         console.error('Phản hồi không hợp lệ từ API:', response.data);
//       }
//     } catch (error) {
//       console.error('Lỗi tính phí vận chuyển:', error.response ? error.response.data : error.message);
//       Alert.alert('Lỗi', 'Không thể tính phí vận chuyển');
//     }
//   };
  
//   const handleSubmit = async () => {
//     const requiredFields = [
//       'user_id', 'order_name', 'order_number', 'recipient_name', 'recipient_phone',
//       'shipping_address', 'weight', 'height', 'width', 'length', 'shipping_method', 'shipping_cost',
//       'order_note', 'tracking_number', 'order_date', 'total_amount'
//     ];

//     // Kiểm tra các trường bắt buộc
//     for (let field of requiredFields) {
//       if (!order[field]) {
//         Alert.alert('Thông báo', `Vui lòng nhập trường bắt buộc: ${field.replace(/_/g, ' ')}`);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post('https://qship.pro.vn/API_QSHIP/order/add', order, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 201) {
//         Alert.alert('Thành công', 'Tạo đơn hàng thành công!');
//       } else {
//         Alert.alert('Lỗi', response.data.message || 'Tạo đơn hàng thất bại');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error('Lỗi từ máy chủ:', error.response.data);
//         Alert.alert('Lỗi', error.response.data.message || 'Có lỗi xảy ra khi tạo đơn hàng');
//       } else if (error.request) {
//         console.error('Không có phản hồi từ máy chủ:', error.request);
//         Alert.alert('Lỗi', 'Không có phản hồi từ máy chủ');
//       } else {
//         console.error('Lỗi:', error.message);
//         Alert.alert('Lỗi', 'Có lỗi xảy ra: ' + error.message);
//       }
//     }
//   };
  
//   return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Tạo Đơn Hàng Mới</Text>

//         <Adds onChange={handleAddressChange} />

//         {/* Các trường nhập khác */}
//       {Object.keys(order).map((key, index) => (
//         key !== 'user_id' && key !== 'shipping_cost' && ( // Không render trường user_id và shipping_cost ở đây
//         <View key={index} style={styles.inputContainer}>
//           <Text style={styles.label}>{key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Text>
//           {key === 'shipping_method' ? (
//             <Picker
//               selectedValue={order.shipping_method}
//               onValueChange={(itemValue) => handleInputChange('shipping_method', itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Chọn phương thức giao hàng" value="" />
//               <Picker.Item label="GHN" value="GHN" />
//               <Picker.Item label="GHTK" value="GHTK" />
//             </Picker>
//           ) : (
//             <TextInput
//               style={styles.input}
//               value={order[key]}
//               onChangeText={(text) => handleInputChange(key, text)}
//               placeholder={`Nhập ${key.replace(/_/g, ' ')}`}
//               keyboardType={['weight', 'height', 'width', 'length', 'shippingCOD_cost', 'total_amount'].includes(key) ? 'numeric' : 'default'}
//             />
//           )}
//         </View>
//           )
//         ))}

//         {/* Hiển thị phí vận chuyển ở dưới cùng */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Tổng tiền</Text>
//           <Text style={styles.input}>{order.shipping_cost || 'Đang tính toán...'}</Text>
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button title="Tạo Đơn Hàng" onPress={handleSubmit} color="#4CAF50" />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Adds from './Adds'; 
import { Picker } from '@react-native-picker/picker';

const CreateOrder = () => {
  const [order, setOrder] = useState({
    user_id: '',
    order_name: 'PC',
    order_number: 'PC233',
    recipient_name: 'Ho Duc Phu',
    recipient_phone: '0987654321',
    shipping_address: '308 Hoàng Diệu',
    weight: '5',
    height: '2',
    width: '2',
    length: '2',
    shipping_method: 'GHN',
    shippingCOD_cost: '0',
    shipping_cost: '',
    order_note: 'None',
    tracking_number: 'Tracking74',
    order_date: '2024-10-15',
    total_amount: '5',
    order_classification: 'Hàng nặng dễ vỡ',
    delivery_area: 'GOVAP',
    typeOrders: 'Giao hàng vào ngày lễ'
  });

  const [locationData, setLocationData] = useState({
    province_code_giao: '',
    province_code_nhan: '',
    district_code_giao: '',
    district_code_nhan: '',
    ward_code_giao: '',
    ward_code_nhan: '',
  });

  // Fetch user_id from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      const customerId = await AsyncStorage.getItem('customer_id');
      if (customerId) {
        setOrder(prevOrder => ({ ...prevOrder, user_id: customerId }));
      }
    };

    fetchUserId();
  }, []);

  // Call the API to calculate shipping cost when necessary values change
  useEffect(() => {
    calculateShippingCost();
  }, [order.weight, order.shipping_method, order.total_amount, locationData]);

  const handleInputChange = (field, value) => {
    setOrder({ ...order, [field]: value });
  };

  const handleAddressChange = (addressData) => {
    console.log("Address Data:", addressData);
    setLocationData(addressData);
  };

  const calculateShippingCost = async () => {
    const { weight, shipping_method, total_amount } = order;
    const { 
      province_code_giao, province_code_nhan, 
      district_code_giao, district_code_nhan, 
      ward_code_giao, ward_code_nhan 
    } = locationData;

    const requestData = {
      khoiluong: weight,
      amount: total_amount,
      province_code_giao: province_code_giao,
      province_code_nhan: province_code_nhan,
      district_code_giao: district_code_giao,
      district_code_nhan: district_code_nhan,
      ward_code_giao: ward_code_giao,
      ward_code_nhan: ward_code_nhan,
      shipping_method: shipping_method,
      ShipCOD: order.shippingCOD_cost
    };

    console.log("Thông tin hiện tại để tính phí:", requestData);

    if (!weight || !total_amount || !shipping_method || 
        !province_code_giao || !province_code_nhan || 
        !district_code_giao || !district_code_nhan || 
        !ward_code_giao || !ward_code_nhan) {
      return;
    }

    try {
      const response = await axios.post('https://qship.pro.vn/API_QSHIP/order/calculating', requestData);

      if (response.data && response.data.tongGia) {
        setOrder(prevOrder => ({
          ...prevOrder,
          shipping_cost: response.data.tongGia.toString(),
        }));
        console.log("Phí vận chuyển đã tính toán:", response.data.tongGia);
      } else {
        Alert.alert('Lỗi', 'Không thể tính phí vận chuyển');
        console.error('Phản hồi không hợp lệ từ API:', response.data);
      }
    } catch (error) {
      console.error('Lỗi tính phí vận chuyển:', error.response ? error.response.data : error.message);
      Alert.alert('Lỗi', 'Không thể tính phí vận chuyển');
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'user_id', 'order_name', 'order_number', 'recipient_name', 'recipient_phone',
      'shipping_address', 'weight', 'height', 'width', 'length', 'shipping_method', 'shipping_cost',
      'order_note', 'tracking_number', 'order_date', 'total_amount'
    ];

    for (let field of requiredFields) {
      if (!order[field]) {
        Alert.alert('Thông báo', `Vui lòng nhập trường bắt buộc: ${field.replace(/_/g, ' ')}`);
        return;
      }
    }

    try {
      const response = await axios.post('https://qship.pro.vn/API_QSHIP/order/add', order, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Thành công', 'Tạo đơn hàng thành công!');
      } else {
        Alert.alert('Lỗi', response.data.message || 'Tạo đơn hàng thất bại');
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

        <Adds onChange={handleAddressChange} />

        {/* Các trường nhập khác */}
        {Object.keys(order).map((key, index) => (
          key !== 'user_id' && key !== 'shipping_cost' && ( // Không render trường user_id và shipping_cost ở đây
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Text>
            {key === 'shipping_method' ? (
              <Picker
                selectedValue={order.shipping_method}
                onValueChange={(itemValue) => handleInputChange('shipping_method', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Chọn phương thức giao hàng" value="" />
                <Picker.Item label="GHN" value="GHN" />
                <Picker.Item label="GHTK" value="GHTK" />
              </Picker>
            ) : (
              <TextInput
                style={styles.input}
                value={order[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                placeholder={`Nhập ${key.replace(/_/g, ' ')}`}
                keyboardType={['weight', 'height', 'width', 'length', 'shippingCOD_cost', 'total_amount'].includes(key) ? 'numeric' : 'default'}
              />
            )}
          </View>
          )
        ))}

        {/* Hiển thị phí vận chuyển ở dưới cùng */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tổng tiền</Text>
          <Text style={styles.input}>{order.shipping_cost || 'Đang tính toán...'}</Text>
        </View>

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
