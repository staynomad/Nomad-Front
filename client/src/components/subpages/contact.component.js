import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div id="content">
      <section className="pt-105 pb-100 bg-dark color-white text-center color-filter-dark-3">
        <div className="container px-xl-0">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <h2
                className="small aos-init aos-animate"
                data-aos-duration="500"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                questions or concerns?
              </h2>
              <form action="mailto:michael@vhomesgroup.com" className="mt-50">
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="your name"
                      required={true}
                      className="input mb-30 radius10 border-transparent-white"
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="your email"
                      required="required"
                      className="input mb-30 radius10 border-transparent-white"
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="your message"
                    className="input contact_1 mb-40 w-full radius10 border-transparent-white"
                  />
                </div>
                <div className="row justify=content-between">
                  <button className="btn action-3 green">send a message</button>
                </div>
                <div>
                  <div className="mt-55 f-14 text-uppercase sp-20 separate">
                    <span>or call us</span>
                  </div>
                  <a
                    href="tel:+15555055050"
                    className="link mt-35 color-white f-22"
                  >
                    1 (224) 456-8915
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
