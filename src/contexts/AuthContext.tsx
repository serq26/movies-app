import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";

interface PropTypes {
  children: React.ReactNode;
}

interface User {
  uid: string;
  email: string;
}

export type AuthContextType = {
  user: User;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = (props: PropTypes) => {
  const [user, setUser] = useState<User>({} as User);
  const authentication = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      authentication,
      async (currentuser) => {
        const docRef = doc(firestore, "users", currentuser.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data() as User);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    setUser({} as User);
    await authentication.signOut();
  };

  const values = { user, logout };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
