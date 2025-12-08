import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/getProductById/${productid}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productid]);

  if (!product) {
    return (
      <div className="page">
        <div className="section-card">Loading product details…</div>
      </div>
    );
  }

  return (
    <div className="page">
      <article className="details-card">
        <div className="details-image">
          <img src={product.imageurl} alt={product.name} />
        </div>
        <div className="details-body">
          <p className="eyebrow">{product.catagory}</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>
          <p className="price">{product.price}</p>
          <p className="muted small">Rating: {product.rating}</p>
        </div>
      </article>
    </div>
  );
};

export default ProductDetails;