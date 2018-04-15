import React from "react";

export default () => {
  return (
    <div>
      <h1>Improve Your Frontend Skills</h1>

      <section class="avatar-container">
        <div class="avatar-image_wrapper">
          <img
            src="http://starflow.com/images/Maksim_Ivanov.jpg"
            width="200px"
          />
        </div>
        <div class="avatar-text">
          <p>
            Hey, I’m Maksim Ivanov and I
            <strong>
              help frontend developers take their coding skills and productivity
              to the next level.
            </strong>
          </p>
          <p>
            I am remote software engineer. I’ve been developing websites, online
            games and web applications for more than 8 years — and I’d love to
            <strong>
              help you become a more proficient frontend developer.
            </strong>
          </p>
        </div>
      </section>

      <section>
        <h2>Check Out The Basic React Course</h2>
        <p>
          ReactJS is a super popular framework for building user interfaces. It
          allows you to define complex UI in a simple and declarative way.
        </p>
        <p>
          Get solid ReactJS understanding and learn best practices for free:
        </p>
        <a class="button" href="https://basicreact.com">
          Enroll the course
        </a>
      </section>

      <div class="shadow_overlay">
        <div class="popup">
          <div class="popup-close" />
          <h2>Subscribe To My Free Newsletter</h2>
          <p>
            Become a member of my free email newsletter for frontend developers
            and <strong>get&nbsp;useful tips and tricks</strong> delivered
            straight to your inbox:{" "}
          </p>
          <form
            action="https://maksimivanov.us12.list-manage.com/subscribe/post?u=fdcb5a4b4a6cbb9721227a48f&amp;id=fa1a88a0d0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <h2 class="popup-header">Subscribe to my mailing list</h2>
              <div class="form-row">
                <label html-for="mce-NAME">Name:</label>
                <input
                  type="text"
                  name="NAME"
                  className="required"
                  id="mce-NAME"
                />
              </div>
              <div class="form-row">
                <label html-for="mce-EMAIL">Email:</label>
                <input
                  type="email"
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                />
              </div>
              <div id="mce-responses" class="clear">
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
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
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
                  className="button"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
