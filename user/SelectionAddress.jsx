import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const BASE_API_URL = 'https://provinces.open-api.vn/api';

const AddressPicker = () => {
  // Các state lưu giá trị cho tỉnh, huyện, xã
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  // Lưu danh sách được lọc từ API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Gọi API để lấy tất cả các tỉnh
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/p`);
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  // Gọi API để lấy các huyện dựa trên mã tỉnh
  const fetchDistricts = async (provinceCode) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/p/${provinceCode}?depth=2`);
      setDistricts(data.districts || []);
      setSelectedDistrict(null);
      setWards([]);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Gọi API để lấy các xã dựa trên mã huyện
  const fetchWards = async (districtCode) => {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/d/${districtCode}?depth=2`);
      setWards(data.wards || []);
      setSelectedWard(null);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  // Khi người dùng chọn một tỉnh, reset lại các huyện và xã, sau đó gọi API lấy danh sách huyện
  const onProvinceChange = (provinceCode) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null);
    setSelectedWard(null);
    fetchDistricts(provinceCode);
  };

  // Khi người dùng chọn một huyện, reset lại xã và gọi API lấy danh sách xã
  const onDistrictChange = (districtCode) => {
    setSelectedDistrict(districtCode);
    setSelectedWard(null);
    fetchWards(districtCode);
  };

  // Khi người dùng chọn một xã
  const onWardChange = (wardCode) => {
    setSelectedWard(wardCode);
  };

  return (
    <View style={styles.container}>
      {/* Province Picker */}
      <Text style={styles.label}>Chọn Tỉnh</Text>
      <Picker
        selectedValue={selectedProvince}
        onValueChange={(itemValue) => onProvinceChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Chọn Tỉnh" value={null} />
        {provinces.map((province) => (
          <Picker.Item key={province.code} label={province.name} value={province.code} />
        ))}
      </Picker>

      {/* District Picker */}
      <Text style={styles.label}>Chọn Huyện</Text>
      <Picker
        selectedValue={selectedDistrict}
        onValueChange={(itemValue) => onDistrictChange(itemValue)}
        style={styles.picker}
        enabled={!!selectedProvince}
      >
        <Picker.Item label="Chọn Huyện" value={null} />
        {districts.map((district) => (
          <Picker.Item key={district.code} label={district.name} value={district.code} />
        ))}
      </Picker>

      {/* Ward Picker */}
      <Text style={styles.label}>Chọn Xã</Text>
      <Picker
        selectedValue={selectedWard}
        onValueChange={(itemValue) => onWardChange(itemValue)}
        style={styles.picker}
        enabled={!!selectedDistrict}
      >
        <Picker.Item label="Chọn Xã" value={null} />
        {wards.map((ward) => (
          <Picker.Item key={ward.code} label={ward.name} value={ward.code} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
});

export default AddressPicker;
