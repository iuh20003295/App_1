import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const PriceQuote = () => {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('');
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState(0);
  const [cost, setCost] = useState(0);
  const [suggestionsStart, setSuggestionsStart] = useState([]);
  const [suggestionsEnd, setSuggestionsEnd] = useState([]);

  const apiKey = 'JcbY4XTk4jIoN83asoodeHWyIKEvjbnsvmVe2I5y';

  const getGeocode = async (address, setCoords, setSuggestions) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=${apiKey}`
      );
      const data = await response.json();
      const results = data.results;

      if (results && results.length > 0) {
        setCoords(results[0].geometry.location);
        setSuggestions(results.map((result) => result.formatted_address));
      } else {
        setSuggestions([]); // Clear suggestions if no results
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
    }
  };

  const getRoute = async (start, end) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/Direction?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&vehicle=car&api_key=${apiKey}`
      );
      const data = await response.json();
      return data.routes[0].legs[0].distance.value; // distance in meters
    } catch (error) {
      console.error('Route calculation failed:', error);
    }
  };

  const calculateShippingCost = (weight, distance) => {
    const pricePerKm = 10000; // Example: 10,000 VND per km
    return (distance / 1000) * pricePerKm; // Convert meters to km
  };

  const handleCalculate = async () => {
    if (!startCoords || !endCoords) {
      Alert.alert('Error', 'Please provide valid start and end addresses.');
      return;
    }

    const distance = await getRoute(startCoords, endCoords);
    const shippingCost = calculateShippingCost(weight, distance);
    setDistance(distance);
    setCost(shippingCost);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.controls}>
        <Text>Địa chỉ gửi:</Text>
        <TextInput
          style={styles.input}
          value={startAddress}
          onChangeText={text => {
            setStartAddress(text);
            getGeocode(text, setStartCoords, setSuggestionsStart);
          }}
          placeholder="Nhập địa điểm gửi"
        />
        {suggestionsStart.map((suggestion, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => {
              setStartAddress(suggestion);
              setSuggestionsStart([]); // Clear suggestions on selection
              getGeocode(suggestion, setStartCoords, () => {}); // Optionally get coordinates
            }}>
            <Text style={styles.suggestion}>{suggestion}</Text>
          </TouchableOpacity>
        ))}

        <Text>Địa chỉ nhận:</Text>
        <TextInput
          style={styles.input}
          value={endAddress}
          onChangeText={text => {
            setEndAddress(text);
            getGeocode(text, setEndCoords, setSuggestionsEnd);
          }}
          placeholder="Nhập địa điểm nhận"
        />
        {suggestionsEnd.map((suggestion, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => {
              setEndAddress(suggestion);
              setSuggestionsEnd([]); // Clear suggestions on selection
              getGeocode(suggestion, setEndCoords, () => {}); // Optionally get coordinates
            }}>
            <Text style={styles.suggestion}>{suggestion}</Text>
          </TouchableOpacity>
        ))}

        <Text>Khối lượng (KG):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Nhập khối lượng"
          keyboardType="numeric"
        />

        <Text>Hình thức vận chuyển:</Text>
        <RNPickerSelect
          onValueChange={value => setShippingMethod(value)}
          items={[
            { label: 'Giao hàng nhanh', value: 'GHN' },
            { label: 'Giao hàng tiết kiệm', value: 'GHTK' },
          ]}
        />

        <Button title="TÍNH CƯỚC VẬN CHUYỂN" onPress={handleCalculate} />

        {distance > 0 && (
          <Text style={styles.result}>
            Khoảng cách: {(distance / 1000).toFixed(2)} km
          </Text>
        )}
        {cost > 0 && (
          <Text style={styles.result}>
            Tổng phí dự kiến: {cost.toLocaleString('en-GB')} VND
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  controls: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  result: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PriceQuote;
