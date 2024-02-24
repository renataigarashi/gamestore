import api from './api';

const findAllCategories = () => {
  return api
    .get('/category/findAll')
    .then((response) => response)
    .catch((err) => err);
};

export { findAllCategories };
