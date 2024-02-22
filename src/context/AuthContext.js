import { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    user,
    userLogged,
    loading,
    loginUser,
    logoutUser,
    message,
    registerUser
  } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider
      value={{ user, userLogged, loginUser, logoutUser, message, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
