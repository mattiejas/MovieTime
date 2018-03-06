import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDNDwcEH5OgSWvPl4mNuxgwprJmvJV79xA",
    authDomain: "movietime-hhs.firebaseapp.com",
    databaseURL: "https://movietime-hhs.firebaseio.com",
    projectId: "movietime-hhs",
    storageBucket: "movietime-hhs.appspot.com",
    messagingSenderId: "886263986044"
};

firebase.initializeApp(config);
// const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const auth = firebase.auth();

