document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════════════════════
  // CAROUSEL
  // ═══════════════════════════════════════════════════════
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.slider-dots-box .dot');
  let current  = 0;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  document.getElementById('slider-btn-prev')?.addEventListener('click', () => goToSlide(current - 1));
  document.getElementById('slider-btn-next')?.addEventListener('click', () => goToSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // ═══════════════════════════════════════════════════════
  // SUBSCRIPTION TOGGLE — expand/collapse in place (no reorder)
  // ═══════════════════════════════════════════════════════
  const doubleCard = document.getElementById('sub-card-double');
  const singleCard = document.getElementById('sub-card-single');
  const doubleBody = doubleCard.querySelector('.sub-body');
  const singleBody = singleCard.querySelector('.sub-body');
  const doubleBanner = doubleCard.querySelector('.sub-popular-banner');
  const singleBanner = singleCard.querySelector('.sub-popular-banner');

  function setRadioState(card, active) {
    const outer = card.querySelector('.radio-outer');
    const inner = card.querySelector('.radio-inner');
    const title = card.querySelector('.sub-title-text');

    if (active) {
      outer.classList.add('selected-radio');
      if (inner) { inner.style.display = 'block'; }
      if (title) { title.style.fontWeight = '700'; title.style.color = 'var(--dark-green)'; }
    } else {
      outer.classList.remove('selected-radio');
      if (inner) { inner.style.display = 'none'; }
      if (title) { title.style.fontWeight = '300'; title.style.color = 'var(--text-dark)'; }
    }
  }

  function activateDouble() {
    // Double → expanded, banner visible
    doubleBanner.style.display = 'flex';
    doubleBody.style.display = 'block';
    setRadioState(doubleCard, true);

    // Single → collapsed, no banner
    if (singleBanner) singleBanner.style.display = 'none';
    singleBody.style.display = 'none';
    setRadioState(singleCard, false);
  }

  function activateSingle() {
    // Single → expanded, banner visible
    if (singleBanner) singleBanner.style.display = 'flex';
    singleBody.style.display = 'block';
    setRadioState(singleCard, true);

    // Double → collapsed, hide banner
    doubleBanner.style.display = 'none';
    doubleBody.style.display = 'none';
    setRadioState(doubleCard, false);
  }

  // Click handlers (header row only to avoid triggering on body click)
  doubleCard.querySelector('.sub-header-row').addEventListener('click', activateDouble);
  singleCard.querySelector('.sub-header-row').addEventListener('click', activateSingle);

  // Init: double is active
  singleBody.style.display = 'none';  // hide single body on load
  activateDouble();

  // ═══════════════════════════════════════════════════════
  // FRAGRANCE CARD SELECTION
  // ═══════════════════════════════════════════════════════
  document.querySelectorAll('.frag-options-row').forEach(group => {
    group.querySelectorAll('.frag-card').forEach(card => {
      card.addEventListener('click', () => {
        group.querySelectorAll('.frag-card').forEach(c => {
          c.classList.remove('active');
          const lbl = c.querySelector('.frag-label');
          const rad = c.querySelector('.frag-radio');
          if (lbl) lbl.classList.remove('gradient-text');
          if (rad) rad.classList.remove('filled');
        });
        card.classList.add('active');
        const lbl = card.querySelector('.frag-label');
        const rad = card.querySelector('.frag-radio');
        if (lbl) lbl.classList.add('gradient-text');
        if (rad) rad.classList.add('filled');
      });
    });
  });

  // ═══════════════════════════════════════════════════════
  // ACCORDION
  // ═══════════════════════════════════════════════════════
  document.querySelectorAll('.accordion-item').forEach(item => {
    const head  = item.querySelector('.accordion-head');
    const body  = item.querySelector('.accordion-body');
    const minus = item.querySelector('.icon-minus-svg');
    const plus  = item.querySelector('.icon-plus-svg');
    if (!head) return;

    head.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const b = i.querySelector('.accordion-body');
        const m = i.querySelector('.icon-minus-svg');
        const p = i.querySelector('.icon-plus-svg');
        if (b) b.style.display = 'none';
        if (m) m.style.display = 'none';
        if (p) p.style.display = 'inline';
      });

      if (!isActive) {
        item.classList.add('active');
        if (body)  body.style.display  = 'block';
        if (minus) minus.style.display = 'inline';
        if (plus)  plus.style.display  = 'none';
      }
    });
  });

});
