import Image from 'next/image'

import { SearchInput } from '../SearchInput/SearchInput'
import './Footer.scss'

export function Footer() {
  return (
    <footer>
      <div className="benefits-container">
        <div className="container">
          <Image
            src="/images/delivery.webp"
            width={45}
            height={45}
            alt="Delivery icon"
            loading="lazy"
          />
          INSTANT DELIVERY
        </div>
        <div className="container">
          <Image
            src="/images/pay-return.webp"
            width={40}
            height={40}
            alt="Refund icon"
            loading="lazy"
          />
          REFUND
        </div>
        <div className="container">
          <Image
            src="/images/secure-pay.webp"
            width={45}
            height={45}
            alt="Secure payment icon"
            loading="lazy"
          />
          SECURE PAYMENT
        </div>
        <div className="container">
          <Image
            src="/images/support.webp"
            width={45}
            height={45}
            alt="Support icon"
            loading="lazy"
          />
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
            <Image
              src="/images/logo.webp"
              width={60}
              height={35}
              alt="Logo"
              loading="lazy"
            />
          </a>
          <p className="describe">
            The best <br />
            e-commerce dev
          </p>
        </div>
        <div className="payment-methods">
          <div>
            <Image
              src="/images/visa-payment.webp"
              width={40}
              height={40}
              alt="Visa icon"
              loading="lazy"
            />
            <Image
              src="/images/mastercard-payment.webp"
              width={40}
              height={40}
              alt="Mastercard icon"
              loading="lazy"
            />
            <Image
              src="/images/pix-payment.webp"
              width={40}
              height={40}
              alt="Pix icon"
              loading="lazy"
            />
            <Image
              src="/images/paypal-icon.webp"
              width={32.5}
              height={32.5}
              alt="PayPal icon"
              loading="lazy"
            />
            <Image
              src="/images/stripe-payment.webp"
              width={40}
              height={40}
              alt="Stripe icon"
              loading="lazy"
            />
          </div>
          <div>
            <Image
              src="/images/visa-payment.webp"
              width={40}
              height={40}
              alt="Visa icon"
              loading="lazy"
            />
            <Image
              src="/images/mastercard-payment.webp"
              width={40}
              height={40}
              alt="Mastercard icon"
              loading="lazy"
            />
            <Image
              src="/images/pix-payment.webp"
              width={40}
              height={40}
              alt="Pix icon"
              loading="lazy"
            />
            <Image
              src="/images/paypal-icon.webp"
              width={32.5}
              height={32.5}
              alt="PayPal icon"
              loading="lazy"
            />
            <Image
              src="/images/stripe-payment.webp"
              width={40}
              height={40}
              alt="Stripe icon"
              loading="lazy"
            />
          </div>
        </div>
        <div className="contact">
          <p className="number">+55 (48) 99664-7429</p>
          <div className="links">
            <a href="./support.html">
              <Image
                src="/images/email.webp"
                width={40}
                height={35}
                alt="Email icon"
                loading="lazy"
              />
            </a>
            <a href="https://www.linkedin.com/in/miguelzacca" target="_blank">
              <Image
                src="/images/linkedin.webp"
                width={35}
                height={35}
                alt="Linkedin icon"
                loading="lazy"
              />
            </a>
            <a href="https://github.com/miguelzacca" target="_blank">
              <Image
                src="/images/github.webp"
                width={35}
                height={35}
                alt="Github icon"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
