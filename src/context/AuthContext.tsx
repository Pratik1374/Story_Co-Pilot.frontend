"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "@firebase/auth";
import { auth } from "../utils/firebase";

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext<{
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<UserCredential>;
  getLatestToken: () => Promise<string | null>;
  loginWithGoogle: () => Promise<UserCredential>;
  registerWithGoogle: () => Promise<UserCredential>;
}>({
  user: null,
  loading: true,
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),
  logout: () => Promise.resolve(),
  register: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),
  getLatestToken: async () => null,
  loginWithGoogle: () => signInWithPopup(getAuth(), googleProvider),
  registerWithGoogle: () => signInWithPopup(getAuth(), googleProvider),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getLatestToken = async () => {
    if (auth.currentUser) {
      const tokenResult = await auth.currentUser.getIdTokenResult();
      return tokenResult?.token || null;
    }
    return null;
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    });
    return userCredential;
  };

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(getAuth(), googleProvider);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });
      return userCredential;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    return await signOut(auth);
  };

  const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    });
    return userCredential;
  };

  const registerWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(getAuth(), googleProvider);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });
      return userCredential;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
        register,
        getLatestToken,
        loginWithGoogle,
        registerWithGoogle,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
