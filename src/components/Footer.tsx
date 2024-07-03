import "../assets/styles/components/Footer.scss";

import deliveryImg from "../assets/images/delivery.webp";
import payReturnImg from "../assets/images/pay-return.webp";
import securePayImg from "../assets/images/secure-pay.webp";
import supportImg from "../assets/images/support.webp";
import searchIcon from "../assets/images/search-icon.webp";
import visaPaymentImg from "../assets/images/visa-payment.webp";
import mastercardPaymentImg from "../assets/images/mastercard-payment.webp";
import pixPaymentImg from "../assets/images/pix-payment.webp";
import stripePaymentImg from "../assets/images/stripe-payment.webp";
import emailImg from "../assets/images/email.webp";
import linkedinImg from "../assets/images/linkedin.webp";
import githubImg from "../assets/images/github.webp";
import logoImg from "../assets/images/logo.webp";

export function Footer() {
  return <>
    <footer>
      <div className="benefits-container">
        <div className="container">
          <img src={deliveryImg} alt="Delivery icon" />
          INSTANT DELIVERY
        </div>
        <div className="container">
          <img src={payReturnImg} alt="Refund icon" />
          NOT REFUND
        </div>
        <div className="container">
          <img src={securePayImg} alt="Secure payment icon" />
          SECURE PAYMENT
        </div>
        <div className="container">
          <img src={supportImg} alt="Support icon" />
          24/7 SUPPORT
        </div>
      </div>
      <div className="footer-search-container">
        <h2>Start your search</h2>
        <div className="search-container">
          <input
            type="search"
            name="query"
            id="search-input-foo"
            placeholder="Search product"
          />
          <button id="search-button">
            <img src={searchIcon} alt="Search icon" />
          </button>
        </div>
      </div>
      <div className="main-container">
        <div className="site-profile">
          <a href="/">
            <img src={logoImg} alt="Logo" />
          </a>
          <p className="describe">
            The best <br />
            e-commerce dev
          </p>
        </div>
        <div className="payment-methods" >
          <img src={visaPaymentImg} alt="Visa icon" />
          <img src={mastercardPaymentImg} alt="Mastercard icon" />
          <img src={pixPaymentImg} alt="Pix icon" />
          <img src={stripePaymentImg} alt="Stripe icon" />
        </div>
        <div className="contact">
          <p className="number">+55 (48) 99664-7429</p>
          <p className="info-number">Personal telephone</p>
          <div className="links">
            <a href="./support.html">
              <img src={emailImg} alt="Email icon" />
            </a>
            <a href="https://www.linkedin.com/in/miguelzacca" target="_blank">
              <img src={linkedinImg} alt="Linkedin icon" />
            </a>
            <a href="https://github.com/miguelzacca" target="_blank">
              <img src={githubImg} alt="Github icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>
}