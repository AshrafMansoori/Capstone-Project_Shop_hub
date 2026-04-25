import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '8px' }}>
          Your cart is empty <Link to="/" style={{ marginLeft: '10px', textDecoration: 'underline' }}>Go Back</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '3 1 600px' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'var(--surface-color)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', borderRadius: '8px' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=Img' }} />
                <Link to={`/product/${item._id}`} style={{ flex: 1, fontWeight: 'bold' }}>{item.name}</Link>
                <div style={{ width: '80px' }}>${item.price}</div>
                <select
                  style={{ padding: '8px', borderRadius: '4px', background: 'var(--bg-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                  value={item.qty}
                  onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button className="btn btn-danger" onClick={() => removeFromCartHandler(item._id)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h2 style={{ marginBottom: '15px' }}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </div>
              <button
                type="button"
                className="btn"
                style={{ width: '100%', padding: '15px' }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartScreen;
