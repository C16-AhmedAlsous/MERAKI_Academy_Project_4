import axios from "axios";
import React, { useEffect, useState } from "react";

const Carts = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/getCartByUsetId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCart(result.data);
      });
  }, []);

  const removeFromCart = (id) => {
    axios
      .delete("http://localhost:5000/cart/deleteCartByUsetId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCart(result.data);
      });
  };

  return (
    <div>
      {cart.map((cartOne, ind) => {
        return (
          <div>
            <p> {cartOne.productid.name}</p>
            <img src={cartOne.productid.imageurl} />
            <button
              onClick={() => {
              
                
                removeFromCart(cart._id);
              }}
            >
              remove from cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Carts;
