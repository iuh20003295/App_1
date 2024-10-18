// import React, { useState } from 'react';
// import { View, StyleSheet, Button,TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Location = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Back button */}

//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={30} color="black" />
//         </TouchableOpacity>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 15.8700,
//           longitude: 106.8496,
//           latitudeDelta: 8,
//           longitudeDelta: 8,
//         }}
//       >
//         {/* demo */}
//         <Marker
//           coordinate={{ latitude: 21.0116593, longitude: 105.8300735 }}
//           title="Bưu cục Hà Nội"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 10.78752957000006, longitude: 106.67295982700006 }}
//           title="Bưu cục Trường Sa Hồ Chí Minh"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 10.802939988000048, longitude: 106.63991424000005 }}
//           title="Bưu cục Nhất Chi Mai Hồ Chí Minh"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 10.86073224100005, longitude: 106.73932825500003 }}
//           title="Bưu cục Tam Phú Thủ Đức Hồ Chí Minh"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 106.69376031300004, longitude: 106.69376031300004 }}
//           title="Bưu cục Cố Giang Quận 1 Hồ Chí Minh"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 10.3642975, longitude: 105.4465086 }}
//           title="Bưu cục An Giang"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 10.494766198000036, longitude: 107.17505847600006 }}
//           title="Bưu cục Bà Rịa - Vũng Tàu"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 21.286791437000034, longitude: 106.21788253900007 }}
//           title="Bưu cục Bắc Giang"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 22.142392786000073, longitude: 105.83513569700006 }}
//           title="Bưu cục Bắc Kạn"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 9.2824272, longitude: 105.7244453 }}
//           title="Bưu cục Bạc Liêu"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 21.13550953300006, longitude: 106.00305957900008 }}
//           title="Bưu cục Bắc Ninh"
//           pinColor="red"
//         />
//         <Marker
//           coordinate={{ latitude: 16.813292661000048, longitude: 107.11261510700007 }}
//           title="Bưu cục Quảng Trị"
//           pinColor="red"
//         />
//         {/* Marker for Huế */}
//         <Marker
//           coordinate={{ latitude: 16.4637, longitude: 107.5909 }}
//           title="Huế"
//           pinColor="red"
//         />

//         {/* Show marker for selected province (if any) */}
//         {selectedLocation && (
//           <Marker
//             coordinate={{
//               latitude: selectedLocation.latitude,
//               longitude: selectedLocation.longitude,
//             }}
//             title={selectedLocation.name}
//             pinColor="blue"  // Set pinColor to distinguish this marker
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 35,
//     left: 10,
//     zIndex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default Location;

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import locationsData from '../address.json';

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 15.8700,
          longitude: 106.8496,
          latitudeDelta: 8,
          longitudeDelta: 8,
        }}
      >
        {/* Lặp qua các địa điểm từ dữ liệu JSON và tạo Marker */}
        {locationsData.map((location, index) => {
          const [longitude, latitude] = location.coordinates; // Lấy tọa độ từ mảng
          return (
            <Marker
              key={index}
              coordinate={{ latitude, longitude }}
              title={location.description} // Sử dụng mô tả từ JSON
              pinColor="red"
              onPress={() => setSelectedLocation(location)} // Thiết lập vị trí được chọn khi nhấn
            />
          );
        })}

        {/* Hiển thị marker cho tỉnh được chọn (nếu có) */}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.coordinates[1], // Lấy latitude từ mảng coordinates
              longitude: selectedLocation.coordinates[0], // Lấy longitude từ mảng coordinates
            }}
            title={selectedLocation.description} // Sử dụng mô tả từ JSON
            pinColor="blue"  // Màu pin để phân biệt marker này
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 10,
    zIndex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Location;
