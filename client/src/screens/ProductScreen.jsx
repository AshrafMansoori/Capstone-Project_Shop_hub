import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/apiSlice';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <>
      <Link className="btn" to="/" style={{ marginBottom: '20px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
        Go Back
      </Link>
      
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div style={{ color: 'var(--danger-color)' }}>{error?.data?.message || error.error}</div>
      ) : (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x500?text=Product' }} />
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{product.name}</h2>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px' }}>
              Rating: {product.rating} from {product.numReviews} reviews
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
              Price: ${product.price}
            </div>
            <p>{product.description}</p>
          </div>
          <div style={{ flex: '1 1 250px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>Price:</div>
                <div style={{ fontWeight: 'bold' }}>${product.price}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>Status:</div>
                <div>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</div>
              </div>

              {product.countInStock > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
                  <div>Qty:</div>
                  <select
                    style={{ padding: '8px', borderRadius: '4px', background: 'var(--bg-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                className="btn"
                style={{ width: '100%', padding: '15px', marginTop: '10px' }}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
