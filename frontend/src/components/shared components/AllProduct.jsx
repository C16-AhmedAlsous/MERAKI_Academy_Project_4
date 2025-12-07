import axios from "axios";
import React, { useEffect, useState } from "react";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/product/getallproduct").then((result) => {
      setProducts(result.data);
    });
  }, [products]);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);
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
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="showproduct">
      {products.map((product, index) => {
        return (
          <div key={index} id="productcard">
            <p>{product.name}</p>
            <img
              src={product.imageurl}
              className="productimg"
              onClick={(e) => {
                
              }}
            />
            <button
              onClick={() => {
                deleteProduct(product._id);
              }}
            >
              deleteProduct
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
              }}
            >
              addToCart
            </button>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllProduct;
