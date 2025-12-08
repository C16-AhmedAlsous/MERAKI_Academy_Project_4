import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { parseToken } from "../../utils/parseToken";

const Carts = () => {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const payload = parseToken(token);
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/getCartByUsetId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCart(result.data);
      })
      .catch(() => {
        setCart([]);
      });
  }, []);

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:5000/cart/deleteCart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCart(result.data);
      });
  };

  const addOneMore = (productId) => {
    axios
      .post(`http://localhost:5000/cart/addcart/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const updated = res.data.cartItem;
        setCart((prev) =>
          prev.map((item) => (item._id === updated._id ? updated : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.productid?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    if (!cart.length) {
      setMessage("Cart is empty");
      return;
    }
    const items = cart.map((item) => ({
      productid: item.productid?._id,
      quantity: item.quantity,
    }));

    axios
      .post(
        "http://localhost:5000/order/order",
        {
          userId: payload?.id,
          items,
          address,
          totalamount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const orderData = {
          totalamount: total,
          items: items,
          address: address,
          orderId: res.data.order?._id,
        };
        setCart([]);
        setAddress("");
        navigate("/success", { state: { orderData } });
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Order failed. Please try again.");
      });
  };

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Your bag</p>
          <h2>Cart</h2>
          <p className="muted">
            Review the items you added and remove anything you no longer need.
          </p>
        </div>
      </div>

      <div className="cart-grid">
        {cart.length === 0 ? (
          <div className="section-card">Your cart is empty.</div>
        ) : (
          cart.map((cartItem) => {
            return (
              <article key={cartItem._id} className="cart-card">
                <div className="cart-thumb">
                  <img src={cartItem?.productid?.imageurl ||""} alt={cartItem.productid.name} />
                </div>
                <div className="cart-info">
                  <h3>{cartItem.productid.name}</h3>
                  <p className="muted small">{cartItem.productid.description}</p>
                  <p className="price">
                    ${cartItem.productid.price} × {cartItem.quantity}
                  </p>
                </div>
                <div className="cart-actions">
                  <button
                    className="secondary-btn"
                    onClick={() => addOneMore(cartItem.productid._id)}
                  >
                    + Add one
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => removeFromCart(cartItem._id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
      <div className="section-card">
        <h3>Order summary</h3>
        <p className="muted small">Items: {cart.length}</p>
        <p className="price">Total: ${total.toFixed(2)}</p>
        <div className="form-grid">
          <label>
            <span>Shipping address</span>
            <textarea
              placeholder="City, street, details"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <button className="primary-btn" onClick={handleCheckout}>
            Complete order
          </button>
          {message && <p className="muted small">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Carts;
