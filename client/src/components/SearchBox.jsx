import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="form-control"
        style={{ borderRadius: '8px 0 0 8px', borderRight: 'none', width: '300px', padding: '10px 15px' }}
      />
      <button type="submit" className="btn" style={{ borderRadius: '0 8px 8px 0', padding: '10px 20px', height: '100%' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
