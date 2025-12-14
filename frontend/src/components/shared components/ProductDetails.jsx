import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/getProductById/${productid}`)
      .then((res) => {
        setProduct(res.data?.article || null);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Unable to load product details.");
      });

    const token = localStorage.getItem("token");
    if (!token) {
      setCartItemId(null);
      return;
    }

    axios
      .get("http://localhost:5000/cart/getCartByUsetId", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        const item = (result.data || []).find(
          (c) => c.productid?._id === productid
        );
        setCartItemId(item?._id || null);
      })
      .catch(() => setCartItemId(null));
  }, [productid]);

  const handleAddToCart = () => {
    if (!product?._id) return;
    setIsAdding(true);
    setMessage("");
    axios
      .post(`http://localhost:5000/cart/addcart/${product._id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const qty = res.data?.cartItem?.quantity;
        setMessage(
          qty ? `Added to cart (qty: ${qty})` : "Added to cart successfully."
        );
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          (err.response?.status === 401
            ? "Please login to add items to your cart."
            : "Could not add to cart. Try again.");
        setMessage(msg);
      })
      .finally(() => setIsAdding(false));
  };

  const handleRemoveFromCart = () => {
    if (!cartItemId) return;
    setIsRemoving(true);
    setMessage("");
    axios
      .delete(`http://localhost:5000/cart/deleteCart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCartItemId(null);
        setMessage("Removed from cart.");
      })
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          (err.response?.status === 401
            ? "Please login to manage your cart."
            : "Could not remove from cart. Try again.");
        setMessage(msg);
      })
      .finally(() => setIsRemoving(false));
  };

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
          <div className="product-actions">
            <button
              className="primary-btn"
              disabled={isAdding}
              onClick={handleAddToCart}
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
            {cartItemId && (
              <button
                className="secondary-btn"
                disabled={isRemoving}
                onClick={handleRemoveFromCart}
              >
                {isRemoving ? "Removing..." : "Remove from cart"}
              </button>
            )}
          </div>
          {message && <p className="muted small">{message}</p>}
        </div>
      </article>
    </div>
  );
};

export default ProductDetails;