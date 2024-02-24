import api from './api';

const addProductApi = (product) => {
  return api
    .post('/product/create', product)
    .then((response) => response)
    .catch((err) => err);
};

const findAllProductsApi = () => {
  return api
    .get('/product/findAll')
    .then((response) => response)
    .catch((err) => err);
};

const findProductById = (id) => {
  return api
    .get(`/product/findById/${id}`)
    .then((response) => response)
    .catch((err) => err);
};

const updateProductById = (id, productEdit) => {
  return api
    .put(`/product/update/${id}`, productEdit)
    .then((response) => response)
    .catch((err) => err);
};

const deleteProductById = (id) => {
  return api
    .delete(`/product/delete/${id}`)
    .then((response) => response)
    .catch((err) => err);
};

export {
  addProductApi,
  findAllProductsApi,
  findProductById,
  updateProductById,
  deleteProductById
};
