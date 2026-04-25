import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/apiSlice';

const HomeScreen = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword: keyword || '', pageNumber: 1 });

  return (
    <>
      {keyword && <Link to="/" className="btn" style={{ marginBottom: '20px' }}>Go Back</Link>}
      <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>{keyword ? `Search Results for "${keyword}"` : 'Latest Products'}</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div style={{ color: 'var(--danger-color)' }}>{error?.data?.message || error.error}</div>
      ) : (
        <div className="product-grid">
          {data.products.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                {/* Fallback image if local image not present */}
                <img src={product.image} alt={product.name} className="card-img-top" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x250?text=Product' }} />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}>
                  <h3 className="card-title">{product.name}</h3>
                </Link>
                <div className="card-text">
                  Rating: {product.rating} from {product.numReviews} reviews
                </div>
                <h3 className="price">${product.price}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
