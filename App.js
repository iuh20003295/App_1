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
// import SignInScreen from './screen/SignInScreen';
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
// import {GoogleAuthProvider,
//         onAuthStateChanged,
//         signInWithCredential,
//       } from 'firebase/auth';

// import {auth} from "./firebaseConfig";

// WebBrowser.maybeCompleteAuthSession();

// const Stack = createStackNavigator();

// const App = () => {

//   const[userInfo, setUserInfo] = React.useState();
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     iosClientId:'70559517766-id9s20acggg6boe5dnqj43feiikubdio.apps.googleusercontent.com',
//     androidClientId:'70559517766-glkphjffi99gt4qj5aid9uo278rh1h4k.apps.googleusercontent.com',
//   });

//   React.useEffect(() => {
//     if(response?.type =="success"){
//       const {id_token}= response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response])

//   const [initialRoute, setInitialRoute] = useState("Splash");

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const loggedIn = await AsyncStorage.getItem('isLoggedIn');
//         const userRole = await AsyncStorage.getItem('userRole'); // Assuming you store user role in AsyncStorage
//         console.log(userRole);
//         if (loggedIn === 'true') {
//           if (userRole === 'employee') {
//             setInitialRoute("ShipPage");
//           } else {
//             setInitialRoute("HomePage");
//           }
//         } else {
//           setInitialRoute("Splash");
//         }
//       } catch (error) {
//         console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
//       }
//     };

//     checkLoginStatus();
//   }, []);
  

//   return (
//     <SignInScreen promptAsync={promptAsync}/>
//     // <NavigationContainer>
//     //   <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
//     //     {/* screen */}
//     //     <Stack.Screen name="Splash" component={SplashScreen} />
//     //     <Stack.Screen name="Main" component={MainScreen} />
//     //     <Stack.Screen name="Register" component={RegisterScreen} />
//     //     <Stack.Screen name="Login" component={LoginScreen} />
//     //     <Stack.Screen name="HomePage" component={HomePage} />
//     //     <Stack.Screen name="PriceQuote" component={PriceQuote} />
//     //     <Stack.Screen name="Location" component={Location} />
//     //     <Stack.Screen name="Law" component={Law} />
//     //     <Stack.Screen name="ForgotPass" component={ForgotPass} />
//     //     <Stack.Screen name="CallHelp" component={CallHelp} />
//     //     <Stack.Screen name="CreateOrder" component={CreateOrder} />
//     //     <Stack.Screen name="SignInScreen" promptAsync={promptAsync} component={SignInScreen} />

//     //     {/* shipper */}
//     //     <Stack.Screen name="ShipPage" component={ShipPage} />
//     //     <Stack.Screen name="HistoryShip" component={HistoryShip} />
//     //     <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
//     //     <Stack.Screen name="ProfileShipper" component={ProfileShipper} />
//     //     <Stack.Screen name="AccountShip" component={AccountShip} />
//     //     <Stack.Screen name="OrderShip" component={OrderShip} />
//     //     <Stack.Screen name="Directions" component={Directions} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//   );
// };

// export default App;









import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
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
import SignInWithGoogle from './screen/SignInWithGoogle';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { auth } from "./firebaseConfig";
import ReceiveOrders from './shipper/ReceiveOrders';

WebBrowser.maybeCompleteAuthSession();

const Stack = createStackNavigator();

const App = () => {
  const [userInfo, setUserInfo] = useState();
  const [initialRoute, setInitialRoute] = useState("Splash");

  // Cấu hình Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '70559517766-id9s20acggg6boe5dnqj43feiikubdio.apps.googleusercontent.com',
    androidClientId: '70559517766-glkphjffi99gt4qj5aid9uo278rh1h4k.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  React.useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      }else{
        console.log("User is not authenticated")
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        const userRole = await AsyncStorage.getItem('userRole'); 
        if (loggedIn === 'true') {
          setInitialRoute(userRole === 'employee' ? "ShipPage" : "HomePage");
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
        <Stack.Screen name="SignInWithGoogle">
          {(props) => <SignInWithGoogle {...props} promptAsync={promptAsync} response={response} />}
        </Stack.Screen>
        
        {/* shipper */}
        <Stack.Screen name="ShipPage" component={ShipPage} />
        <Stack.Screen name="HistoryShip" component={HistoryShip} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
        <Stack.Screen name="ProfileShipper" component={ProfileShipper} />
        <Stack.Screen name="AccountShip" component={AccountShip} />
        <Stack.Screen name="OrderShip" component={OrderShip} />
        <Stack.Screen name="Directions" component={Directions} />
        <Stack.Screen name="ReceiveOrders" component={ReceiveOrders} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
