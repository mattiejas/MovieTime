import { auth } from '../firebase';

export async function register(person) {
  await registerWithFireBase(person.email, person.password);
  const token = await getTokenForCurrentUser();
  let response = await registerWithBackEnd(person, token)
  console.log('response = ', response);
}

async function registerWithFireBase(email, password) {
  return await auth.createUserWithEmailAndPassword(email, password);
}

async function registerWithBackEnd(person, token) {
  const requestHeader =
  {
      'Authorization': 'Bearer ' + token,
      'Content-type': 'Application/json'
  };
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
export async function  getUser() {
  return await auth.currentUser;            
}
