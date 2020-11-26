const animItems = document.querySelectorAll('.scroll-section');

if (animItems.length) {
  window.addEventListener('scroll', animOnScroll);
  animOnScroll();
}

function animOnScroll() {
  for (let index = 0; index < animItems.length; index++) {
    const animItem = animItems[index];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offsetTop(animItem);
    const animStartNum = 5;

    const animStart = animItemHeight > window.innerHeight
      ? window.innerHeight / animStartNum
      : animItemHeight / animStartNum;

    const animItemPoint = window.innerHeight + animItemHeight - animStart;

    if ((window.pageYOffset > animItemOffset - animItemPoint)
      && (window.pageYOffset < animItemOffset + animItemHeight)) {
      animItem.classList.add('scroll-section--active');
    }
  }
}

function offsetTop(el) {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return rect.top + scrollTop;
}
