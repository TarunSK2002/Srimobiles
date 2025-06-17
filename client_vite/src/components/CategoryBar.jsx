// // src/components/CategoryBar.jsx
// import React from 'react';

// const CategoryBar = () => {
//   return (
//     <div style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
//       {/* You can replace these with actual categories */}
//       <button style={{ margin: '0 10px' }}>MOBILE</button>
//       <button style={{ margin: '0 10px' }}>ELECTRONICS</button>
//       <button style={{ margin: '0 10px' }}>APPLICANCES</button>
//       <button style={{ margin: '0 10px' }}>MOBILE GAGETS</button>
//     </div>
//   );
// };

// export default CategoryBar;














// src/components/CategoryBar.jsx
import React from 'react';

const categories = [
  { name: 'MOBILE', icon: '📱' },
  { name: 'ELECTRONICS', icon: '💻' },
  { name: 'APPLIANCES', icon: '🔌' },
  { name: 'MOBILE GADGETS', icon: '🎧' },
];

const CategoryBar = () => {
  return (
    <div
      style={{
        backgroundColor: '#2874f0',
        padding: '10px 0',
        boxShadow: '0 2px 5px rgb(0 0 0 / 0.1)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          maxWidth: '900px',  // limit max width for centering
        //   width: '100%',
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 transparent',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.name}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              margin: '0 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: '80px',
              padding: '0',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffe500')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
          >
            <span style={{ fontSize: '24px', marginBottom: '4px' }}>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
