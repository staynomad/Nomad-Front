import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className='content'>
      <form action='mailto:michael@vhomesgroup.com'>
        <div className='inner-forms'>
          <div className='header'>
            <h2 className='small'>questions or concerns?</h2>
          </div>
          <div className='input'>
            <input
              type='text'
              name='name'
              placeholder='your name'
              required={true}
              className='input mb-30 radius10 border-transparent-white ctc-input'
            />
          </div>
          <div className='input'>
            <input
              type='email'
              name='email'
              placeholder='your email'
              required='required'
              className='input mb-30 radius10 border-transparent-white ctc-input'
            />
          </div>
          <textarea
            name='message'
            placeholder='your message'
            className='input contact_1 mb-40 w-full radius10 border-transparent-white'
          />
        </div>
        <div className='row justify=content-between'>
          <button className='btn action-3 green'>send a message</button>
        </div>
        <div className='contact-info'>
          <div>
            <span className='call-text'>or call us</span>
          </div>
          <a href='tel:+15555055050' className='link mt-35 color-white f-22'>
            1 (224) 456-8915
          </a>
        </div>
      </form>
    </div>
  );
};

export default Contact;
