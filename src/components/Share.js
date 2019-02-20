import React from "react";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton
} from "react-share";

import "./Share.scss";

library.add(fab);

const Share = ({ socialConfig, tags }) => (
  <div>
    Share this post:
    <div className="post-social">
      <FacebookShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded facebook"
      >
        <span className="icon">
          <FontAwesomeIcon icon={["fab", "facebook-f"]} />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded twitter"
        title={socialConfig.config.title}
        via={socialConfig.twitterHandle.split("@").join("")}
        hashtags={tags}
      >
        <span className="icon">
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </span>
      </TwitterShareButton>
      <GooglePlusShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded googleplus"
      >
        <span className="icon">
          <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
        </span>
      </GooglePlusShareButton>
      <LinkedinShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded linkedin"
        title={socialConfig.config.title}
      >
        <span className="icon">
          <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
        </span>
      </LinkedinShareButton>
      <RedditShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded reddit"
        title={socialConfig.config.title}
      >
        <span className="icon">
          <FontAwesomeIcon icon={["fab", "reddit-alien"]} />
        </span>
      </RedditShareButton>
    </div>
  </div>
);

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};
Share.defaultProps = {
  tags: []
};

export default Share;
