import React, { useEffect, useState } from 'react';
import { findAllCategories } from '../../services/categoryService';
import { MultiSelect } from 'react-multi-select-component';
import { addProductApi } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    barcode: 0,
    categories: [{ _id: '' }]
  });

  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await findAllCategories();
    const categoriesSelect = response.data.map((category) => {
      return {
        value: category._id,
        label: category.name
      };
    });
    console.log('response get categories', response);
    console.log('categoriesSelect', categoriesSelect);

    setCategories(categoriesSelect);
  };

  const handleChangeValues = (event) => {
    setProductForm({ ...productForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoriesIds = selected.map((category) => {
      return {
        _id: category.value
      };
    });
    const product = {
      ...productForm,
      categories: categoriesIds,
      price: parseInt(productForm.price),
      barcode: parseInt(productForm.barcode)
    };
    const response = await addProductApi(product);
    if (response.data) {
      alert(`Produto ${response.data.name} cadastrado com sucesso`);
      navigate('/admin');
    }
  };

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl text-gray-600">Cadastro de Produtos</h1>
      </div>
      <form
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-4">
          <label htmlFor="name" className="text-gray-500 poppins">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-200 focus:ring04 focus:outline-none transition duration-300 focus:shadow-xl"
            placeholder="Adicione o produto"
            onChange={handleChangeValues}
          />
          <label htmlFor="description" className="text-gray-500 poppins">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            cols="30"
            rows="5"
            required
            className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-200 focus:ring04 focus:outline-none transition duration-300 focus:shadow-x"
            onChange={handleChangeValues}
          ></textarea>
          <label htmlFor="barcode" className="text-gray-500 poppins">
            Codigo de Barras
          </label>
          <input
            type="text"
            id="barcode"
            name="barcode"
            required
            className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-200 focus:ring04 focus:outline-none transition duration-300 focus:shadow-xl"
            placeholder="Adicione o codigo de barras"
            onChange={handleChangeValues}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <label htmlFor="price" className="text-gray-500 poppins">
            Preço
          </label>
          <input
            type="text"
            id="price"
            name="price"
            required
            className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-200 focus:ring04 focus:outline-none transition duration-300 focus:shadow-xl"
            placeholder="Adicione o preço"
            onChange={handleChangeValues}
          />
          <label htmlFor="image" className="text-gray-500 poppins">
            Imagem
          </label>
          <input
            type="text"
            id="image"
            name="image"
            required
            className="w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-200 focus:ring04 focus:outline-none transition duration-300 focus:shadow-xl"
            placeholder="Adicione o link da Imagem"
            onChange={handleChangeValues}
          />
          <label htmlFor="category" className="text-gray-500 poppins">
            Categoria
          </label>
          <MultiSelect
            options={categories}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
          <div className="mt-8">
            <button className="w-full py-3 bg-primary text-white focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300">
              Adicionar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;
