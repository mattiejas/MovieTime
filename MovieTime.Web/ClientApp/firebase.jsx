import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBwd4udqmlGAPCe5EFTI4jCxWlN1-0_4Ks',
  authDomain: 'movietime-hhs-c73b9.firebaseapp.com',
  databaseURL: 'https://movietime-hhs-c73b9.firebaseio.com',
  projectId: 'movietime-hhs-c73b9',
  storageBucket: '',
  messagingSenderId: '473517215049',
};

firebase.initializeApp(config);
// const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const auth = firebase.auth();

