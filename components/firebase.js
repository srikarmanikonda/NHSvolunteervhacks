import * as firebase from 'firebase';
import 'firebase/auth';
const firebaseConfig = {
   apiKey: "AIzaSyAgLIgqB2iI4M1mf9Jy-BRBqshe29BBaH8",
   authDomain: "alpine-flare-274320.firebaseapp.com",
   databaseURL: "https://alpine-flare-274320.firebaseio.com",
   projectId: "alpine-flare-274320",
   storageBucket: "alpine-flare-274320.appspot.com",
   messagingSenderId: "415010913513",
   appId: "1:415010913513:web:f1fe11902a248098770478",
   measurementId: "G-JM2FCV0H5L"
 };
 firebase.initializeApp(firebaseConfig);
 var database = firebase.database();
 export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
