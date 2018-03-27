import firebase from 'firebase';
import auth from '../firebase';

async function registerWithFireBase(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// might also be null because the auth object has not finished initializing.
// If you use an observer to keep track of the user's sign-in status,
// you don't need to handle this case.
export async function getUser() {
  return auth.currentUser;
}

async function getTokenForCurrentUser() {
  return getUser().then(user => user.getIdToken(true));
}

function getRequestHeader(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-type': 'Application/json',
  };
}

export function getTokenAndRequestHeader() {
  return getTokenForCurrentUser().then(token => getRequestHeader(token));
}

async function registerWithBackEnd(person, token) {
  const requestHeader = getRequestHeader(token);
  const data = {
    method: 'post',
    body: JSON.stringify(person),
    headers: requestHeader,
  };
  await fetch('/auth/register/', data);
}

export function logout() {
  return auth.signOut();
}

export async function register(person) {
  return registerWithFireBase(person.email, person.password)
    .then(() => getTokenForCurrentUser())
    .then(token => registerWithBackEnd(person, token))
    .then(() => ({
      success: true,
      message: 'Success',
    }))
    .catch(err => ({
      success: false,
      message: err.message,
    }));
}

export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

async function removeUserFromFirebase(password) {
  const user = await auth.currentUser;
  const credential = await firebase.auth.EmailAuthProvider.credential(user.email, password);
  user.reauthenticateWithCredential(credential);
  return user.delete();
}

async function removeUserFromBackend() {
  const token = await getTokenForCurrentUser();
  const requestHeader = getRequestHeader(token);
  await fetch('/auth/unregister/', {
    method: 'post',
    headers: requestHeader,
  });
}

export async function removeUser(password) {
  await removeUserFromBackend();
  await removeUserFromFirebase(password);
}

async function newGoogleLoginHappened(user) {
  if (user) {
    console.log('NewGoogleLoginInHappened, we already have a user', user);
  } else {
    console.log('NewGoogleLoginInHappened, we are about to create a google provider to redirect to');
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then((result) => {
        console.log('NewGoogleLoginInHappened,', result);
      });
  }
}

export async function signInWithGoogle(user) {
  newGoogleLoginHappened(user);
}
