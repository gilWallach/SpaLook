import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import { Icon } from "./Icon";

export function ShareModal({ isMenuOpen, setIsMenuOpen, shareUrl }) {
  return (
    <div
      className={`share-modal ${isMenuOpen ? "open" : ""}`}
      onClick={() => setIsMenuOpen(false)}
    >
      <div className="close-btn-container ">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="flex auto-center"
        >
          <Icon name="Close" />{" "}
        </button>
      </div>
      <h2>Share this spa</h2>
      <div className="icons-wrapper flex space-between">
        <FacebookShareButton
          url={shareUrl}
          quote={"Checkout this spa!"}
          hashtag="#spaPlus"
        >
          <FacebookIcon size={46} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url={shareUrl}
          quote={"Checkout this spa!"}
          hashtag="#spaPlus"
        >
          <FacebookMessengerIcon size={46} round />
        </FacebookMessengerShareButton>
        <WhatsappShareButton
          url={shareUrl}
          quote={"Checkout this spa!"}
          hashtag="#spaPlus"
        >
          <WhatsappIcon size={46} round />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          quote={"Checkout this spa!"}
          hashtag="#spaPlus"
        >
          <EmailIcon size={46} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
