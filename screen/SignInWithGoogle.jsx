import React, { useEffect } from 'react';
import { Button, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; 
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { auth } from '../firebaseConfig';

export default function SignInWithGoogle({ promptAsync, response }) {
  const navigation = useNavigation(); // Khởi tạo hook navigation

  useEffect(() => {
    // Kiểm tra nếu đăng nhập thành công
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      
      // Đăng nhập Firebase với credential từ Google
      signInWithCredential(auth, credential).then(async (userCredential) => {
        // Lấy thông tin người dùng sau khi đăng nhập
        const { displayName, email } = userCredential.user;
        // Lưu trạng thái đăng nhập
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userRole', 'customer'); // Ví dụ lưu vai trò người dùng
        await AsyncStorage.setItem('customer_name', displayName); // Lưu tên người dùng
        await AsyncStorage.setItem('email', email); // Lưu tên người dùng
        await AsyncStorage.setItem('token', id_token); // Lưu token
        // Điều hướng sang HomePage
        navigation.replace('HomePage');
        console.log("Bạn đang đăng nhập với Google bằng email:",email);
      }).catch((error) => {
        console.log("Lỗi khi đăng nhập với Google:", error);
      });
    }
  }, [response]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Ionicons name="logo-firebase" size={100} color="#FFA611" />
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>
        Sign In With {" "}
        <Text style={{ color: "#4285F4" }}>
          G<Text style={{ color: "#EA4336" }}>o</Text>
          <Text style={{ color: "#FBBC04" }}>o</Text>
          <Text style={{ color: "#4285F4" }}>g</Text>
          <Text style={{ color: "#34A853" }}>l</Text>
          <Text style={{ color: "#EA4336" }}>e</Text>
        </Text>
      </Text>
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>And Firebase</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#4285F4",
          width: "90%",
          padding: 10,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
          marginTop: 80,
          marginBottom: 150,
        }}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={30} color="white" />
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
