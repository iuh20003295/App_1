// Order.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Adds from './Adds'; // Đảm bảo đường dẫn chính xác

const Order = () => {
  const [senderAddress, setSenderAddress] = useState(null);
  const [receiverAddress, setReceiverAddress] = useState(null);

  const handleAddressChange = (sender, receiver) => {
    setSenderAddress(sender);
    setReceiverAddress(receiver);
  };

  return (
    <View style={styles.container}>
      <Adds onAddressChange={handleAddressChange} />
      <Text style={styles.header}>Địa chỉ gửi:</Text>
      {senderAddress && (
        <Text>
          Tỉnh: {senderAddress.province}, Huyện: {senderAddress.district}, Xã: {senderAddress.ward}
        </Text>
      )}
      <Text style={styles.header}>Địa chỉ nhận:</Text>
      {receiverAddress && (
        <Text>
          Tỉnh: {receiverAddress.province}, Huyện: {receiverAddress.district}, Xã: {receiverAddress.ward}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Order;
