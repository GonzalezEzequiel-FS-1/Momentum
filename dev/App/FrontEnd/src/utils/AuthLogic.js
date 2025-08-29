import {
  updateProfile,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,

} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import axios from 'axios';
import { DBURL } from "./environment";


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
let errorMessage;
//const API_URI = 'http://localhost:6969/api'; // added /api for consistency

const emailAndPasswordLogin = async (email, password) => {
  if (!email || !password || !auth) {
    return { success: false, error: "Please provide required credentials", authStatus: false };
  }
  try {
    await setPersistence(auth, browserLocalPersistence)
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    return { success: true, data: userCredential, authStatus: true };
  } catch (err) {
    console.log(err.message)
    if(err.message === "Firebase: Error (auth/invalid-credential)."){
          errorMessage = "Invalid User Name and Password Combination"
    }else if(err.message === "Firebase: Error (auth/too-many-requests)."){
          errorMessage = "Invalid User Name and Password Combination"
    }else{errorMessage === err.message}

    // 
    return { success: false, error: errorMessage, authStatus: false };
  }
};

const socialSignIn = async (provider) => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const { uid, displayName, email, photoURL } = auth.currentUser;

    await axios.post(`${DBURL}/user`, {
      uid,
      displayName,
      email,
      photoURL
    });

    return { success: true, data: userCredential, authStatus: true };
  } catch (err) {
    return { success: false, error: err.message, authStatus: false };
  }
};

const googleSignIn = () => socialSignIn(googleProvider);
const facebookSignIn = () => socialSignIn(facebookProvider);

const emailAndPasswordSignUp = async (userName, email, password) => {
  if (!email || !password) {
    return { success: false, error: "Please provide required credentials", authStatus: false };
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: userName });
    const { uid, photoURL } = auth.currentUser;

    await axios.post(`${DBURL}/user`, {
      uid,
      displayName: userName,
      email,
      photoURL
    });

    return { success: true, data: userCredential, authStatus: true };
  } catch (err) {
    return { success: false, error: err.message, authStatus: false };
  }
};

const signOff = async () => {
  try {
    await signOut(auth);
    return { success: true, authStatus: false };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


const deleteAccount = async () => {
  //console.log('TESTING')
  const uid = auth.currentUser.uid;
  if (!auth.currentUser) {
    return { success: false, error: "User not authenticated" };
  }
  //console.log('Before UID Check')
  if (!uid) {
    return { success: false, error: "No provided" }
  }
  //console.log(uid)
  //console.log('After UID CHeck')

  console.error(`${DBURL}/user/${uid}`)
  try {
    const deletedFromFirebase = await auth.currentUser.delete();
    if (!deletedFromFirebase) {
      ///console.log('Unable to delete from firebase')
    }
    //console.log('inside try')
    await axios.delete(`${DBURL}/user/${uid}`)
  } catch (err) {
    console.error(err.message)
    return { success: false, error: err.message }
  }
}

export {
  emailAndPasswordLogin,
  emailAndPasswordSignUp,
  googleSignIn,
  facebookSignIn,
  signOff,
  deleteAccount
};
