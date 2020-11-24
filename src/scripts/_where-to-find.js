const gallery = document.querySelector('.gallery');
const buttons = gallery.querySelectorAll('.gallery__button');
const photos = gallery.querySelectorAll('.gallery__photo');

[...buttons].forEach(button => {
  button.addEventListener('click', changeGalleryPhotos);
});

function changeGalleryPhotos({ target }) {
  [...buttons].forEach(button => {
    button.classList.remove('gallery__button--active');
  });

  target.classList.add('gallery__button--active');

  [...photos].forEach(photo => {
    photo.classList.remove('gallery__photo--show');

    if (target.innerText === photo.alt) {
      photo.classList.add('gallery__photo--show');
    }
  });
}
