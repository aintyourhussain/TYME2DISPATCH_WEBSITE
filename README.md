# TYME2DISPATCH — Platform-independent website source code

This is the actual, editable source code of your approved black/red TYME2DISPATCH website. It is not tied to Netlify, React, WordPress, or a build service.

## Website pages

- `index.html` — Home
- `services.html` — Dispatch services
- `how-it-works.html` — How It Works
- `about.html` — Mission, vision, and trust
- `pricing.html` — 5% Semi, 7% Hotshot, 10% Box Truck OR $300 weekly flat-rate plan
- `testimonials.html` — Replaceable video testimonial slots
- `contact.html` — Carrier inquiry form (needs an endpoint)
- `privacy.html` — DRAFT policy (requires company approval)
- `thank-you.html` — Shows **only after** a successful HTTP form response
- `404.html` — Custom missing-page screen

## Editing the code

Open this folder in Visual Studio Code. You can edit any HTML file directly. The design is in `assets/css/styles.css`, behavior in `assets/js/main.js`, and images in `assets/images/`.

To preview, open `index.html` in a browser. For a more reliable preview, run `python -m http.server 8000` inside the folder, then visit `http://localhost:8000`.

## Publishing on any static host

Upload the **contents** of this folder (not a parent folder) so `index.html` is in the public site root:

- **cPanel/Apache:** upload contents to `public_html/`.
- **Vercel:** deploy as a static site using a Git repository or a supported deployment workflow; do not select a framework that requires a build.
- **Cloudflare Pages:** select static assets / no build, output directory is this project root.
- **GitHub Pages:** publish the source folder from the chosen branch; all links and assets are relative.
- **Nginx/VPS:** serve this folder as the document root.

There are no Netlify-only files, form attributes, or special routing rules. Links deliberately use `.html`, so the site does not depend on rewrite rules. The optional `404.html` page requires host-specific configuration to use as the default not-found page.

## Important: contact form integration

The contact form cannot send data from HTML alone. Hosting static files on any provider does not automatically create a form backend. Until configured, the form shows a clear message and **does not send or store inquiries**.

1. Choose a trusted form service that supports browser `multipart/form-data` POST and CORS (e.g. Formspree), OR deploy your own HTTPS API.
2. Get the HTTPS form endpoint URL.
3. Open `assets/js/site-config.js` and set:

   ```js
   window.TYME2DISPATCH_CONFIG = Object.freeze({
     formEndpoint: 'https://YOUR-SECURE-ENDPOINT.example/submit'
   });
   ```

4. Redeploy. Submit a real test inquiry and verify it arrives in the chosen service. Only then consider it working.
5. Configure rate limits, spam filtering, retention, notification email, sender authentication, and access controls on your form provider/backend. Browser validation and a honeypot are NOT substitutes for server-side protection.

The form sends `FormData` with `fetch` and `Accept: application/json`. A **2xx response means success** and displays `thank-you.html`; a failure leaves the form visible and reports an error. For a cross-origin endpoint, CORS must allow your website's origin.

**Never store secrets, SMTP passwords, private API tokens, or service-role keys in HTML/CSS/JS** — public visitors can read all browser code.

## Pricing rules

- Semi: 5%; Hotshot: 7%; Box Truck: 10%.
- The $300/week **full dispatch** plan is an alternative for ANY of the three equipment types.
- On the flat plan, customers pay $300/week in dispatch fees and **no additional percentage**.
- The pricing calculator is a browser-side illustrative estimate, not a billing system.

## Before publishing

- Add TYME2DISPATCH's verified phone, email, and social links (not those of C&L TRUCK EXPRESS).
- Add actual videos ONLY with the participants' permission; the current cards are placeholders.
- The 8 years experience and 30+ satisfied clients are supplied by the project owner.
- Approve the services, business claims, and privacy notice, including form processor details and contact details.
- Use HTTPS, choose a secure host, and configure security headers (CSP, no-sniff, frame denial, referrer-policy) within the host. These are set at the server/host, not by ordinary static files. Do not enable HSTS blindly on domains where HTTPS isn't configured for all subdomains.
- Test accessibility, responsive layouts, and actual form submissions on the **live URL**.

## Safety and maintenance

This source has no `npm install`, external scripts, analytics libraries, or database. Avoid adding untrusted scripts. Set up backups/version control (preferably a private Git repository), HTTPS, and provider-level logs/spam protection. Security headers and production environment settings must be configured on whichever hosting service you choose.


## Editorial refresh (version 2)
- Scaled down bold hero and section typography sitewide for a more professional look.
- Expanded Home, Services, Process, About, Pricing, Testimonials, and Contact pages with practical explanatory content.
- Added leadership directory to About Us with explicit placeholders. **Do not publish placeholder profiles as real people.** Replace owner, director, and team names with confirmed facts.
- Form remains host-independent and requires a configured backend endpoint (see FORM_SETUP.md).
- 8+ years and 30+ clients are claims supplied by the website owner; verify before public launch.
