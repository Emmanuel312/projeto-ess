import firebase from 'firebase'

const config =
{
    apiKey: "AIzaSyBvctgu30QiqLdmRK94DzlvMqaik671CsM",
    authDomain: "cinpresenca.firebaseapp.com",
    databaseURL: "https://cinpresenca.firebaseio.com",
    projectId: "cinpresenca",
    storageBucket: "cinpresenca.appspot.com",
    messagingSenderId: "454366594562",
    appId: "1:454366594562:web:7a5c7f5357007e6f"
}

export const firebaseImpl = firebase.initializeApp(config)
export const firebaseDatabase = firebase.database()