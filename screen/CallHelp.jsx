import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming Ionicons are used
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // For the bottom navigation icons

const CallHelp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gọi Để Gửi Hàng</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Vận chuyển chung</Text>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            <FontAwesome5 name="phone-alt" size={20} color="#fff" />
            <Text style={styles.infoText}>  1800 1530</Text>
          </View>

          <View style={styles.row}>
            <FontAwesome5 name="clock" size={20} color="#fff" />
            <View style={styles.textGroup}>
              <Text style={styles.infoText}>T2 - T6: 07:30-20:00</Text>
              <Text style={styles.infoText}>T7: 08:00-17:00</Text>
              <Text style={styles.infoText}>CN: Đóng</Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <FontAwesome5 name="comments" size={20} color="#fff" />
          <Text style={styles.liveChat}>Live Chat (Ngoại tuyến)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0FFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  textGroup: {
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#555',
    marginVertical: 20,
  },
  liveChat: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 15,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  navTextActive: {
    fontSize: 12,
    color: '#fcd12a',
    marginTop: 5,
  },
});

export default CallHelp;
