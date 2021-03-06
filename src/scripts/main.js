'use strict';

import { startApplication } from './_select';
import { addListenerForGalleryButtons } from './_button-set-gallery';
import { addCardAnimation } from './_card-animation';
import { addScrollAnimation } from './_scroll-animation';
import { setCurrentYear } from './_set-year';

document.addEventListener('DOMContentLoaded', () => {
  addListenerForGalleryButtons();
  addScrollAnimation();
  setCurrentYear();
  addCardAnimation();
  startApplication();
});
