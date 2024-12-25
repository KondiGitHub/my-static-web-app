import React from 'react';
import { CardContent } from '../components';

const ProductList = ({ products }) => {

  if (!products || products.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <ul className="list">
      {products.map((product) => (
        <li key={product.id} role="presentation">
          <div className="card">
            <CardContent 
              name={product.name} 
              description={product.description} 
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
