import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKcMb53RdZ2lzYn72doCX9UHxykWk-jzw",
  authDomain: "tutorial-signin-989c2.firebaseapp.com",
  projectId: "tutorial-signin-989c2",
  storageBucket: "tutorial-signin-989c2.appspot.com",
  messagingSenderId: "338141066793",
  appId: "1:338141066793:web:c0ba8bb7cc1b136336ce38"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//ios: 70559517766-id9s20acggg6boe5dnqj43feiikubdio.apps.googleusercontent.com
//and: 70559517766-glkphjffi99gt4qj5aid9uo278rh1h4k.apps.googleusercontent.com