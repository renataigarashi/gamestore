import api from './api';

const loginUserApi = (userValues) => {
  return api
    .post('/user/login', userValues)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

const registerUserApi = (userValues) => {
  return api
    .post('/user/register', userValues)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

const getUserById = (idUser) => {
  return api
    .get(`/user/findById/${idUser}`)
    .then((response) => response)
    .catch((err) => console.error('Error na chamada', err));
};

export { loginUserApi, registerUserApi, getUserById };
