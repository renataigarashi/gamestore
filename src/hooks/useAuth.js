import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      setUserLogged(true);
      const parsedJson = JSON.parse(userInfo);
      const name = parsedJson.user.name;

      setUser(name);
    }
    setLoading(false);
  }, []);

  const loginUser = async (inputValues) => {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValues)
    });

    const data = await response.json();

    if (response.ok) {
      setUser(data.user.name);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
      setUserLogged(true);
    } else {
      if (data.message) {
        setMessage(data.message);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };

  const registerUser = async (inputValues) => {
    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValues)
    });

    const data = await response.json();

    if (data.message) {
      setMessage(data.message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    if (response.status === 201) {
      setMessage(
        'Usuário criado com sucesso! Você será redirecionado para a página de login.'
      );
      setTimeout(() => {
        setMessage(null);
        navigate('/login');
      }, 6000);
    }
  };

  const logoutUser = () => {
    setUserLogged(false);
    localStorage.clear();
    navigate('/login');
  };

  return {
    user,
    userLogged,
    loading,
    message,
    loginUser,
    logoutUser,
    registerUser
  }; // aqui
};

export default useAuth;
