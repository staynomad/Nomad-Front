import React, { useState } from "react";
import { app } from '../../utils/axiosConfig.js'
import "./contact.css";

const Contact = () => {
  const [contactState, setContactState] = useState({})
  const [isLoading, setLoading] = useState(false)

  const handleChange = event => {
    const value = event.target.value;
    setContactState({...contactState, [event.target.name]: value})
  }

  const handleSubmit = event => {
    setLoading(true)
    event.preventDefault ();
    const data = {
      name: contactState.name,
      email: contactState.email,
      subject: `Inquiry from ${contactState.name}`,
      text: contactState.text
    }
    app.post('/contact/', data)
    .then(() => {
      setLoading(false)
    })
    .catch((err) => {
      alert('Could not send email. Please try again.')
      setLoading(false)
    })
  }

  return (
    <div className='content container'>
      <div className='inner-forms'>
        <div className='header'>
          <h1>Contact Us</h1>
        </div>
        <div className="spacer_s"></div>
        <div className='contact-input'>
          <input
            type='text'
            name='name'
            placeholder='your name'
            value={contactState.name}
            onChange={handleChange}
            required={true}
            className='contact-input-text mb-30 radius10'
          />
        </div>
        <div className='contact-input'>
          <input
            type='email'
            name='email'
            placeholder='your email'
            value={contactState.email}
            onChange={handleChange}
            required='required'
            className='contact-input-text mb-30 radius10'
          />
        </div>
        <textarea
          name='message'
          placeholder='your message'
          value={contactState.text}
          onChange={handleChange}
          className='contact-input contact_1 mb-40 w-full radius10'
        />
      </div>
      {
        isLoading ?
        <div id="spinner"></div> :
        <div className='rowcontact-button'>
          <button onclick={handleSubmit} className='btn action-3 green'>send</button>
        </div>
      }
    </div>
  );
};

export default Contact;
