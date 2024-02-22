import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const { loginUser, message } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeValues = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(inputValues);
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="text-orange-600 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {message && <p className="text-xl italic mb-4">{message}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Digite seu email"
            name="email"
            onChange={handleChangeValues}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Digite sua senha"
            name="password"
            onChange={handleChangeValues}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 hover:scale-105"
            type="submit"
          >
            Entrar
          </button>
          <p
            onClick={() => {
              navigate('/cadastro');
            }}
            className="text-base text-primary text-center my-6 hover:underline cursor-pointer"
          >
            Precisa de uma conta?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
