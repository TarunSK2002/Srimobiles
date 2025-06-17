import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>Contact Us</h3>
        <p>Email: support@srimobiles.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Address: 123 Mobile Street, Chennai, India</p>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
