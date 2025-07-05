// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>© 2025 Sri Mobiles E-Commerce. All rights reserved.</p>
        <p>
          Designed by <a href="https://www.pearlsys.in" target="_blank" rel="noreferrer" style={styles.link}>PearlSys Solutions LLP</a>
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#eee",
    padding: "20px 0",
    textAlign: "center",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
  },
};

export default Footer;
