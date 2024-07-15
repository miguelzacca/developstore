import '../styles/layouts/Footer.scss'
import { SearchInput } from '../components/SearchInput'

import deliveryImg from '/public/delivery.webp'
import payReturnImg from '/public/pay-return.webp'
import securePayImg from '/public/secure-pay.webp'
import supportImg from '/public/support.webp'
import visaPaymentImg from '/public/visa-payment.webp'
import mastercardPaymentImg from '/public/mastercard-payment.webp'
import pixPaymentImg from '/public/pix-payment.webp'
import stripePaymentImg from '/public/stripe-payment.webp'
import emailImg from '/public/email.webp'
import linkedinImg from '/public/linkedin.webp'
import githubImg from '/public/github.webp'
import logoImg from '/public/logo.webp'

export function Footer() {
  return (
    <footer>
      <div className="benefits-container">
        <div className="container">
          <img src={deliveryImg} alt="Delivery icon"  loading='lazy' />
          INSTANT DELIVERY
        </div>
        <div className="container">
          <img src={payReturnImg} alt="Refund icon"  loading='lazy' />
          NOT REFUND
        </div>
        <div className="container">
          <img src={securePayImg} alt="Secure payment icon"  loading='lazy' />
          SECURE PAYMENT
        </div>
        <div className="container">
          <img src={supportImg} alt="Support icon"  loading='lazy' />
          24/7 SUPPORT
        </div>
      </div>
      <div className="footer-search-container">
        <h2>Start your search</h2>
        <SearchInput id="search-input-footer" />
      </div>
      <div className="main-container">
        <div className="site-profile">
          <a href="/">
            <img src={logoImg} alt="Logo" loading='lazy' />
          </a>
          <p className="describe">
            The best <br />
            e-commerce dev
          </p>
        </div>
        <div className="payment-methods">
          <img src={visaPaymentImg} alt="Visa icon" loading='lazy' />
          <img src={mastercardPaymentImg} alt="Mastercard icon" loading='lazy' />
          <img src={pixPaymentImg} alt="Pix icon" loading='lazy' />
          <img src={stripePaymentImg} alt="Stripe icon" loading='lazy' />
        </div>
        <div className="contact">
          <p className="number">+55 (48) 99664-7429</p>
          <div className="links">
            <a href="./support.html">
              <img src={emailImg} alt="Email icon" loading='lazy' />
            </a>
            <a href="https://www.linkedin.com/in/miguelzacca" target="_blank">
              <img src={linkedinImg} alt="Linkedin icon" loading='lazy' />
            </a>
            <a href="https://github.com/miguelzacca" target="_blank">
              <img src={githubImg} alt="Github icon" loading='lazy' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
