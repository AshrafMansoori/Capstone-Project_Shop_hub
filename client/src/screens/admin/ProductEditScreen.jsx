import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/apiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res);
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn" style={{ marginBottom: '20px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
        Go Back
      </Link>
      <div className="form-container">
        <h1>Edit Product</h1>
        {loadingUpdate && <h2>Updating...</h2>}
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <div style={{ color: 'var(--danger-color)' }}>{error?.data?.message || error.error}</div>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" className="form-control" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input type="text" id="image" className="form-control" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)} />
              <input type="file" id="image-file" className="form-control" style={{ marginTop: '10px' }} onChange={uploadFileHandler} />
              {loadingUpload && <div>Uploading...</div>}
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" className="form-control" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="countInStock">Count In Stock</label>
              <input type="number" id="countInStock" className="form-control" placeholder="Enter stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input type="text" id="category" className="form-control" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" id="description" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Update</button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
