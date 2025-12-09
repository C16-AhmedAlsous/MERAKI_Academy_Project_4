import React from "react";
import AllProduct from "./AllProduct";

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Welcome to ELECTRIC Shop</p>
          <h1>Discover products</h1>
          <p className="muted">
            Browse our curated collection, save your favorites, and manage your
            cart with a clean, simple interface.
          </p>
        </div>
      </section>
      <AllProduct />
    </div>
  );
};

export default Home;