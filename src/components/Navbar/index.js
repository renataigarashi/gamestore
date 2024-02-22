import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BsFillCartFill } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { user, userLogged, logoutUser } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  return (
    <header className="bg-transparent z-50 w-full">
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
        <div className="flex flex-grow items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-36" />
          </Link>
          <h1 className="text-center text-lg font-semibold text-gray-800">
            <Link to="/">GameStore</Link>
          </h1>
        </div>

        {userLogged ? (
          <div className="flex items-center justify-end space-x-4">
            <div className="relative flex cursor-pointer">
              <BsFillCartFill className="w-6 h-6 cursor-pointer" />
            </div>

            <img src="" alt="" />
            <p className="text-gray-700">Bem vindo, {user}</p>
            <MdLogout className="w-6 h-6 cursor-pointer" onClick={logoutUser} />
          </div>
        ) : (
          <div className="flex items-center justify-end space-x-6">
            <button onClick={() => navigate('/login')}>Login</button>
            <button
              onClick={() => {
                navigate('/cadastro');
              }}
              className="bg-primary px-6 py-3 text-white rounded-full transition duration-700 hover:scale-105"
            >
              Cadastrar
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
