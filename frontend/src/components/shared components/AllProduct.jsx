import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
const AllProduct = () => {
  let userContext = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [cartCounts, setCartCounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/getCartByUsetId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCartCounts(result.data || []);
      })
      .catch(() => {
        setCartCounts([]);
      });
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/product/getallproduct").then((result) => {
      setProducts(result.data);
    });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setProducts((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (id) => {
    axios
      .post(`http://localhost:5000/cart/addcart/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const newItem = res.data?.cartItem;
        if (!newItem) return;
        setCartCounts((prev) => {
          const existingIndex = prev.findIndex(
            (cart) => cart._id === newItem._id
          );
          if (existingIndex >= 0) {
            const copy = [...prev];
            copy[existingIndex] = newItem;
            return copy;
          }
          return [...prev, newItem];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCart = (productId) => {
    const cartItem = cartCounts.find(
      (cart) => cart.productid?._id === productId
    );
    if (!cartItem) return;

    axios
      .delete(`http://localhost:5000/cart/deleteCart/${cartItem._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCartCounts(result.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="products">
      <div className="section-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2>Latest products</h2>
          <p className="muted">Tap any product card to view details.</p>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => {
          return (
            <article key={product._id} className="product-card">
              <div
                className="product-image"
                onClick={() => {
                  navigate(`/ProductDetails/${product._id}`);
                }}
              >
                <img className="image" src={product.imageurl} alt={product.name} />
              </div>
              <div className="product-info">
                <div>
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                  {cartCounts.some(
                    (cart) => cart.productid?._id === product._id
                  ) && (
                    <p className="muted small">
                      In cart:{" "}
                      {
                        cartCounts.find(
                          (cart) => cart.productid?._id === product._id
                        )?.quantity
                      }
                    </p>
                  )}
                </div>
              </div>
              <div className="product-actions">
                <button
                  className="primary-btn"
                  onClick={() => addToCart(product._id)}
                >
                  {cartCounts.some(
                    (cart) => cart.productid?._id === product._id
                  )
                    ? "Add one more"
                    : "Add to cart"}
                </button>
                {cartCounts.some(
                  (cart) => cart.productid?._id === product._id
                ) && (
                  <button
                    className="secondary-btn"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove from cart
                  </button>
                )}
              </div>
              {userContext.isAdmin && (
                <button
                  className="secondary-danger-btn"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AllProduct;
