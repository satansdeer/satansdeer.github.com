import React from "react";
import "./SignUpForm.css";

export default () => (
  <form
    action="https://maksimivanov.us12.list-manage.com/subscribe/post?u=fdcb5a4b4a6cbb9721227a48f&amp;id=fa1a88a0d0"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    className="validate"
    target="_blank"
    noValidate
  >
    <div id="mc_embed_signup_scroll">
      <h2 className="popup-header">Get new tutorials to your inbox:</h2>
      <div className="form-row">
        <input placeholder="Name" type="text" name="NAME" className="required" id="mce-NAME" />
      </div>
      <div className="form-row">
        <input
          placeholder="Email"
          type="email"
          name="EMAIL"
          className="required email"
          id="mce-EMAIL"
        />
      </div>
      <div id="mce-responses" className="clear">
        <div
          className="response"
          id="mce-error-response"
          style={{ display: "none" }}
        />
        <div
          className="response"
          id="mce-success-response"
          style={{ display: "none" }}
        />
      </div>
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input
          type="text"
          name="b_fdcb5a4b4a6cbb9721227a48f_fa1a88a0d0"
          tabIndex="-1"
          value=""
        />
      </div>
      <div className="clear">
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
        />
      </div>
    </div>
  </form>
);
