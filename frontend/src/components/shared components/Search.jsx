import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCounts, setCartCounts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/getallproduct")
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/cart/getCartByUsetId", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setCartCounts(result.data || []);
        })
        .catch(() => {
          setCartCounts([]);
        });
    }
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTerm = query.toLowerCase().trim();
    const filtered = products.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const description = (product.description || "").toLowerCase();
      const category = (product.catagory || "").toLowerCase();
      return (
        name.includes(searchTerm) ||
        description.includes(searchTerm) ||
        category.includes(searchTerm)
      );
    });
    setFilteredProducts(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setProducts((prev) => prev.filter((item) => item._id !== id));
        setFilteredProducts((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Find something new</p>
          <h2>Search products</h2>
          <p className="muted">Search by name, description, or category</p>
        </div>
      </div>

      <div className="form-card">
        <div className="form-grid">
          <label>
            <span>Keyword</span>
            <input
              type="text"
              placeholder="Type to search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </label>
          <button
            className="primary-btn"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </div>

      {isSearching && (
        <div className="section-header">
          <div>
            <h3>
              {filteredProducts.length > 0
                ? `Found ${filteredProducts.length} result${
                    filteredProducts.length !== 1 ? "s" : ""
                  }`
                : "No results found"}
            </h3>
            {filteredProducts.length === 0 && query && (
              <p className="muted">Try a different search term</p>
            )}
          </div>
        </div>
      )}

      {isSearching && filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map((product) => {
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
      )}
    </div>
  );
};

export default Search;
