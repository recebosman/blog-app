import { useState, useEffect } from "react";
import { createContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const addUserInfo = async (name, email) => {
    await addDoc(collection(db, "users"), {
      name,
      email,
    });
  };

  const addPost = async (title, desc, category, image) => {
    await addDoc(collection(db, "posts"), {
      title,
      desc,
      category,
      image,
      user: user.displayName,
    });
  };

  const userInfo = (displayName) => {
    return updateProfile(auth.currentUser, { displayName });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    userInfo,
    addUserInfo,
    addPost,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
