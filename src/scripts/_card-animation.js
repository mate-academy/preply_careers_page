export function addCardAnimation() {
  const cards = document.querySelectorAll('[data-hover="card"]');

  const updateStyles = (event, card) => {
    const { offsetWidth, offsetHeight } = card;
    const { left, top } = card.getBoundingClientRect();
    const itemLeft = left + window.scrollX;
    const itemTop = top + window.scrollY;
    const size = Math.sqrt((offsetWidth ** 2) + (offsetHeight ** 2));

    card.style.setProperty('--width', `${size}px`);
    card.style.setProperty('--height', `${size}px`);

    const overlayX = Math.round(event.pageX - itemLeft) - (size / 2);
    const overlayY = Math.round(event.pageY - itemTop) - (size / 2);

    card.style.setProperty('--top', `${overlayY}px`);
    card.style.setProperty('--left', `${overlayX}px`);
  };

  cards.forEach(card => {
    card.addEventListener('mouseenter', (event) => {
      card.classList.add('active');
      updateStyles(event, card);
    });
  });

  cards.forEach(card => {
    card.addEventListener('mouseleave', (event) => {
      card.classList.remove('active');
      updateStyles(event, card);
    });
  });
}
