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

//might also be null because the auth object has not finished initializing.
//If you use an observer to keep track of the user's sign-in status, you don't need to handle this case.
export function getUser() {
  return auth.currentUser;            
}

export function getRequestHeaderForCurrentUser() {
  return new Promise((resolve, reject) => {
    const user = getUser();
    if (user) {
      user.getIdToken(true)
        .then((token) => {
          resolve({ 'Authorization': 'Bearer ' + token });
        })
        .catch(err => reject(err))
    } else {
      reject(new Error('No logged in user'));
    }
  });
}