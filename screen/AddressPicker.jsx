// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { List, SearchBar, Provider } from '@ant-design/react-native';

// const BASE_API_URL = 'https://provinces.open-api.vn/api';
//   const AddressPicker = ({ onUpdateProvince = () => {}, 
//                             onUpdateDistrict = () => {}, 
//                             onUpdateWard = () => {} }) => {
//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);

//   const [filteredProvinces, setFilteredProvinces] = useState([]);
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const [filteredWards, setFilteredWards] = useState([]);

//   const [allProvinces, setAllProvinces] = useState([]);
//   const [allDistricts, setAllDistricts] = useState([]);
//   const [allWards, setAllWards] = useState([]);

//   // Fetch provinces when component loads
//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_API_URL}/p`);
//         setAllProvinces(data);
//         setFilteredProvinces(data);
//       } catch (error) {
//         console.error('Error fetching provinces:', error);
//       }
//     };
//     fetchProvinces();
//   }, []);

//   // Fetch districts based on selected province
//   const fetchDistricts = async (provinceCode) => {
//     try {
//       const { data } = await axios.get(`${BASE_API_URL}/p/${provinceCode}?depth=2`);
//       setAllDistricts(data.districts || []);
//       setFilteredDistricts(data.districts || []);
//     } catch (error) {
//       console.error('Error fetching districts:', error);
//     }
//   };

//   // Fetch wards based on selected district
//   const fetchWards = async (districtCode) => {
//     try {
//       const { data } = await axios.get(`${BASE_API_URL}/d/${districtCode}?depth=2`);
//       setAllWards(data.wards || []);
//       setFilteredWards(data.wards || []);
//     } catch (error) {
//       console.error('Error fetching wards:', error);
//     }
//   };

//   // Search provinces
//   const onSearchProvince = (searchText) => {
//     const filtered = allProvinces.filter(province =>
//       province.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredProvinces(filtered);
//   };

//   // Search districts
//   const onSearchDistrict = (searchText) => {
//     const filtered = allDistricts.filter(district =>
//       district.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredDistricts(filtered);
//   };

//   // Search wards
//   const onSearchWard = (searchText) => {
//     const filtered = allWards.filter(ward =>
//       ward.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredWards(filtered);
//   };

//   return (
//     <Provider>
//       <View style={styles.container}>
//         {/* Province Select */}
//         <List>
//           <SearchBar placeholder="Search Province" onChange={onSearchProvince} />
//           <Picker
//             selectedValue={selectedProvince}
// onValueChange={(provinceCode) => {
//               setSelectedProvince(provinceCode);
//               setSelectedDistrict(null);
//               setSelectedWard(null);
//               fetchDistricts(provinceCode);
//               onUpdateProvince(provinceCode);
//             }}
//             mode="dropdown"
//           >
//             {filteredProvinces.map((province) => (
//               <Picker.Item key={province.code} label={province.name} value={province.code} />
//             ))}
//           </Picker>
//         </List>

//         {/* District Select */}
//         <List>
//           <SearchBar placeholder="Search District" onChange={onSearchDistrict} />
//           <Picker
//             selectedValue={selectedDistrict}
//             onValueChange={(districtCode) => {
//               setSelectedDistrict(districtCode);
//               setSelectedWard(null);
//               fetchWards(districtCode);
//               onUpdateDistrict(districtCode);
//             }}
//             enabled={!!selectedProvince}
//             mode="dropdown"
//           >
//             {filteredDistricts.map((district) => (
//               <Picker.Item key={district.code} label={district.name} value={district.code} />
//             ))}
//           </Picker>
//         </List>

//         {/* Ward Select */}
//         <List>
//           <SearchBar placeholder="Search Ward" onChange={onSearchWard} />
//           <Picker
//             selectedValue={selectedWard}
//             onValueChange={(wardCode) => {
//               setSelectedWard(wardCode);
//               onUpdateWard(wardCode);
//             }}
//             enabled={!!selectedDistrict}
//             mode="dropdown"
//           >
//             {filteredWards.map((ward) => (
//               <Picker.Item key={ward.code} label={ward.name} value={ward.code} />
//             ))}
//           </Picker>
//         </List>
//       </View>
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     marginTop: 50,
//   },
// });

// export default AddressPicker;



import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { Provider } from '@ant-design/react-native';

const BASE_API_URL = 'https://provinces.open-api.vn/api';

const AddressPicker = ({ 
  onUpdateProvinceGiao, 
  onUpdateProvinceNhan, 
  onUpdateDistrictGiao, 
  onUpdateDistrictNhan, 
  onUpdateWardGiao, 
  onUpdateWardNhan, 
  isSender 
}) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);

  const [allProvinces, setAllProvinces] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allWards, setAllWards] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/p`);
        setAllProvinces(data);
        setFilteredProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceCode) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/p/${provinceCode}?depth=2`);
      setAllDistricts(data.districts || []);
      setFilteredDistricts(data.districts || []);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/d/${districtCode}?depth=2`);
      setAllWards(data.wards || []);
      setFilteredWards(data.wards || []);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const openPicker = (type) => {
    setCurrentPicker(type);
    setModalVisible(true);
  };

  const handleValueChange = (value, name) => {
    if (currentPicker === 'province') {
      setSelectedProvince(name);
      setSelectedDistrict(null);
      setSelectedWard(null);
      fetchDistricts(value);
      if (isSender) {
        onUpdateProvinceGiao(value); // Giao
      } else {
        onUpdateProvinceNhan(value); // Nhận
      }
    } else if (currentPicker === 'district') {
      setSelectedDistrict(name);
      setSelectedWard(null);
      fetchWards(value);
      if (isSender) {
        onUpdateDistrictGiao(value); // Giao
      } else {
        onUpdateDistrictNhan(value); // Nhận
      }
    } else if (currentPicker === 'ward') {
      setSelectedWard(name);
      if (isSender) {
        onUpdateWardGiao(value); // Giao
      } else {
        onUpdateWardNhan(value); // Nhận
      }
    }
    setModalVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => openPicker('province')} style={styles.dropdown}>
          <Text>{selectedProvince ? `${selectedProvince}` : 'Chọn tỉnh/thành'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => openPicker('district')} style={styles.dropdown}>
          <Text>{selectedDistrict ? `${selectedDistrict}` : 'Chọn quận/huyện'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openPicker('ward')} style={styles.dropdown}>
          <Text>{selectedWard ? `${selectedWard}` : 'Chọn phường/xã'}</Text>
        </TouchableOpacity>

        <Text style={styles.addressText}>
          {selectedWard && selectedDistrict && selectedProvince
            ? `Địa chỉ: ${selectedWard} - ${selectedDistrict} - ${selectedProvince}`
            : 'Địa chỉ:'}
        </Text>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Picker
                    selectedValue={currentPicker === 'province' ? selectedProvince : currentPicker === 'district' ? selectedDistrict : selectedWard}
                    onValueChange={(value, index) => {
                      const name = currentPicker === 'province' ? filteredProvinces[index].name : 
                                   currentPicker === 'district' ? filteredDistricts[index].name : 
                                   filteredWards[index].name;
                      handleValueChange(value, name);
                    }}
                    mode="dropdown"
                  >
                    {currentPicker === 'province' && filteredProvinces.map((province) => (
                      <Picker.Item key={province.code} label={province.name} value={province.code} />
                    ))}
                    {currentPicker === 'district' && filteredDistricts.map((district) => (
                      <Picker.Item key={district.code} label={district.name} value={district.code} />
                    ))}
                    {currentPicker === 'ward' && filteredWards.map((ward) => (
                      <Picker.Item key={ward.code} label={ward.name} value={ward.code} />
                    ))}
                  </Picker>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </Provider>
  );
};

const Add = () => {
  const [province_code_giao, setProvinceCodeGiao] = useState(null);
  const [province_code_nhan, setProvinceCodeNhan] = useState(null);
  const [district_code_giao, setDistrictCodeGiao] = useState(null);
  const [district_code_nhan, setDistrictCodeNhan] = useState(null);
  const [ward_code_giao, setWardCodeGiao] = useState(null);
  const [ward_code_nhan, setWardCodeNhan] = useState(null);

  const handleUpdateSenderProvince = (value) => {
    setProvinceCodeGiao(value);
    console.log("province_code_giao", value);
  };

  const handleUpdateSenderDistrict = (value) => {
    setDistrictCodeGiao(value);
    console.log("district_code_giao:", value);
  };

  const handleUpdateSenderWard = (value) => {
    setWardCodeGiao(value);
    console.log("ward_code_giao:", value);
  };

  const handleUpdateReceiverProvince = (value) => {
    setProvinceCodeNhan(value);
    console.log("province_code_nhan:", value);
  };

  const handleUpdateReceiverDistrict = (value) => {
    setDistrictCodeNhan(value);
    console.log("district_code_nhan:", value);
  };

  const handleUpdateReceiverWard = (value) => {
    setWardCodeNhan(value);
    console.log("ward_code_nhan:", value);
  };
  console.log("thông tin vị trí gồm:",{
    province_code_giao,
    province_code_nhan,
    district_code_giao,
    district_code_nhan,
    ward_code_giao,
    ward_code_nhan,
  });
  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>Địa chỉ người gửi</Text>
      <AddressPicker
        onUpdateProvinceGiao={handleUpdateSenderProvince}
        onUpdateDistrictGiao={handleUpdateSenderDistrict}
        onUpdateWardGiao={handleUpdateSenderWard}
        isSender={true} // For sender's address
      />
      <Text style={styles.header}>Địa chỉ người nhận</Text>
      <AddressPicker
        onUpdateProvinceNhan={handleUpdateReceiverProvince}
        onUpdateDistrictNhan={handleUpdateReceiverDistrict}
        onUpdateWardNhan={handleUpdateReceiverWard}
        isSender={false} // For receiver's address
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dropdown: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addressText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default Add;
