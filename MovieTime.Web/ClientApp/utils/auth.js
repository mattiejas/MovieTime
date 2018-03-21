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
  return getUser()
    .then(user => user.getIdToken(true));
}


function getRequestHeader(token) {
  return { Authorization: `Bearer ${token}`, 'Content-type': 'Application/json' };
}

export function getTokenAndRequestHeader() {
  return getTokenForCurrentUser()
    .then(token => getRequestHeader(token));
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

export async function register(person) {
  await registerWithFireBase(person.email, person.password);
  const token = await getTokenForCurrentUser();
  await registerWithBackEnd(person, token);
}

export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth.signOut();
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
  await fetch('/auth/unregister/', { method: 'post', headers: requestHeader });
}

export async function removeUser(password) {
  await removeUserFromBackend();
  await removeUserFromFirebase(password);
}
