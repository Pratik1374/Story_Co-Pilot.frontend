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
  } from "@firebase/auth";
  import { auth } from "../utils/firebase";
  
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
    getToken: () => Promise<string | null>;
  }>({
    user: null,
    loading: true,
    login: (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => Promise.resolve(),
    register: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    getToken: async () => null,
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
  
    const getToken = async () => {
      if (auth.currentUser) {
        console.log('called')
        const tokenResult = await auth.currentUser.getIdTokenResult();
        return tokenResult?.token || null;
      }
      return null;
    };
  
    const login = async (email: string, password: string) => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });
      return userCredential;
    };
  
    const logout = async () => {
      setUser(null);
      return await signOut(auth);
    };
  
    const register = async (email: string, password: string) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });
      return userCredential;
    };
  
    return (
      <AuthContext.Provider value={{ loading, user, login, logout, register, getToken }}>
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
