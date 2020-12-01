export const setCurrentYear = () => {
  document.querySelector('.js-year').textContent = (new Date()).getFullYear();
};
