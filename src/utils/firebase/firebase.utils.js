import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB1_L_byatElEg2CMNqGN1IJVfSpLJjNfU",
    authDomain: "ppforjj-b0cf0.firebaseapp.com",
    projectId: "ppforjj-b0cf0",
    storageBucket: "ppforjj-b0cf0.appspot.com",
    messagingSenderId: "1068356443908",
    appId: "1:1068356443908:web:b1c57ccb179e9e57faba51"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc( db, 'users', userAuth.uid );
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc (
                userDocRef,
                {
                    displayName,
                    email,
                    createdAt
                }
            );
        } catch (error) {
            console.log('Error Creating the User', error.message);
        }
    }

    return userDocRef;
  }
