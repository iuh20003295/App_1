import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import biểu tượng

const ProfileShipper = () => {
  const [website, setWebsite] = useState('www.Arnoldy.com');
  const [email, setEmail] = useState('Hello@adalahreza.com');
  const [phone, setPhone] = useState('+84 911 992 103');
  const [joinedDate, setJoinedDate] = useState('26 March, 2023');
  const [isEditing, setIsEditing] = useState(false); // Trạng thái cho phép chỉnh sửa

  const handleSave = () => {
    // Thêm logic để lưu dữ liệu nếu cần, có thể lưu vào API hoặc local storage
    console.log('Thông tin đã được lưu:', { website, email, phone, joinedDate });
    setIsEditing(false); // Đặt trạng thái chỉnh sửa về false sau khi lưu
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../img/Emoji/emo2.png')} // Thay thế bằng URL ảnh của bạn
          style={styles.avatar}
        />
        <Text style={styles.username}>Arnoldy Chafe</Text>
      </View>

      <Text style={styles.bio}>Giới thiệu:</Text>

      <View style={styles.informationContainer}>
        <Text style={styles.informationTitle}>Thông tin cơ bản</Text>
        
        {/* Biểu tượng Website */}
        <View style={styles.infoRow}>
          <Icon name="globe" size={20} color="#555" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.informationLabel}>Website</Text>
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              editable={isEditing} // Chỉ cho phép chỉnh sửa khi isEditing là true
            />
          </View>
        </View>

        {/* Biểu tượng Email */}
        <View style={styles.infoRow}>
          <Icon name="envelope" size={20} color="#555" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.informationLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              editable={isEditing} // Chỉ cho phép chỉnh sửa khi isEditing là true
            />
          </View>
        </View>

        {/* Biểu tượng Phone */}
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="#555" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.informationLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing} // Chỉ cho phép chỉnh sửa khi isEditing là true
            />
          </View>
        </View>

        {/* Biểu tượng Joined Date */}
        <View style={styles.infoRow}>
          <Icon name="calendar" size={20} color="#555" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.informationLabel}>Joined</Text>
            <TextInput
              style={styles.input}
              value={joinedDate}
              onChangeText={setJoinedDate}
              editable={isEditing} // Chỉ cho phép chỉnh sửa khi isEditing là true
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
        <Text style={styles.editText}>{isEditing ? 'Hủy' : 'Chỉnh sửa thông tin'}</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Lưu thông tin</Text>
        </TouchableOpacity>
      )}

      <View style={styles.skillsContainer}>
        <Text style={styles.skillsTitle}>Các đánh giá gần đây:</Text>
        <View style={styles.skills}>
          <Text style={styles.skill}>Giao hàng đúng hạn</Text>
          <Text style={styles.skill}>Đơn hàng không bị biến dạng</Text>
          <Text style={styles.skill}>Thân thiện</Text>
          <Text style={styles.skill}>Vui vẻ</Text>
          <Text style={styles.skill}>Nhanh nhẹn</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 40, // Thêm padding cho đầu giao diện
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  informationContainer: {
    marginBottom: 20,
  },
  informationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  informationLabel: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 14,
    paddingVertical: 5,
  },
  editButton: {
    backgroundColor: '#FFCC00',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  editText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skillsContainer: {
    marginTop: 20,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default ProfileShipper;
