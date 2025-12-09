import React from "react";

const Contact = () => {
  return (
    <div className="page">
      <div className="section-card contact-card">
        <p className="eyebrow">Support</p>
        <h2>Contact us</h2>
        <p className="muted">
          Reach out any time — we typically respond within one business day.
        </p>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Email</h3>
            <p>ELECTRIC-shop@gmail.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+962 790262725</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;