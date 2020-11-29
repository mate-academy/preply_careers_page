const gallery = document.querySelector('.js-gallery');
const buttons = gallery.querySelectorAll('.js-gallery-button');
const photos = gallery.querySelectorAll('.js-gallery-photo');

export function addListenerForGalleryButtons() {
  [...buttons].forEach(button => {
    button.addEventListener('click', changeGalleryPhotos);
  });
};

function changeGalleryPhotos({ target }) {
  [...buttons].forEach(button => {
    button.classList.remove('gallery__button--active');
  });

  target.classList.add('gallery__button--active');

  [...photos].forEach(photo => {
    photo.classList.remove('gallery__photo--show');

    if (target.dataset.index === photo.dataset.index) {
      photo.classList.add('gallery__photo--show');
    }
  });
};
