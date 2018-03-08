import { auth } from '../firebase';

export function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth.signOut();
}
