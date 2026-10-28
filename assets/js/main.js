(() => { 'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  if (menuButton && menu) {
    const close = () => { menu.classList.remove('open'); menu.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open navigation'); };
    menuButton.addEventListener('click', () => { const next = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(next)); menuButton.setAttribute('aria-label', next ? 'Close navigation' : 'Open navigation'); menu.hidden = !next; menu.classList.toggle('open', next); });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click',close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && !menuButton.contains(e.target)) close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1000) close(); });
  }
  const year = document.getElementById('year'); if (year) year.textContent = String(new Date().getFullYear());
  const equipment = document.getElementById('calc-equipment');
  const revenue = document.getElementById('calc-revenue');
  const fee = document.getElementById('calc-percent');
  const summary = document.getElementById('calc-summary');
  if(equipment && revenue && fee && summary){
    const usd = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
    const update = () => { const rate=Number(equipment.value); const gross=Math.min(1000000,Math.max(0,Number(revenue.value)||0)); const percent=gross*rate; fee.textContent=usd(percent); const diff=Math.abs(percent-300); summary.textContent = diff<0.005 ? 'At this weekly gross revenue, both dispatch fees are equal.' : percent>300 ? 'At this weekly gross revenue, the $300 flat rate is '+usd(diff)+' less than the percentage fee.' : 'At this weekly gross revenue, the percentage plan is '+usd(diff)+' less than the flat rate.'; };
    equipment.addEventListener('change',update);revenue.addEventListener('input',update);update();
  }
  const plan=document.getElementById('contact-plan');
  if(plan){ const planValue=new URLSearchParams(window.location.search).get('plan'); if(['semi','hotshot','box','flat','undecided'].includes(planValue)) plan.value=planValue; }
  // Host-independent form adapter: connect any HTTPS endpoint accepting FormData.
  // The endpoint is configured in site-config.js, never hardcode secrets here.
  const inquiry = document.getElementById('carrier-inquiry');
  if (inquiry) {
    const status = document.getElementById('form-status');
    const submit = inquiry.querySelector('button[type="submit"]');
    const label = submit?.querySelector('span');
    const originalLabel = label?.textContent || 'Send Carrier Inquiry';
    const show = (message, isError = true) => {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle('error', isError);
      status.classList.toggle('success', !isError);
    };
    inquiry.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!inquiry.reportValidity()) return;
      if (inquiry.elements.namedItem('bot-field')?.value) return;
      const endpoint = String(window.TYME2DISPATCH_CONFIG?.formEndpoint || '').trim();
      if (!endpoint) {
        show('This form is not connected yet. Please configure the form endpoint before accepting inquiries. No information was sent.');
        return;
      }
      let url;
      try { url = new URL(endpoint, window.location.href); }
      catch { show('Form endpoint configuration is invalid. No information was sent.'); return; }
      const localDevelopment = url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
      if (url.protocol !== 'https:' && !localDevelopment) {
        show('The form endpoint must use HTTPS. No information was sent.');
        return;
      }
      if (url.username || url.password) {
        show('The form endpoint configuration cannot contain embedded credentials.');
        return;
      }
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      if (label) label.textContent = 'Sending…';
      show('Sending your inquiry…', false);
      try {
        const response = await fetch(url.href, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(inquiry),
          redirect: 'follow'
        });
        if (!response.ok) throw new Error('The form service returned HTTP ' + response.status);
        window.location.assign('thank-you.html');
      } catch (error) {
        // Intentionally do not expose implementation details to visitors.
        show('The inquiry could not be delivered. Please try again later. No confirmation was received.');
        console.warn('Carrier inquiry submission failed:', error);
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
        if (label) label.textContent = originalLabel;
      }
    });
  }
})();