import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA4IVtwgW2Q2BhOhNw5QJ7MhBMnr_E5wEA",
  authDomain: "denverpickupsoccer.firebaseapp.com",
  projectId: "denverpickupsoccer",
  storageBucket: "denverpickupsoccer.appspot.com",
  messagingSenderId: "823515802871",
  appId: "1:823515802871:web:2ef79040298f2504e477f2",
  measurementId: "G-1BED8SWYQ2"
};

initializeApp(firebaseConfig);
const auth = getAuth()

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

const createNewUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const getCurrentUser = async (callback) => {
  await onAuthStateChanged(auth, callback);
}

const signOutUser = () => {
  return signOut(auth)
}

export { signInUser, createNewUser, getCurrentUser, signOutUser }
