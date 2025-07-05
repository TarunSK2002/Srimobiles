import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, textAlign: "center" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: 150, objectFit: "contain", marginBottom: 12 }}
      />
      <h4>{product.name}</h4>
      <p style={{ color: "#555", fontWeight: "bold" }}>{product.price}</p>
    </div>
  );
};

export default ProductCard;
