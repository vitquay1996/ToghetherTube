import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  	apiKey: "AIzaSyDOY_ho1RCjPiU_PAcbxlm30ykJlnzCXfA",
    authDomain: "hacknroll-714bb.firebaseapp.com",
    databaseURL: "https://hacknroll-714bb.firebaseio.com",
    storageBucket: "hacknroll-714bb.appspot.com"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);







// writeUserData('hung');
// Create a reference with .ref() instead of new Firebase(url)


module.exports =firebaseApp;
