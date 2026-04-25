import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="form-container">
      <h1 style={{ marginBottom: '20px' }}>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" className="form-control" placeholder="Enter address" value={address} required onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" className="form-control" placeholder="Enter city" value={city} required onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" className="form-control" placeholder="Enter postal code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" className="form-control" placeholder="Enter country" value={country} required onChange={(e) => setCountry(e.target.value)} />
        </div>
        <button type="submit" className="btn" style={{ width: '100%' }}>Continue</button>
      </form>
    </div>
  );
};

export default ShippingScreen;
