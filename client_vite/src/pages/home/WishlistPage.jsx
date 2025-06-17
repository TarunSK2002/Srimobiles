import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const wishlist = [
    { id: 1, name: 'iPhone 14', price: '₹79,999', image: '/images/iphone.jpg' },
  ];

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>My Wishlist</h3>
        <div className="row">
          {wishlist.map(item => (
            <div className="col-md-3" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
