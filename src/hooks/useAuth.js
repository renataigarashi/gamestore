import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginUserApi,
  getUserById,
  registerUserApi
} from '../services/authService';
import api from '../services/api';

const useAuth = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userFull, setUserFull] = useState({});
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
      findUserById(userInfo.user._id);
      setUserLogged(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
    }
    setLoading(false);
  }, []);

  const loginUser = async (inputValues) => {
    try {
      const response = await loginUserApi(inputValues);
      const data = await response.data;
      localStorage.setItem('userInfo', JSON.stringify(data));
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;
      setUserFull(data.user);
      navigate('/');
      setUserLogged(true);
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const logoutUser = () => {
    setUserLogged(false);
    localStorage.clear();
    navigate('/login');
  };

  const findUserById = async (idUser) => {
    const response = await getUserById(idUser);

    setUserFull(response.data);
  };

  const registerUser = async (inputValues) => {
    try {
      const response = await registerUserApi(inputValues);

      if (response.data.message) {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }

      if (response.status === 201) {
        setMessage(
          'Usuário criado com sucesso! Você será redirecionado para a página de login.'
        );
        setTimeout(() => {
          setMessage(null);
          navigate('/login');
        }, 5000);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  return {
    userLogged,
    loading,
    loginUser,
    logoutUser,
    userFull,
    message,
    registerUser
  };
};

export default useAuth;
