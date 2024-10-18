import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Directions = () => {
  const navigation = useNavigation();
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [vehicle, setVehicle] = useState('car');
  const [suggestionsStart, setSuggestionsStart] = useState([]);
  const [suggestionsEnd, setSuggestionsEnd] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // To store route points
  const [region, setRegion] = useState({
    latitude: 21.028511, // Default to somewhere central in Vietnam
    longitude: 105.804817,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const apiKey = 'JcbY4XTk4jIoN83asoodeHWyIKEvjbnsvmVe2I5y';

  const getGeocode = async (address, setCoords, setSuggestions) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=${apiKey}`
      );
      const data = await response.json();
      const results = data.results;

      if (results && results.length > 0) {
        setSuggestions(results.map((result) => ({
          formatted_address: result.formatted_address,
          location: result.geometry.location,
        })));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
    }
  };

  const handleAddressSelect = (suggestion, setAddress, setCoords) => {
    setAddress(suggestion.formatted_address);
    setCoords(suggestion.location); // Set coordinates
    setSuggestionsStart([]);
    setSuggestionsEnd([]);
  };

  const getRoute = async () => {
    if (!startCoords || !endCoords) {
      Alert.alert('Error', 'Please select valid start and end addresses.');
      return;
    }

    try {
      const response = await fetch(
        `https://rsapi.goong.io/Direction?origin=${startCoords.lat},${startCoords.lng}&destination=${endCoords.lat},${endCoords.lng}&vehicle=${vehicle}&api_key=${apiKey}`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const routePoints = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(routePoints); // Decode polyline
        setRouteCoordinates(decodedPoints);
        setRegion({
          latitude: (startCoords.lat + endCoords.lat) / 2, // Center the map between start and end points
          longitude: (startCoords.lng + endCoords.lng) / 2,
          latitudeDelta: Math.abs(startCoords.lat - endCoords.lat) + 0.1,
          longitudeDelta: Math.abs(startCoords.lng - endCoords.lng) + 0.1,
        });
      } else {
        Alert.alert('Error', 'No route found.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Failed to get route.');
    }
  };

  // Helper function to decode polyline
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5
      });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {startCoords && (
          <Marker
            coordinate={{
              latitude: startCoords.lat,
              longitude: startCoords.lng
            }}
            title="Điểm đi"
            pinColor="green"
          />
        )}
        {endCoords && (
          <Marker
            coordinate={{
              latitude: endCoords.lat,
              longitude: endCoords.lng
            }}
            title="Điểm đến"
            pinColor="red"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#0000FF"
            strokeWidth={3}
          />
        )}
      </MapView>

      <ScrollView style={styles.controls}>
        <Text style={styles.label}>Điểm đi:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ điểm đi"
          value={startAddress}
          onChangeText={text => {
            setStartAddress(text);
            getGeocode(text, setStartCoords, setSuggestionsStart);
          }}
        />
        {suggestionsStart.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAddressSelect(suggestion, setStartAddress, setStartCoords)}
          >
            <Text style={styles.suggestion}>{suggestion.formatted_address}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Điểm đến:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ điểm đến"
          value={endAddress}
          onChangeText={text => {
            setEndAddress(text);
            getGeocode(text, setEndCoords, setSuggestionsEnd);
          }}
        />
        {suggestionsEnd.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAddressSelect(suggestion, setEndAddress, setEndCoords)}
          >
            <Text style={styles.suggestion}>{suggestion.formatted_address}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Phương tiện:</Text>
        <RNPickerSelect
          onValueChange={setVehicle}
          value={vehicle}
          items={[
            { label: 'Xe hơi', value: 'car' },
            { label: 'Xe đạp', value: 'bike' },
            { label: 'Taxi', value: 'taxi' },
            { label: 'Xe tải', value: 'truck' },

          ]}
        />

        <Button title="Lấy chỉ đường" onPress={getRoute} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  map: {
    flex: 1,
    width: '100%',
    height:'100%',
  },
  controls: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestion: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 10,
    zIndex: 1,
  },
});

export default Directions;
