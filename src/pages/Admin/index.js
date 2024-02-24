import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteProductById,
  findAllProductsApi
} from '../../services/productService';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    const response = await findAllProductsApi();
    setProducts(response.data);
  };

  const removeProduct = async (id) => {
    const answer = window.confirm('Deseja excluir o produto? ');
    if (answer) {
      await deleteProductById(id);
      getAllProducts();
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="my-12 max-w-scree-xl mx-auto px-6">
      <div className="flex justify-end space-y-2">
        <button
          onClick={() => navigate('/admin/add-product')}
          className="bg-primary px-6 py-3 text-white rounded-full transition duration-700 hover:scale-105"
        >
          Adiciona Produto
        </button>
      </div>
      <div className="flex flex-col my-8">
        <div className="overflow-x-auto sm:mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden sm:rounded-lg-shadow-md">
              <table className="min-w-full">
                <thead className="bg-primary">
                  <tr>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Imagem
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Preco
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Código de barras
                    </th>
                    <th
                      scope="col"
                      className="relative text-white px-6 py-3 text-left uppercase tracking-wider"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium">
                        {product.barcode}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap flex flex-col h-24 items-center justify-center">
                        <div className="flex items-center justify-center space-x-3">
                          <Link to={`/admin/edit-product/${product._id}`}>
                            <FaEdit className="cursor-pointer text-2xl text-blue-600" />
                          </Link>
                          <MdDelete
                            onClick={() => {
                              removeProduct(product._id);
                            }}
                            className="cursor-pointer text-2xl text-red-600"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
