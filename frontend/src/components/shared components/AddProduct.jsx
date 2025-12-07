import React, { useState } from "react";
import axios from "axios";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState("");
  const [message, setmessage] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="imageurl"
        onChange={(e) => {
          setImageurl(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="catagory"
        onChange={(e) => {
          setCatagory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="rating"
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
      <button
        onClick={() => {
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
              setmessage(res.data.message);
            })
            .catch((err) => {
              setmessage(err.response.data.message);
            });
        }}
      >
        Add Product
      </button>
      <p>{message}</p>
    </div>
  );
};

export default AddProduct;
