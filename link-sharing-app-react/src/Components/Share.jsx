import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookMessengerIcon,
} from "react-share";

const Share = () => {
  return (
    <div>
      <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton url={window.location.href}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <FacebookMessengerShareButton url={window.location.href}>
        <FacebookMessengerIcon size={32} round={true} />
      </FacebookMessengerShareButton>
    </div>
  );
};
export default Share