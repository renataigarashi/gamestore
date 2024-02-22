import React from 'react';
import ProductList from '../../components/ProductList';

const Home = () => {
  return (
    <>
      <section className="home-banner w-full">
        <div className="flex flex-col item-center justify-center h-full">
          <h1 className="text-center text-xl md:text-xl lg:text-3xl font-semibold text-zinc-50 shadow-xl">
            Encontre os melhores games aqui!
          </h1>
        </div>
      </section>
      <ProductList />
    </>
  );
};

export default Home;
