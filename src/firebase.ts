import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { authentication, firestore } from "./firebaseConfig";
import { Comments, Favorites } from "./types";

/**
 * User Register with Email and Password
 * @param {string} email
 * @param {string} password
 */
export const createAccount = async (email: string, password: string): Promise<boolean> => {
  try {
    await createUserWithEmailAndPassword(authentication, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, { email, password });
        return true;
      }
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Login with Email and Password
 * @param {string} email
 * @param {string} password
 */
export const signIn = async (email: string, password: string): Promise<boolean>  => {
  try {
    await signInWithEmailAndPassword(authentication, email, password);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Get User's Favorite Movies
 * @param {string} userId
 */
export const fetchFavorites = async (userId: string): Promise<Favorites[]> => {
  try {
    const docRef = doc(firestore, "favorites", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data().movieId;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Add Movie to Favorites
 * @param {number} id
 */
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

/**
 * Remove Movies from User's Favorite Movies
 * @param {number} movieId
 */
export const removeFavorites = async (movieId: number): Promise<void> => {
  try {
    const docRef = doc(firestore, "favorites", authentication.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const newData = docSnap
      .data()
      .movieId.filter((ids: number) => ids !== movieId);
    await updateDoc(
      doc(firestore, "favorites", authentication.currentUser.uid),
      { movieId: newData }
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Add User's or Anonym User's Comment
 * @param {string} name
 * @param {string} comment
 * @param {number} movieId
 * @param {string} userId
 */
export const addComment = async (
  name: string,
  comment: string,
  movieId: number,
  userId: string
): Promise<void> => {
  try {
    if (userId === undefined) {
      console.log("user yok");
      const dbRef = collection(firestore, "comments");
      await addDoc(dbRef, { comments: [{ name, comment, movieId }] });
    } else {
      const docRef = doc(firestore, "comments", authentication.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let prev = [];
        prev = docSnap.data().comments;
        prev.push({ name, comment, movieId });
        await updateDoc(
          doc(firestore, "comments", authentication.currentUser.uid),
          { comments: prev }
        );
      } else {
        await setDoc(
          doc(firestore, "comments", authentication.currentUser.uid),
          { comments: [{ name, comment, movieId }] }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get Movie Comments
 * @param {number} movieId
 */
export const fetchComments = async (movieId: number): Promise<Comments[]> => {
  try {
    const commentsQuery = query(collection(firestore, "comments"));
    const commentsSnapshots = await getDocs(commentsQuery);
    const movieComments: Comments[] = [];

    commentsSnapshots.forEach((doc) => {
      doc.data().comments.filter((data: Comments) => {
        if (data.movieId === movieId) {
          movieComments.push(data);
        }
      });
    });
    return movieComments;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get User Comments
 * @param {string} userId
 */
export const fetchUserComments = async (
  userId: string
): Promise<Comments[]> => {
  try {
    const docRef = doc(firestore, "comments", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data().comments;
  } catch (error) {
    console.log(error);
  }
};
