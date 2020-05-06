import firebase from 'firebase'

 const firebaseConfig = {
    apiKey: "AIzaSyAzdDwl3lJWqzv6DhVtpCyAXBJLiHuhtAQ",
    authDomain: "healthcare-821af.firebaseapp.com",
    databaseURL: "https://healthcare-821af.firebaseio.com",
    projectId: "healthcare-821af",
    storageBucket: "healthcare-821af.appspot.com",
    messagingSenderId: "326329839682",
    appId: "1:326329839682:web:2fe466c027d6a5bf3d7ddb"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;

