import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

import { findAllCategories } from '../../services/categoryService';
import {
  findProductById,
  updateProductById
} from '../../services/productService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    getCategories();
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await findProductById(id);
    setProductForm(response.data);
  };

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

    const response = await updateProductById(id, productForm);

    if (response.data) {
      alert(`Produto ${response.data.name} editado com sucesso`);
      navigate('/admin');
    }
  };

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl text-gray-600">Edição de Produto</h1>
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
            value={productForm.name}
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
            value={productForm.description}
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
            value={productForm.barcode}
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
            value={productForm.price}
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
            value={productForm.image}
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
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300"
            >
              Editar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
export default EditProduct;
