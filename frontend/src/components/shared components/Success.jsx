import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData || {};

  return (
    <div className="page">
      <div className="success-container">
        <div className="success-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#10b981" />
            <path
              d="M8 12l2 2 4-4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p className="muted">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p>

        {orderData.totalamount && (
          <div className="success-details">
            <div className="success-detail-item">
              <span className="muted small">Order Total</span>
              <span className="price">${orderData.totalamount.toFixed(2)}</span>
            </div>
            {orderData.items && (
              <div className="success-detail-item">
                <span className="muted small">Items</span>
                <span>{orderData.items.length}</span>
              </div>
            )}
            {orderData.address && (
              <div className="success-detail-item">
                <span className="muted small">Shipping Address</span>
                <span>{orderData.address}</span>
              </div>
            )}
          </div>
        )}

        <div className="success-actions">
          <button className="primary-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Success;

