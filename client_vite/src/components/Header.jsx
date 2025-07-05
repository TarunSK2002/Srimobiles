// // src/components/Header.jsx
// import React from 'react';

// const Header = () => {
//   return (
//     <header style={{ padding: '20px', backgroundColor: '#1890ff', color: 'white' }}>
//       <h1>Sri Mobiles E-Commerce</h1>
//     </header>
//   );
// };

// export default Header;

















// src/components/Header.jsx
import React, { useState } from 'react';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>📱 Sri Mobiles</div>

      <div style={styles.searchContainer}>
        <input type="text" placeholder="Search for products..." style={styles.searchInput} />
        <button style={styles.searchButton}>Search</button>
      </div>

      <div style={styles.actions}>
        <div style={styles.actionItem} onClick={toggleProfileDropdown}>
          👤 Profile
          {showDropdown && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>My Profile</div>
              <div style={styles.dropdownItem}>Orders</div>
              <div style={styles.dropdownItem}>Wishlist</div>
              <div style={styles.dropdownItem}>Logout</div>
            </div>
          )}
        </div>

        <div style={styles.actionItem}>🛒 Cart</div>
        <div style={styles.actionItem}>📞 Support</div>
        <div style={styles.actionItem}>📬 Contact</div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1890ff',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexGrow: 1,
    marginLeft: '40px',
    marginRight: '40px',
    display: 'flex',
  },
  searchInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px 0 0 4px',
    border: 'none',
    outline: 'none',
  },
  searchButton: {
    padding: '8px 16px',
    backgroundColor: '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
  },
  actionItem: {
    cursor: 'pointer',
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    minWidth: '150px',
    zIndex: 100,
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  }
};

export default Header;

