import { useState } from 'react';

import productsMock from '../../mocks/products';
import Product from '../Product';

const ProductList = () => {
  const [products, setProducts] = useState(productsMock);
  console.log(products);

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
