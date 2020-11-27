// window.scrollTo(window.pageYOffset, 0);

window.onload = () => {
  const animItems = document.querySelectorAll('.js-scroll');

  animItems.forEach(animItem => {
    createObserver(animItem);
  });
};

function createObserver(target) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };

  const intObserver = new IntersectionObserver(callback, options);

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const elements = entry.target.querySelectorAll('.js-scroll__element');
      let delayValue = 0;

      entry
        .target
        .style
        .setProperty('--slogan-after-transform', 'translateY(0)');

      entry
        .target
        .style
        .setProperty('--slogan-after-opacity', '1');

      elements.forEach(element => {
        element.style['transition-delay'] = `${delayValue += 0.3}s`;
        element.classList.add('scroll--active');
      });

      observer.unobserve(entry.target);
    });
  }

  intObserver.observe(target);
}
