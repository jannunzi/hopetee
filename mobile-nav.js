/* Mobile nav: hamburger + drawer (shown below 820px, same breakpoint that hides .nav-links). */
(function () {
  var css =
    '.nav-toggle{display:none;background:none;border:1px solid var(--line,#e5e5e5);border-radius:8px;width:40px;height:40px;align-items:center;justify-content:center;cursor:pointer;color:var(--navy,#1a2a4a);padding:0}' +
    '.nav-toggle svg{width:22px;height:22px}' +
    '.nav-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:90;opacity:0;transition:opacity .2s}' +
    '.nav-drawer{position:fixed;top:0;right:0;bottom:0;width:min(80vw,300px);background:#fff;z-index:91;padding:16px 24px;box-shadow:-8px 0 30px rgba(0,0,0,.12);transform:translateX(100%);transition:transform .25s ease;display:flex;flex-direction:column;font-family:inherit}' +
    '.nav-drawer.open{transform:none}.nav-backdrop.open{opacity:1}' +
    '.nav-drawer-close{align-self:flex-end;background:none;border:0;font-size:28px;line-height:1;cursor:pointer;color:#2c2c2c;padding:4px 8px}' +
    '.nav-drawer nav{display:flex;flex-direction:column;margin-top:12px}' +
    '.nav-drawer nav a{padding:14px 0;font-size:17px;font-weight:500;color:#2c2c2c;border-bottom:1px solid var(--line,#eee)}' +
    '.nav-drawer nav a:hover{color:var(--red,#c00)}' +
    '@media(max-width:820px){.nav-toggle{display:inline-flex}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var links = document.querySelector('header .nav-links');
  var right = document.querySelector('header .nav-right');
  if (!links || !right) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'nav-drawer');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  right.appendChild(btn);

  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.hidden = true;

  var drawer = document.createElement('div');
  drawer.id = 'nav-drawer';
  drawer.className = 'nav-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Menu');
  drawer.hidden = true;
  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'nav-drawer-close';
  close.setAttribute('aria-label', 'Close menu');
  close.innerHTML = '&times;';
  var nav = links.cloneNode(true);
  nav.className = '';
  drawer.appendChild(close);
  drawer.appendChild(nav);
  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  function focusables() { return drawer.querySelectorAll('button, a[href]'); }
  function open() {
    backdrop.hidden = drawer.hidden = false;
    requestAnimationFrame(function () { backdrop.classList.add('open'); drawer.classList.add('open'); });
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    close.focus();
  }
  function shut(refocus) {
    backdrop.classList.remove('open'); drawer.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(function () { backdrop.hidden = drawer.hidden = true; }, 250);
    if (refocus) btn.focus();
  }
  btn.addEventListener('click', open);
  close.addEventListener('click', function () { shut(true); });
  backdrop.addEventListener('click', function () { shut(true); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) shut(false); });
  document.addEventListener('keydown', function (e) {
    if (btn.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { shut(true); return; }
    if (e.key === 'Tab') {
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
