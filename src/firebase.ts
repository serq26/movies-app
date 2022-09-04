import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { authentication, firestore } from "./firebaseConfig";

export const createAccount = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(authentication, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, { email, password });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(authentication, email, password);
    console.log("RES",result)
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  await authentication.signOut();
};
