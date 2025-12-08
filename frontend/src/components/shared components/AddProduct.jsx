import React, { useState } from "react";
import axios from "axios";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    const body = {
      name,
      description,
      price,
      imageurl,
      catagory,
      rating,
    };

    axios
      .post("http://localhost:5000/product/newproduct", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Unable to add product");
      });
  };

  return (
    <div className="page">
      <div className="form-card">
        <p className="eyebrow">New product</p>
        <h2>Add a product</h2>
        <div className="form-grid">
          <label>
            <span>Name</span>
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              placeholder="Short description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
          <label>
            <span>Price</span>
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              type="text"
              placeholder="https://..."
              value={imageurl}
              onChange={(e) => {
                setImageurl(e.target.value);
              }}
            />
          </label>
          <label>
            <span>Category</span>
            <input
              type="text"
              placeholder="Category"
              value={catagory}
              onChange={(e) => {
                setCatagory(e.target.value);
              }}
            />
          </label>
          <label>
            <span>Rating</span>
            <input
              type="number"
              placeholder="1-5"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </label>
          <button className="primary-btn" onClick={handleAdd}>
            Add product
          </button>
        </div>
        {message && <p className="muted small">{message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
