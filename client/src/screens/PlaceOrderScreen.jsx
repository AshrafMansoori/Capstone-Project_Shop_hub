import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/apiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          ...item,
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/profile`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      <div style={{ flex: '3 1 600px' }}>
        <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </div>
        
        <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </p>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <h2>Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cart.cartItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--border-color)', padding: '10px 0' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', borderRadius: '4px' }} />
                  <Link to={`/product/${item._id}`} style={{ flex: 1 }}>{item.name}</Link>
                  <div>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ flex: '1 1 300px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <h2>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>Items</div><div>${cart.itemsPrice}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>Shipping</div><div>${cart.shippingPrice}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>Tax</div><div>${cart.taxPrice}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold' }}>
            <div>Total</div><div>${cart.totalPrice}</div>
          </div>
          {error && <div style={{ color: 'var(--danger-color)', marginBottom: '15px' }}>{error?.data?.message || error.error}</div>}
          <button
            type="button"
            className="btn"
            style={{ width: '100%', padding: '15px' }}
            disabled={cart.cartItems === 0 || isLoading}
            onClick={placeOrderHandler}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
