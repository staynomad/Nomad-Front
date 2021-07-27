import React, { useState } from "react";
import { app } from "../../utils/axiosConfig.js";
import "./contact.css";

const Contact = () => {
  const [contactState, setContactState] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setContactState({ ...contactState, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = {
      name: contactState.name,
      email: contactState.email,
      subject: `Inquiry from ${contactState.name}`,
      text: contactState.text,
    };
    app
      .post("/contact/", data)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        alert("Could not send email. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-form-container">
        <div className="header">
          <h1>Contact Us</h1>
        </div>
        <div className="contact-input-container">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={contactState.name}
            onChange={handleChange}
            required={true}
            className="contact-input"
          />
        </div>
        <div className="contact-input-container">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={contactState.email}
            onChange={handleChange}
            required="required"
            className="contact-input"
          />
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          value={contactState.text}
          onChange={handleChange}
          className="contact-input contact-textarea contact_1 mb-40 w-full radius10"
        />
      </div>
      {isLoading ? (
        <div id="spinner"></div>
      ) : (
        <div className="rowcontact-button">
          <button
            onClick={handleSubmit}
            className="btn action-3 green contact-button"
          >
            Send
          </button>
        </div>
      )}
      <span className="alt-contact">
        Or email
        <a href="mailto:contact@visitnomad.com" className="email-link">
          contact@visitnomad.com
        </a>
        directly
      </span>
    </div>
  );
};

export default Contact;
