import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import PropTypes from "prop-types";

const AuthContext = createContext({
  uid: null,
  userLoaded:false,
  email: null,
  displayName: null,
  providerId:null,
  user: null,
  logout: () => {},
  isLogged: false,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [uid, setUID] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [providerId, setProviderId] = useState('');
  const [userLoaded, setUserLoaded] = useState('')

  const isLogged = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setProviderId(user.providerData[0]?.providerId);
        setUID(user.uid);
        setEmail(user.email);
        setDisplayName(user.displayName);
      } else {
        setUser(null);
        setProviderId('')
        setUID('');
        setEmail('');
        setDisplayName('');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, providerId, uid, displayName, email, logout, isLogged, loading, setUserLoaded ,userLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
