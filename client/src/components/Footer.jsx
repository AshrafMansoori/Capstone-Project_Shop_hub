import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p>MERNShop Capstone Project &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
