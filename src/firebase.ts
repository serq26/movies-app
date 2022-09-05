import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { authentication, firestore } from "./firebaseConfig";
import { Comments, Favorites } from "./types";

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
    await signInWithEmailAndPassword(authentication, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const fetchFavorites = async (userId: string): Promise<Favorites[]> => {
  try {
    const docRef = doc(firestore, "favorites", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data().movieId;
  } catch (error) {
    console.log(error);
  }
}

export const addFavorites = async (id: number): Promise<void> => {
  try {
    const docRef = doc(firestore, "favorites", authentication.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let prev = [];
      prev = docSnap.data().movieId;
      prev.push(id);
      await updateDoc(
        doc(firestore, "favorites", authentication.currentUser.uid),
        { movieId: prev }
      );
    } else {
      await setDoc(
        doc(firestore, "favorites", authentication.currentUser.uid),
        { movieId: [id] }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFavorites = async (movieId: number): Promise<void> => {
  try {
    const docRef = doc(firestore, "favorites", authentication.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const newData = docSnap.data().movieId.filter((ids: number) => ids !== movieId);
    await updateDoc(
      doc(firestore, "favorites", authentication.currentUser.uid), {movieId: newData}
    );
  } catch (error) {
    console.log(error);
  }
};


export const addComment = async (name: string, comment: string, movieId: number): Promise<void> => {
  console.log(name,comment,movieId)
  try {
    const docRef = doc(firestore, "comments", authentication.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let prev = [];
      prev = docSnap.data().comments;
      prev.push({name,comment,movieId});
      await updateDoc(
        doc(firestore, "comments", authentication.currentUser.uid),
        { comments: prev }
      );
    } else {
      await setDoc(
        doc(firestore, "comments", authentication.currentUser.uid),
        { comments: [{name,comment,movieId}] }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchComments = async (movieId: number): Promise<Comments[]> => {
  try {
    const commentsQuery = query(collection(firestore, "comments"));
    const commentsSnapshots = await getDocs(commentsQuery);
    const movieComments: Comments[] = [];

    commentsSnapshots.forEach((doc) => {
      doc.data().comments.filter((data: Comments) => {
        if(data.movieId === movieId) {
          movieComments.push(data)
        }
      })
    });
    return movieComments;
  } catch (error) {
    console.log(error);
  }
}

export const fetchUserComments = async (userId: string): Promise<Comments[]> => {
  try {
    const docRef = doc(firestore, "comments", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data().comments;
  } catch (error) {
    console.log(error);
  }
}