import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/apiSlice';

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({ keyword: '', pageNumber: 1 });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Products</h1>
        <button className="btn" onClick={createProductHandler} disabled={loadingCreate}>
          Create Product
        </button>
      </div>

      {loadingDelete && <div>Deleting...</div>}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div style={{ color: 'var(--danger-color)' }}>{error?.data?.message || error.error}</div>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>NAME</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>PRICE</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>CATEGORY</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>BRAND</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '15px' }}>{product._id}</td>
                <td style={{ padding: '15px' }}>{product.name}</td>
                <td style={{ padding: '15px' }}>${product.price}</td>
                <td style={{ padding: '15px' }}>{product.category}</td>
                <td style={{ padding: '15px' }}>{product.brand}</td>
                <td style={{ padding: '15px' }}>
                  <button className="btn" style={{ marginRight: '10px' }} onClick={() => navigate(`/admin/product/${product._id}/edit`)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProductListScreen;
