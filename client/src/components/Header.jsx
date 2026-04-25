import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox.jsx';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="container header-container">
        <Link to="/" className="logo">
          SHOP<span style={{ color: 'var(--primary-color)' }}>HUB</span>
        </Link>
        <SearchBox />
        <nav className="nav-links">
          <Link to="/cart">
            CarT
            {cartItems.length > 0 && (
              <span style={{ marginLeft: '5px', background: 'var(--primary-color)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <>
              <Link to="/profile">{userInfo.name}</Link>
              {userInfo.isAdmin && (
                <>
                  <Link to="/admin/productlist" style={{ color: 'var(--success-color)' }}>Products</Link>
                  <Link to="/admin/orderlist" style={{ color: 'var(--success-color)' }}>Orders</Link>
                </>
              )}
              <button onClick={logoutHandler} className="btn btn-danger" style={{ padding: '5px 10px' }}>Logout</button>
            </>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
