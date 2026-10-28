# Connect the contact form on any host

The site uses a configurable HTTPS form API, not Netlify Forms.

## How it works

1. `contact.html` contains ordinary inputs, consent checkbox, and a honeypot.
2. `assets/js/site-config.js` specifies the API endpoint (initially empty).
3. `assets/js/main.js` submits a `FormData` POST using `fetch` and sends visitors to `thank-you.html` only on HTTP 2xx.
4. A missing or failed endpoint does **not** display a false success message.

## Provider checklist

Use a provider or API that:
- supports cross-origin browser uploads with CORS if on a separate domain;
- accepts `multipart/form-data` (not only JSON);
- responds with a 2xx status on accepted submission;
- offers spam throttling and access-controlled storage/notifications;
- has a privacy policy and suitable retention configuration.

## Verification

After connecting, submit a test message and confirm its arrival in your form provider's dashboard and in a notification inbox. Check error states, responsive forms, and your privacy notice too.

Avoid putting passwords or secret API keys inside client-side JavaScript.
