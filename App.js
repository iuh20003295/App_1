// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// import MainScreen from './screen/MainScreen';
// import RegisterScreen from './screen/Register';
// import LoginScreen from './screen/LogIn'; 
// import HomePage from './screen/HomePage';
// import PriceQuote from './screen/PriceQuote';
// import Location from './screen/Location';
// import Law from './screen/Law';
// import SplashScreen from './screen/SplashScreen'; 
// import ForgotPass from './screen/ForgotPass';
// import CallHelp from './screen/CallHelp';
// import ShipPage from './shipper/ShipPage';
// import HistoryShip from './shipper/HistoryShip';
// import ProfileShipper from './shipper/ProfileShipper';
// import DeliveryDetails from './shipper/DeliveryDetails';
// import AccountShip from './shipper/AccountShip';
// import OrderShip from './shipper/OrderShip';
// import CreateOrder from './screen/CreateOrder';
// import Directions from './shipper/Directions';

// const Stack = createStackNavigator();

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const loggedIn = await AsyncStorage.getItem('isLoggedIn');
//         setIsLoggedIn(loggedIn === 'true'); // Kiểm tra giá trị trả về
//       } catch (error) {
//         console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
//       }
//     };

//     checkLoginStatus();
//   }, []);
  

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={isLoggedIn ? "HomePage" : "Splash"} screenOptions={{ headerShown: false }}>
//         {/* screen */}
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Main" component={MainScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="HomePage" component={HomePage} />
//         <Stack.Screen name="PriceQuote" component={PriceQuote} />
//         <Stack.Screen name="Location" component={Location} />
//         <Stack.Screen name="Law" component={Law} />
//         <Stack.Screen name="ForgotPass" component={ForgotPass} />
//         <Stack.Screen name="CallHelp" component={CallHelp} />
//         <Stack.Screen name="CreateOrder" component={CreateOrder} />

//         {/* shipper */}
//         <Stack.Screen name="ShipPage" component={ShipPage} />
//         <Stack.Screen name="HistoryShip" component={HistoryShip} />
//         <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
//         <Stack.Screen name="ProfileShipper" component={ProfileShipper} />
//         <Stack.Screen name="AccountShip" component={AccountShip} />
//         <Stack.Screen name="OrderShip" component={OrderShip} />
//         <Stack.Screen name="Directions" component={Directions} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import MainScreen from './screen/MainScreen';
import RegisterScreen from './screen/Register';
import LoginScreen from './screen/LogIn'; 
import HomePage from './screen/HomePage';
import PriceQuote from './screen/PriceQuote';
import Location from './screen/Location';
import Law from './screen/Law';
import SplashScreen from './screen/SplashScreen'; 
import ForgotPass from './screen/ForgotPass';
import CallHelp from './screen/CallHelp';
import ShipPage from './shipper/ShipPage';
import HistoryShip from './shipper/HistoryShip';
import ProfileShipper from './shipper/ProfileShipper';
import DeliveryDetails from './shipper/DeliveryDetails';
import AccountShip from './shipper/AccountShip';
import OrderShip from './shipper/OrderShip';
import CreateOrder from './screen/CreateOrder';
import Directions from './shipper/Directions';

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState("Splash");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        const userRole = await AsyncStorage.getItem('userRole'); // Assuming you store user role in AsyncStorage
        console.log(userRole);
        if (loggedIn === 'true') {
          if (userRole === 'employee') {
            setInitialRoute("ShipPage");
          } else {
            setInitialRoute("HomePage");
          }
        } else {
          setInitialRoute("Splash");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
      }
    };

    checkLoginStatus();
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {/* screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="PriceQuote" component={PriceQuote} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Law" component={Law} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="CallHelp" component={CallHelp} />
        <Stack.Screen name="CreateOrder" component={CreateOrder} />

        {/* shipper */}
        <Stack.Screen name="ShipPage" component={ShipPage} />
        <Stack.Screen name="HistoryShip" component={HistoryShip} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
        <Stack.Screen name="ProfileShipper" component={ProfileShipper} />
        <Stack.Screen name="AccountShip" component={AccountShip} />
        <Stack.Screen name="OrderShip" component={OrderShip} />
        <Stack.Screen name="Directions" component={Directions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
