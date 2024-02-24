import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { sendCart, addOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [productsCart, setProductsCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    zip: ''
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem('productCart'));
    if (storageCart && storageCart.length > 0) {
      setProductsCart(storageCart);
      const total = storageCart.reduce((value, product) => {
        return value + product.price * product.quantity;
      }, 0);
      setTotalValue(total);
      setIsCartEmpty(false);
    } else {
      setIsCartEmpty(true);
      setTotalValue(0);
      setShippingCost(0);
    }
  }, []);

  const remove = (id) => {
    const storageCart = JSON.parse(localStorage.getItem('productCart'));
    const filterCart = storageCart.filter((product) => product._id !== id);

    localStorage.setItem('productCart', JSON.stringify(filterCart));
    setProductsCart(filterCart);

    const total = filterCart.reduce((value, product) => {
      return value + product.price * product.quantity;
    }, 0);
    setTotalValue(total);
  };

  const findAddress = async () => {
    const response = await axios.get(
      `https://viacep.com.br/ws/${address.zip}/json`
    );
    setAddress({
      ...address,
      street: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade}`
    });
  };

  const sendOrder = async () => {
    const productOrder = productsCart.map((product) => {
      return {
        _id: product._id,
        quantity: product.quantity
      };
    });
    const cartInfo = {
      products: productOrder,
      totalPrice: totalValue,
      shipping: shippingCost
    };

    const response = await sendCart(cartInfo);
    console.log('response', response);
    if (response.data) {
      const order = {
        products: response.data.products,
        totalPrice: response.data.totalPrice,
        shipping: response.data.shipping,
        isFinished: true
      };

      const responseOrder = await addOrder(order);
      if (responseOrder.data) {
        localStorage.removeItem('productCart');
        navigate('/complete');
      }
    }
  };

  const handleChangeValues = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value
    });
  };

  return (
    <main className="h-screen banner">
      <div className="max-w-screen-xl py-20 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div className="col-span-1">
            <div className="flex flex-col mt-20">
              <h2 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700">
                Adicione seu endereço
              </h2>
              <form className="my-4">
                <div className="flex flex-col space-y-3">
                  <input
                    type="text"
                    name="zip"
                    placeholder="Cep"
                    id="zip"
                    value={address.zip}
                    onChange={handleChangeValues}
                    className="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-1 focus:outline-none transitio duration-300 border border-gray-300 focus:shadow-xl"
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Rua"
                    id="street"
                    value={address.street}
                    onChange={handleChangeValues}
                    onFocus={findAddress}
                    className="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-1 focus:outline-none transitio duration-300 border border-gray-300 focus:shadow-xl"
                  />
                  <input
                    type="text"
                    name="number"
                    placeholder="numero"
                    value={address.number}
                    onChange={handleChangeValues}
                    id="number"
                    className="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-1 focus:outline-none transitio duration-300 border border-gray-300 focus:shadow-xl"
                  />

                  <input
                    type="text"
                    name="complement"
                    placeholder="Complemento"
                    id="complement"
                    value={address.complement}
                    onChange={handleChangeValues}
                    className="w-full px-4 py-3 rounded-lg ring-red-400 focus:ring-1 focus:outline-none transitio duration-300 border border-gray-300 focus:shadow-xl"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-1">
            <div className="glass p-6 box-border rouded-lg">
              <div className="flex flex-col space-y-3">
                {productsCart.map((product, index) => (
                  <div
                    key={product._id + index}
                    className="rouded-lg p-4 flex space-x-3"
                  >
                    <div className="flex">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 object-contain"
                      />
                    </div>
                    <div className="flex flex-col space-y-3 flex-grow">
                      <h5 className="text-base poppins text-gray-700">
                        {product.name}
                      </h5>
                      <h3 className="font-semibold text-lg text-primary poppins">
                        R$ {product.price}
                      </h3>
                    </div>
                    <div className="flex items-center px-4 py-2 space-x-3">
                      <span className="text-lg text-gray-500 select-none">
                        {product.quantity} un
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <AiOutlineDelete
                        onClick={() => remove(product._id)}
                        className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col space-y-3 my-4">
                <div className="flex items-center">
                  <span className="flex-grow poppins text-gray-700">
                    Total:
                  </span>
                  <span className="poppins font-semibold text-black">
                    R$ {totalValue}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-3 my-4">
                <div className="flex items-center">
                  <span className="flex-grow poppins text-gray-700">
                    Frete:
                  </span>
                  <span className="poppins font-semibold text-black">
                    R$: {shippingCost}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-3 my-4">
                <div className="flex items-center">
                  <span className="flex-grow poppins text-gray-700 text-xl">
                    Total com frete
                  </span>
                  <span className="poppins font-semibold text-black text-xl">
                    R$: {totalValue + shippingCost}
                  </span>
                </div>
                <div className="poppins text-black">
                  <p className="poppins text-gray-700">Endereço de entrega:</p>
                  <span className="font-semibold text-black">
                    {address.street}
                  </span>
                  <span className="font-semibold text-black">
                    &nbsp; Número: {address.number} - Complemento:{' '}
                    {address.complement}
                  </span>
                </div>
                <div>
                  <button
                    onClick={sendOrder}
                    disabled={isCartEmpty}
                    className={`w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500 ${
                      isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Enviar Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
