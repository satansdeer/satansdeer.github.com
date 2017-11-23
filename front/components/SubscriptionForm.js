import React from 'react';
import PropTypes from 'prop-types';

class SubscriptionForm extends React.Component {
  render() {
    return (
      <div id="mc_embed_signup">
        <form action="https://maksimivanov.us12.list-manage.com/subscribe/post?u=fdcb5a4b4a6cbb9721227a48f&amp;id=fa1a88a0d0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div id="mc_embed_signup_scroll">
          <h2 className='popup-header'>Subscribe to my mailing list</h2>
        <div className="form-row">
          <label htmlFor="mce-NAME">Name:</label>
          <input type="text" name="NAME" className="required" id="mce-NAME"/>
        </div>
        <div className="form-row">
          <label htmlFor="mce-EMAIL">Email:</label>
          <input type="email" name="EMAIL" className="required email" id="mce-EMAIL"/>
        </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
            <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
          </div>
          <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_fdcb5a4b4a6cbb9721227a48f_fa1a88a0d0" tabIndex="-1" value=""/></div>
              <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></div>
            </div>
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
