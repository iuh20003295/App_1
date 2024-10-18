// // // import React, { useState, useEffect } from 'react';
// // // import { View, StyleSheet } from 'react-native';
// // // import { Picker } from '@react-native-picker/picker';
// // // import axios from 'axios';
// // // import { List, SearchBar, Provider } from '@ant-design/react-native';

// // // const BASE_API_URL = 'https://json-api-eta.vercel.app'; // Địa chỉ API của bạn

// // // const Adds = ({ onUpdateProvince = () => {}, 
// // //                         onUpdateDistrict = () => {}, 
// // //                         onUpdateWard = () => {} }) => {
// // //   const [selectedProvince, setSelectedProvince] = useState(null);
// // //   const [selectedDistrict, setSelectedDistrict] = useState(null);
// // //   const [selectedWard, setSelectedWard] = useState(null);

// // //   const [filteredProvinces, setFilteredProvinces] = useState([]);
// // //   const [filteredDistricts, setFilteredDistricts] = useState([]);
// // //   const [filteredWards, setFilteredWards] = useState([]);

// // //   const [allProvinces, setAllProvinces] = useState([]);
// // //   const [allDistricts, setAllDistricts] = useState([]);
// // //   const [allWards, setAllWards] = useState([]);

// // //   // Fetch provinces when component loads
// // //   useEffect(() => {
// // //     const fetchProvinces = async () => {
// // //       try {
// // //         const { data } = await axios.get(`${BASE_API_URL}/provinces`);
// // //         setAllProvinces(data);
// // //         setFilteredProvinces(data);
// // //       } catch (error) {
// // //         console.error('Error fetching provinces:', error);
// // //       }
// // //     };
// // //     fetchProvinces();
// // //   }, []);

// // //   // Fetch districts based on selected province
// // //   const fetchDistricts = async (provinceCode) => {
// // //     if (!provinceCode) {
// // //       console.error('Province code is undefined or null');
// // //       return;
// // //     }
    
// // //     try {
// // //       const { data } = await axios.get(`${BASE_API_URL}/districts/${provinceCode}`);
// // //       setAllDistricts(data || []);
// // //       setFilteredDistricts(data || []);
// // //     } catch (error) {
// // //       console.error('Error fetching districts:', error);
// // //     }
// // //   };

// // //   // Fetch wards based on selected district
// // //   const fetchWards = async (districtCode) => {
// // //     if (!districtCode) {
// // //       console.error('District code is undefined or null');
// // //       return;
// // //     }
    
// // //     try {
// // //       const { data } = await axios.get(`${BASE_API_URL}/communes/${districtCode}`);
// // //       setAllWards(data || []);
// // //       setFilteredWards(data || []);
// // //     } catch (error) {
// // //       console.error('Error fetching wards:', error);
// // //     }
// // //   };

// // //   return (
// // //     <Provider>
// // //       <View style={styles.container}>
// // //         {/* Province Select */}
// // //         <List>
// // //           <Picker
// // //             selectedValue={selectedProvince}
// // //             onValueChange={(provinceCode) => {
// // //               setSelectedProvince(provinceCode);
// // //               setSelectedDistrict(null);
// // //               setSelectedWard(null);
// // //               fetchDistricts(provinceCode);
// // //               onUpdateProvince(provinceCode);
// // //             }}
// // //             mode="dropdown"
// // //           >
// // //             {filteredProvinces.map((province) => (
// // //               <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
// // //             ))}
// // //           </Picker>
// // //         </List>

// // //         {/* District Select */}
// // //         <List>
// // //           <Picker
// // //             selectedValue={selectedDistrict}
// // //             onValueChange={(districtCode) => {
// // //               setSelectedDistrict(districtCode);
// // //               setSelectedWard(null);
// // //               fetchWards(districtCode);
// // //               onUpdateDistrict(districtCode);
// // //             }}
// // //             enabled={!!selectedProvince}
// // //             mode="dropdown"
// // //           >
// // //             {filteredDistricts.map((district) => (
// // //               <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
// // //             ))}
// // //           </Picker>
// // //         </List>

// // //         {/* Ward Select */}
// // //         <List>
// // //           <Picker
// // //             selectedValue={selectedWard}
// // //             onValueChange={(wardCode) => {
// // //               setSelectedWard(wardCode);
// // //               onUpdateWard(wardCode);
// // //             }}
// // //             enabled={!!selectedDistrict}
// // //             mode="dropdown"
// // //           >
// // //             {filteredWards.map((ward) => (
// // //               <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
// // //             ))}
// // //           </Picker>
// // //         </List>
// // //       </View>
// // //     </Provider>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 20,
// // //   },
// // // });

// // // export default Adds;


// // import React, { useState, useEffect } from 'react';
// // import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import axios from 'axios';
// // import { Provider } from '@ant-design/react-native';

// // const BASE_API_URL = 'https://json-api-eta.vercel.app'; 
// // const Adds = () => {
// //   // State cho Địa chỉ gửi
// //   const [senderProvince, setSenderProvince] = useState(null);
// //   const [senderDistrict, setSenderDistrict] = useState(null);
// //   const [senderWard, setSenderWard] = useState(null);

// //   // State cho Địa chỉ nhận
// //   const [receiverProvince, setReceiverProvince] = useState(null);
// //   const [receiverDistrict, setReceiverDistrict] = useState(null);
// //   const [receiverWard, setReceiverWard] = useState(null);

// //   // State cho tất cả các tỉnh, huyện, xã
// //   const [provinces, setProvinces] = useState([]);
// //   const [senderDistricts, setSenderDistricts] = useState([]);
// //   const [senderWards, setSenderWards] = useState([]);
// //   const [receiverDistricts, setReceiverDistricts] = useState([]);
// //   const [receiverWards, setReceiverWards] = useState([]);

// //   // State hiển thị dropdown
// //   const [isSenderProvincePickerVisible, setSenderProvincePickerVisible] = useState(false);
// //   const [isSenderDistrictPickerVisible, setSenderDistrictPickerVisible] = useState(false);
// //   const [isSenderWardPickerVisible, setSenderWardPickerVisible] = useState(false);
  
// //   const [isReceiverProvincePickerVisible, setReceiverProvincePickerVisible] = useState(false);
// //   const [isReceiverDistrictPickerVisible, setReceiverDistrictPickerVisible] = useState(false);
// //   const [isReceiverWardPickerVisible, setReceiverWardPickerVisible] = useState(false);

// //   // Fetch tỉnh khi component được render
// //   useEffect(() => {
// //     const fetchProvinces = async () => {
// //       try {
// //         const { data } = await axios.get(`${BASE_API_URL}/provinces`);
// //         setProvinces(data);
// //       } catch (error) {
// //         console.error('Error fetching provinces:', error);
// //       }
// //     };
// //     fetchProvinces();
// //   }, []);

// //   // Fetch quận/huyện theo tỉnh đã chọn
// //   const fetchDistricts = async (provinceCode, setDistrictState) => {
// //     if (!provinceCode) return;
// //     try {
// //       const { data } = await axios.get(`${BASE_API_URL}/districts/${provinceCode}`);
// //       setDistrictState(data);
// //     } catch (error) {
// //       console.error('Error fetching districts:', error);
// //     }
// //   };

// //   // Fetch xã/phường theo quận/huyện đã chọn
// //   const fetchWards = async (districtCode, setWardState) => {
// //     if (!districtCode) return;
// //     try {
// //       const { data } = await axios.get(`${BASE_API_URL}/communes/${districtCode}`);
// //       setWardState(data);
// //     } catch (error) {
// //       console.error('Error fetching wards:', error);
// //     }
// //   };

// //   // Hàm log dữ liệu console khi chọn
// //   const handleUpdate = (type, value) => {
// //     console.log(`${type} selected:`, value);
// //   };

// //   return (
// //     <Provider>
// //       <View style={styles.container}>
// //         {/* Khung cho Địa chỉ gửi */}
// //         <View style={styles.box}>
// //           <Text style={styles.header}>Địa chỉ gửi</Text>
          
// //           {/* Tỉnh */}
// //           <Text style={styles.label}>Tỉnh:</Text>
// //           <TouchableOpacity
// //             style={styles.selector}
// //             onPress={() => setSenderProvincePickerVisible(true)}
// //           >
// //             <Text>{senderProvince ? provinces.find(p => p.idProvince === senderProvince)?.name : "Chọn tỉnh"}</Text>
// //           </TouchableOpacity>
// //           <Modal visible={isSenderProvincePickerVisible} transparent={true} animationType="slide">
// //             <View style={styles.modalView}>
// //               <Picker
// //                 selectedValue={senderProvince}
// //                 onValueChange={(value) => {
// //                   setSenderProvince(value);
// //                   setSenderDistrict(null);
// //                   setSenderWard(null);
// //                   fetchDistricts(value, setSenderDistricts);
// //                   setSenderProvincePickerVisible(false);
// //                   handleUpdate('Sender Province', value);
// //                 }}
// //               >
// //                 {provinces.map((province) => (
// //                   <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </Modal>

// //           {/* Huyện */}
// //           <Text style={styles.label}>Huyện:</Text>
// //           <TouchableOpacity
// //             style={styles.selector}
// //             onPress={() => setSenderDistrictPickerVisible(true)}
// //             disabled={!senderProvince}
// //           >
// //             <Text>{senderDistrict ? senderDistricts.find(d => d.idDistrict === senderDistrict)?.name : "Chọn huyện"}</Text>
// //           </TouchableOpacity>
// //           <Modal visible={isSenderDistrictPickerVisible} transparent={true} animationType="slide">
// //             <View style={styles.modalView}>
// //               <Picker
// //                 selectedValue={senderDistrict}
// //                 onValueChange={(value) => {
// //                   setSenderDistrict(value);
// //                   setSenderWard(null);
// //                   fetchWards(value, setSenderWards);
// //                   setSenderDistrictPickerVisible(false);
// //                   handleUpdate('Sender District', value);
// //                 }}
// //               >
// //                 {senderDistricts.map((district) => (
// //                   <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </Modal>

// //           {/* Xã */}
// //           <Text style={styles.label}>Xã:</Text>
// //           <TouchableOpacity
// //             style={styles.selector}
// //             onPress={() => setSenderWardPickerVisible(true)}
// //             disabled={!senderDistrict}
// //           >
// //             <Text>{senderWard ? senderWards.find(w => w.idCommune === senderWard)?.name : "Chọn xã"}</Text>
// //           </TouchableOpacity>
// //           <Modal visible={isSenderWardPickerVisible} transparent={true} animationType="slide">
// //             <View style={styles.modalView}>
// //               <Picker
// //                 selectedValue={senderWard}
// //                 onValueChange={(value) => {
// //                   setSenderWard(value);
// //                   setSenderWardPickerVisible(false);
// //                   handleUpdate('Sender Ward', value);
// //                 }}
// //               >
// //                 {senderWards.map((ward) => (
// //                   <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </Modal>
// //         </View>

// //         {/* Khung cho Địa chỉ nhận */}
// //         <View style={styles.box}>
// //           <Text style={styles.header}>Địa chỉ nhận</Text>

// //           {/* Tỉnh */}
// //           <Text style={styles.label}>Tỉnh:</Text>
// //           <TouchableOpacity
// //             style={styles.selector}
// //             onPress={() => setReceiverProvincePickerVisible(true)} 
// //           >
// //             <Text>{receiverProvince ? provinces.find(p => p.idProvince === receiverProvince)?.name : "Chọn tỉnh"}</Text>
// //           </TouchableOpacity>
// //           <Modal visible={isReceiverProvincePickerVisible} transparent={true} animationType="slide">
// //             <View style={styles.modalView}>
// //               <Picker
// //                 selectedValue={receiverProvince}
// //                 onValueChange={(value) => {
// //                   setReceiverProvince(value);
// //                   setReceiverDistrict(null);
// //                   setReceiverWard(null);
// //                   fetchDistricts(value, setReceiverDistricts);
// //                   setReceiverProvincePickerVisible(false);
// //                   handleUpdate('Receiver Province', value);
// //                 }}
// //               >
// //                 {provinces.map((province) => (
// //                   <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </Modal>

// //           {/* Huyện */}
// //           <Text style={styles.label}>Huyện:</Text>
// //           <TouchableOpacity
// //             style={styles.selector}
// //             onPress={() => setReceiverDistrictPickerVisible(true)} 
// //             disabled={!receiverProvince}
// //           >
// //             <Text>{receiverDistrict ? receiverDistricts.find(d => d.idDistrict === receiverDistrict)?.name : "Chọn huyện"}</Text>
// //           </TouchableOpacity>
// //           <Modal visible={isReceiverDistrictPickerVisible} transparent={true} animationType="slide">
// //             <View style={styles.modalView}>
// //               <Picker
// //                 selectedValue={receiverDistrict}
// //                 onValueChange={(value) => {
// //                   setReceiverDistrict(value);
// //                   setReceiverWard(null);
// //                   fetchWards(value, setReceiverWards);
// //                   setReceiverDistrictPickerVisible(false);
// //                   handleUpdate('Receiver District', value);
// //                 }}
// //               >
// //                 {receiverDistricts.map((district) => (
// //                   <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </Modal>

// //           {/* Xã */}
// //           <Text style={styles.label}>Xã:</Text>
// //           <TouchableOpacity
// //             style={styles.selector}
// //             onPress={() => setReceiverWardPickerVisible(true)} 
// //             disabled={!receiverDistrict}
// //           >
// //             <Text>{receiverWard ? receiverWards.find(w => w.idCommune === receiverWard)?.name : "Chọn xã"}</Text>
// //           </TouchableOpacity>
// //           <Modal visible={isReceiverWardPickerVisible} transparent={true} animationType="slide">
// //             <View style={styles.modalView}>
// //               <Picker
// //                 selectedValue={receiverWard}
// //                 onValueChange={(value) => {
// //                   setReceiverWard(value);
// //                   setReceiverWardPickerVisible(false);
// //                   handleUpdate('Receiver Ward', value);
// //                 }}
// //               >
// //                 {receiverWards.map((ward) => (
// //                   <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
// //                 ))}
// //               </Picker>
// //             </View>
// //           </Modal>
// //         </View>
// //       </View>
// //     </Provider>
// //   );
// // };


// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { Provider } from '@ant-design/react-native';

// const BASE_API_URL = 'https://json-api-eta.vercel.app'; 
// const Adds = () => {
//   // State cho Địa chỉ gửi
//   const [senderProvince, setSenderProvince] = useState(null);
//   const [senderDistrict, setSenderDistrict] = useState(null);
//   const [senderWard, setSenderWard] = useState(null);

//   // State cho Địa chỉ nhận
//   const [receiverProvince, setReceiverProvince] = useState(null);
//   const [receiverDistrict, setReceiverDistrict] = useState(null);
//   const [receiverWard, setReceiverWard] = useState(null);

//   // State cho tất cả các tỉnh, huyện, xã
//   const [provinces, setProvinces] = useState([]);
//   const [senderDistricts, setSenderDistricts] = useState([]);
//   const [senderWards, setSenderWards] = useState([]);
//   const [receiverDistricts, setReceiverDistricts] = useState([]);
//   const [receiverWards, setReceiverWards] = useState([]);

//   // State hiển thị dropdown
//   const [isSenderProvincePickerVisible, setSenderProvincePickerVisible] = useState(false);
//   const [isSenderDistrictPickerVisible, setSenderDistrictPickerVisible] = useState(false);
//   const [isSenderWardPickerVisible, setSenderWardPickerVisible] = useState(false);
  
//   const [isReceiverProvincePickerVisible, setReceiverProvincePickerVisible] = useState(false);
//   const [isReceiverDistrictPickerVisible, setReceiverDistrictPickerVisible] = useState(false);
//   const [isReceiverWardPickerVisible, setReceiverWardPickerVisible] = useState(false);

//   // Fetch tỉnh khi component được render
//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_API_URL}/provinces`);
//         setProvinces(data);
//       } catch (error) {
//         console.error('Error fetching provinces:', error);
//       }
//     };
//     fetchProvinces();
//   }, []);

//   // Fetch quận/huyện theo tỉnh đã chọn
//   const fetchDistricts = async (provinceCode, setDistrictState) => {
//     if (!provinceCode) return;
//     try {
//       const { data } = await axios.get(`${BASE_API_URL}/districts/${provinceCode}`);
//       setDistrictState(data);
//     } catch (error) {
//       console.error('Error fetching districts:', error);
//     }
//   };

//   // Fetch xã/phường theo quận/huyện đã chọn
//   const fetchWards = async (districtCode, setWardState) => {
//     if (!districtCode) return;
//     try {
//       const { data } = await axios.get(`${BASE_API_URL}/communes/${districtCode}`);
//       setWardState(data);
//     } catch (error) {
//       console.error('Error fetching wards:', error);
//     }
//   };

//   // Hàm log dữ liệu console khi chọn
//   const handleUpdate = (type, value) => {
//     console.log(`${type} selected:`, value);
//   };

//   // Hàm để giám sát giá trị form
//   useEffect(() => {
//     console.log("Sender Address:", {
//       province: senderProvince,
//       district: senderDistrict,
//       ward: senderWard,
//     });

//     console.log("Receiver Address:", {
//       province: receiverProvince,
//       district: receiverDistrict,
//       ward: receiverWard,
//     });
//   }, [senderProvince, senderDistrict, senderWard, receiverProvince, receiverDistrict, receiverWard]);

//   return (
//     <Provider>
//       <View style={styles.container}>
//         {/* Khung cho Địa chỉ gửi */}
//         <View style={styles.box}>
//           <Text style={styles.header}>Địa chỉ gửi</Text>
          
//           {/* Tỉnh */}
//           <Text style={styles.label}>Tỉnh:</Text>
//           <TouchableOpacity
//             style={styles.selector}
//             onPress={() => setSenderProvincePickerVisible(true)}
//           >
//             <Text>{senderProvince ? provinces.find(p => p.idProvince === senderProvince)?.name : "Chọn tỉnh"}</Text>
//           </TouchableOpacity>
//           <Modal visible={isSenderProvincePickerVisible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//               <Picker
//                 selectedValue={senderProvince}
//                 onValueChange={(value) => {
//                   setSenderProvince(value);
//                   setSenderDistrict(null);
//                   setSenderWard(null);
//                   fetchDistricts(value, setSenderDistricts);
//                   setSenderProvincePickerVisible(false);
//                   handleUpdate('Sender Province', value);
//                 }}
//               >
//                 {provinces.map((province) => (
//                   <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
//                 ))}
//               </Picker>
//             </View>
//           </Modal>

//           {/* Huyện */}
//           <Text style={styles.label}>Huyện:</Text>
//           <TouchableOpacity
//             style={styles.selector}
//             onPress={() => setSenderDistrictPickerVisible(true)}
//             disabled={!senderProvince}
//           >
//             <Text>{senderDistrict ? senderDistricts.find(d => d.idDistrict === senderDistrict)?.name : "Chọn huyện"}</Text>
//           </TouchableOpacity>
//           <Modal visible={isSenderDistrictPickerVisible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//               <Picker
//                 selectedValue={senderDistrict}
//                 onValueChange={(value) => {
//                   setSenderDistrict(value);
//                   setSenderWard(null);
//                   fetchWards(value, setSenderWards);
//                   setSenderDistrictPickerVisible(false);
//                   handleUpdate('Sender District', value);
//                 }}
//               >
//                 {senderDistricts.map((district) => (
//                   <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
//                 ))}
//               </Picker>
//             </View>
//           </Modal>

//           {/* Xã */}
//           <Text style={styles.label}>Xã:</Text>
//           <TouchableOpacity
//             style={styles.selector}
//             onPress={() => setSenderWardPickerVisible(true)}
//             disabled={!senderDistrict}
//           >
//             <Text>{senderWard ? senderWards.find(w => w.idCommune === senderWard)?.name : "Chọn xã"}</Text>
//           </TouchableOpacity>
//           <Modal visible={isSenderWardPickerVisible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//               <Picker
//                 selectedValue={senderWard}
//                 onValueChange={(value) => {
//                   setSenderWard(value);
//                   setSenderWardPickerVisible(false);
//                   handleUpdate('Sender Ward', value);
//                 }}
//               >
//                 {senderWards.map((ward) => (
//                   <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
//                 ))}
//               </Picker>
//             </View>
//           </Modal>
//         </View>

//         {/* Khung cho Địa chỉ nhận */}
//         <View style={styles.box}>
//           <Text style={styles.header}>Địa chỉ nhận</Text>

//           {/* Tỉnh */}
//           <Text style={styles.label}>Tỉnh:</Text>
//           <TouchableOpacity
//             style={styles.selector}
//             onPress={() => setReceiverProvincePickerVisible(true)} 
//           >
//             <Text>{receiverProvince ? provinces.find(p => p.idProvince === receiverProvince)?.name : "Chọn tỉnh"}</Text>
//           </TouchableOpacity>
//           <Modal visible={isReceiverProvincePickerVisible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//               <Picker
//                 selectedValue={receiverProvince}
//                 onValueChange={(value) => {
//                   setReceiverProvince(value);
//                   setReceiverDistrict(null);
//                   setReceiverWard(null);
//                   fetchDistricts(value, setReceiverDistricts);
//                   setReceiverProvincePickerVisible(false);
//                   handleUpdate('Receiver Province', value);
//                 }}
//               >
//                 {provinces.map((province) => (
//                   <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
//                 ))}
//               </Picker>
//             </View>
//           </Modal>

//           {/* Huyện */}
//           <Text style={styles.label}>Huyện:</Text>
//           <TouchableOpacity
//             style={styles.selector}
//             onPress={() => setReceiverDistrictPickerVisible(true)} 
//             disabled={!receiverProvince}
//           >
//             <Text>{receiverDistrict ? receiverDistricts.find(d => d.idDistrict === receiverDistrict)?.name : "Chọn huyện"}</Text>
//           </TouchableOpacity>
//           <Modal visible={isReceiverDistrictPickerVisible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//               <Picker
//                 selectedValue={receiverDistrict}
//                 onValueChange={(value) => {
//                   setReceiverDistrict(value);
//                   setReceiverWard(null);
//                   fetchWards(value, setReceiverWards);
//                   setReceiverDistrictPickerVisible(false);
//                   handleUpdate('Receiver District', value);
//                 }}
//               >
//                 {receiverDistricts.map((district) => (
//                   <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
//                 ))}
//               </Picker>
//             </View>
//           </Modal>

//           {/* Xã */}
//           <Text style={styles.label}>Xã:</Text>
//           <TouchableOpacity
//             style={styles.selector}
//             onPress={() => setReceiverWardPickerVisible(true)} 
//             disabled={!receiverDistrict}
//           >
//             <Text>{receiverWard ? receiverWards.find(w => w.idCommune === receiverWard)?.name : "Chọn xã"}</Text>
//           </TouchableOpacity>
//           <Modal visible={isReceiverWardPickerVisible} transparent={true} animationType="slide">
//             <View style={styles.modalView}>
//               <Picker
//                 selectedValue={receiverWard}
//                 onValueChange={(value) => {
//                   setReceiverWard(value);
//                   setReceiverWardPickerVisible(false);
//                   handleUpdate('Receiver Ward', value);
//                 }}
//               >
//                 {receiverWards.map((ward) => (
//                   <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
//                 ))}
//               </Picker>
//             </View>
//           </Modal>
//         </View>
//       </View>
//     </Provider>
//   );
// };




import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Provider } from '@ant-design/react-native';

const BASE_API_URL = 'https://json-api-eta.vercel.app'; 

const Adds = () => {
  // State cho Địa chỉ gửi
  const [senderProvince, setSenderProvince] = useState(null);
  const [senderDistrict, setSenderDistrict] = useState(null);
  const [senderWard, setSenderWard] = useState(null);

  // State cho Địa chỉ nhận
  const [receiverProvince, setReceiverProvince] = useState(null);
  const [receiverDistrict, setReceiverDistrict] = useState(null);
  const [receiverWard, setReceiverWard] = useState(null);

  // State cho tất cả các tỉnh, huyện, xã
  const [provinces, setProvinces] = useState([]);
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [senderWards, setSenderWards] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverWards, setReceiverWards] = useState([]);

  // State hiển thị dropdown
  const [isSenderProvincePickerVisible, setSenderProvincePickerVisible] = useState(false);
  const [isSenderDistrictPickerVisible, setSenderDistrictPickerVisible] = useState(false);
  const [isSenderWardPickerVisible, setSenderWardPickerVisible] = useState(false);
  
  const [isReceiverProvincePickerVisible, setReceiverProvincePickerVisible] = useState(false);
  const [isReceiverDistrictPickerVisible, setReceiverDistrictPickerVisible] = useState(false);
  const [isReceiverWardPickerVisible, setReceiverWardPickerVisible] = useState(false);

  // State cho location data
  const [locationData, setLocationData] = useState({
    province_code_giao: null,
    province_code_nhan: null,
    district_code_giao: null,
    district_code_nhan: null,
    ward_code_giao: null,
    ward_code_nhan: null
  });

  // Fetch tỉnh khi component được render
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/provinces`);
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch quận/huyện theo tỉnh đã chọn
  const fetchDistricts = async (provinceCode, setDistrictState) => {
    if (!provinceCode) return;
    try {
      const { data } = await axios.get(`${BASE_API_URL}/districts/${provinceCode}`);
      setDistrictState(data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Fetch xã/phường theo quận/huyện đã chọn
  const fetchWards = async (districtCode, setWardState) => {
    if (!districtCode) return;
    try {
      const { data } = await axios.get(`${BASE_API_URL}/communes/${districtCode}`);
      setWardState(data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  // Cập nhật locationData khi có sự thay đổi trong địa chỉ gửi và nhận
  useEffect(() => {
    const newLocationData = {
      province_code_giao: senderProvince,
      district_code_giao: senderDistrict,
      ward_code_giao: senderWard,
      province_code_nhan: receiverProvince,
      district_code_nhan: receiverDistrict,
      ward_code_nhan: receiverWard
    };
    
    setLocationData(newLocationData);

    // Log địa chỉ gửi và nhận
    const senderAddressJSON = {
      province_code_giao: newLocationData.province_code_giao,
      district_code_giao: newLocationData.district_code_giao,
      ward_code_giao: newLocationData.ward_code_giao,
    };

    const receiverAddressJSON = {
      province_code_nhan: newLocationData.province_code_nhan,
      district_code_nhan: newLocationData.district_code_nhan,
      ward_code_nhan: newLocationData.ward_code_nhan,
    };

    console.log('Sender Address JSON:', JSON.stringify(senderAddressJSON, null, 2));
    console.log('Receiver Address JSON:', JSON.stringify(receiverAddressJSON, null, 2));
    
  }, [senderProvince, senderDistrict, senderWard, receiverProvince, receiverDistrict, receiverWard]);

  return (
    <Provider>
      <View style={styles.container}>
        {/* Khung cho Địa chỉ gửi */}
        <View style={styles.box}>
          <Text style={styles.header}>Địa chỉ gửi</Text>
          
          {/* Tỉnh */}
          <Text style={styles.label}>Tỉnh:</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setSenderProvincePickerVisible(true)}
          >
            <Text>{senderProvince ? provinces.find(p => p.idProvince === senderProvince)?.name : "Chọn tỉnh"}</Text>
          </TouchableOpacity>
          <Modal visible={isSenderProvincePickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Picker
                selectedValue={senderProvince}
                onValueChange={(value) => {
                  setSenderProvince(value);
                  setSenderDistrict(null);
                  setSenderWard(null);
                  fetchDistricts(value, setSenderDistricts);
                  setSenderProvincePickerVisible(false);
                }}
              >
                {provinces.map((province) => (
                  <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
                ))}
              </Picker>
            </View>
          </Modal>

          {/* Huyện */}
          <Text style={styles.label}>Huyện:</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setSenderDistrictPickerVisible(true)}
            disabled={!senderProvince}
          >
            <Text>{senderDistrict ? senderDistricts.find(d => d.idDistrict === senderDistrict)?.name : "Chọn huyện"}</Text>
          </TouchableOpacity>
          <Modal visible={isSenderDistrictPickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Picker
                selectedValue={senderDistrict}
                onValueChange={(value) => {
                  setSenderDistrict(value);
                  setSenderWard(null);
                  fetchWards(value, setSenderWards);
                  setSenderDistrictPickerVisible(false);
                }}
              >
                {senderDistricts.map((district) => (
                  <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
                ))}
              </Picker>
            </View>
          </Modal>

          {/* Xã */}
          <Text style={styles.label}>Xã:</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setSenderWardPickerVisible(true)}
            disabled={!senderDistrict}
          >
            <Text>{senderWard ? senderWards.find(w => w.idCommune === senderWard)?.name : "Chọn xã"}</Text>
          </TouchableOpacity>
          <Modal visible={isSenderWardPickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Picker
                selectedValue={senderWard}
                onValueChange={(value) => {
                  setSenderWard(value);
                  setSenderWardPickerVisible(false);
                }}
              >
                {senderWards.map((ward) => (
                  <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
                ))}
              </Picker>
            </View>
          </Modal>
        </View>

        {/* Khung cho Địa chỉ nhận */}
        <View style={styles.box}>
          <Text style={styles.header}>Địa chỉ nhận</Text>

          {/* Tỉnh */}
          <Text style={styles.label}>Tỉnh:</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setReceiverProvincePickerVisible(true)} 
          >
            <Text>{receiverProvince ? provinces.find(p => p.idProvince === receiverProvince)?.name : "Chọn tỉnh"}</Text>
          </TouchableOpacity>
          <Modal visible={isReceiverProvincePickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Picker
                selectedValue={receiverProvince}
                onValueChange={(value) => {
                  setReceiverProvince(value);
                  setReceiverDistrict(null);
                  setReceiverWard(null);
                  fetchDistricts(value, setReceiverDistricts);
                  setReceiverProvincePickerVisible(false);
                }}
              >
                {provinces.map((province) => (
                  <Picker.Item key={province.idProvince} label={province.name} value={province.idProvince} />
                ))}
              </Picker>
            </View>
          </Modal>

          {/* Huyện */}
          <Text style={styles.label}>Huyện:</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setReceiverDistrictPickerVisible(true)}
            disabled={!receiverProvince}
          >
            <Text>{receiverDistrict ? receiverDistricts.find(d => d.idDistrict === receiverDistrict)?.name : "Chọn huyện"}</Text>
          </TouchableOpacity>
          <Modal visible={isReceiverDistrictPickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Picker
                selectedValue={receiverDistrict}
                onValueChange={(value) => {
                  setReceiverDistrict(value);
                  setReceiverWard(null);
                  fetchWards(value, setReceiverWards);
                  setReceiverDistrictPickerVisible(false);
                }}
              >
                {receiverDistricts.map((district) => (
                  <Picker.Item key={district.idDistrict} label={district.name} value={district.idDistrict} />
                ))}
              </Picker>
            </View>
          </Modal>

          {/* Xã */}
          <Text style={styles.label}>Xã:</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setReceiverWardPickerVisible(true)}
            disabled={!receiverDistrict}
          >
            <Text>{receiverWard ? receiverWards.find(w => w.idCommune === receiverWard)?.name : "Chọn xã"}</Text>
          </TouchableOpacity>
          <Modal visible={isReceiverWardPickerVisible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
              <Picker
                selectedValue={receiverWard}
                onValueChange={(value) => {
                  setReceiverWard(value);
                  setReceiverWardPickerVisible(false);
                }}
              >
                {receiverWards.map((ward) => (
                  <Picker.Item key={ward.idCommune} label={ward.name} value={ward.idCommune} />
                ))}
              </Picker>
            </View>
          </Modal>
        </View>
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  box: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  selector: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});

export default Adds;
