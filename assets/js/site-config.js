/*
 * TYME2DISPATCH — deployment-neutral contact form setup.
 * Leave this empty while reviewing locally. The form will not pretend to send.
 * After choosing a reputable form provider or building your own API, enter its
 * HTTPS endpoint URL below. Example: https://formspree.io/f/YOUR_FORM_ID
 *
 * The endpoint MUST accept multipart/form-data and return HTTP 2xx on success.
 * When hosted on a different origin it must allow CORS from your website.
 * NEVER put secret API keys, email passwords, or private tokens in this file.
 */
window.TYME2DISPATCH_CONFIG = Object.freeze({
  formEndpoint: ''
});
