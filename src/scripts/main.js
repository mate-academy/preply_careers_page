'use strict';

import { startApplication } from './_select';
import { addListenerForGalleryButtons } from './_button-set-gallery';
import './_card-animation';
import { addScrollAnimation } from './_scroll-animation';
import './_set-year';

document.addEventListener('DOMContentLoaded', () => {
  addListenerForGalleryButtons();
  addScrollAnimation();
  startApplication();
});
