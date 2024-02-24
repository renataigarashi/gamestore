import { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    userLogged,
    userFull,
    loading,
    loginUser,
    logoutUser,
    message,
    registerUser
  } = useAuth();

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        userFull,
        loginUser,
        logoutUser,
        message,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
