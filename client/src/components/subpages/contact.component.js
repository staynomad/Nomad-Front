import React from "react";
import "./contact.css";

const Contact = () => {
  <div>
    <h2>questions or concerns?</h2>
    <form action="mailto:michael@vhomesgroup.com">
      <input type="text" name="name" placeholder="your name" required={true} />
      <textarea name="message" placeholder="your message" />
      <input type="checkbox" name="send_copy" checked="" />
      <button class="btn action-3 green">send a message</button>
    </form>
  </div>;
};

export default Contact;
