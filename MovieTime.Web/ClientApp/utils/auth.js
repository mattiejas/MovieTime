import { auth } from '../firebase';
import firebase from 'firebase';
//import { getUnpackedSettings } from 'http2';

export async function register(person) {
    await registerWithFireBase(person.email, person.password);
    const token = await getTokenForCurrentUser();
    let response = await registerWithBackEnd(person, token)
    console.log('response = ', response);
}

async function registerWithFireBase(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
}

function getRequestHeader(token) {
    const requestHeader =
        {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'Application/json'
        };
    return requestHeader;
}

async function registerWithBackEnd(person, token) {
    const requestHeader = getRequestHeader(token);
    const authUser = { Email: person.email }
    console.log('authUser to post = ', authUser);
    let response = await fetch('/auth/register/',
        {
            method: 'post',
            body: JSON.stringify(authUser),
            headers: requestHeader

        });
}

async function getTokenForCurrentUser() {
    return await getUser()
        .then(user => user.getIdToken(true));
}

export function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
    return auth.signOut();
}

//might also be null because the auth object has not finished initializing.
//If you use an observer to keep track of the user's sign-in status, you don't need to handle this case.
export async function getUser() {
    return await auth.currentUser;
}

async function removeUserFromFirebase(password) {
    const user = await auth.currentUser;
    const credential = await firebase.auth.EmailAuthProvider.credential(user.email, password);
    const reAuth = user.reauthenticateWithCredential(credential);
    return await user.delete();
}

async function removeUserFromBackend() {
    const token = await getTokenForCurrentUser();
    const requestHeader = getRequestHeader(token);
    let response = await fetch('/auth/unregister/',
        {
            method: 'post',
            headers: requestHeader
        });

}

export async function removeUser(password) {
    const backendResult = await removeUserFromBackend();
    const fireResult = await removeUserFromFirebase(password);
    
}
