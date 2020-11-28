const cards = document.querySelectorAll('[data-hover="content"]');

cards.forEach(card => {
  const additional = card.querySelector('.value__additional');
  const main = card.querySelector('.value__main');

  card.addEventListener('mouseenter', (event) => {
    additional.classList.add('value__additional--active');
    main.classList.remove('value__main--active');
  });

  card.addEventListener('mouseleave', () => {
    additional.classList.remove('value__additional--active');
    main.classList.add('value__main--active');
  });
});
