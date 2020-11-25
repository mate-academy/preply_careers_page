import { getData } from '../api/api';

const teamSelect = document.querySelector('.team');
const basicTeamOption = teamSelect.querySelector('.select');
const locationSelect = document.querySelector('.location');
const basicLocationOption = locationSelect.querySelector('.select');
let vacancies;
let location;
const list = document.querySelector('.vacancies__list');
const groups = {};

function countGroupedVacancies(select) {
  const options = select.querySelectorAll('.option');

  options.forEach((option) => {
    const text = option.textContent;
    const length = groups[text] ? groups[text].length : '0';

    option.textContent = `${text} (${length})`;
  });
}

function setBasicOption(select) {
  const wrapper = select.closest('.group');
  const option = wrapper.querySelectorAll('.option')[0];
  const text = option.textContent;

  select.textContent = text;

  if (wrapper.classList.contains('team')) {
    chooseTeam(text, select);
  } else {
    chooseLocation(text, select);
  }
}

function toggleTeamSelect() {
  teamSelect.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('option')) {
      chooseTeam(target.textContent, basicTeamOption);
    }

    basicTeamOption.classList.toggle('select--open');
  });
}

function toggleLocationSelect() {
  locationSelect.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('option')) {
      chooseLocation(target.textContent, basicLocationOption);
    }

    basicLocationOption.classList.toggle('select--open');
  });
}

function chooseTeam(text, select) {
  vacancies = groups[text.split(' ')[0]];

  select.textContent = text;

  renderVacancies(vacancies);
}

function renderVacancies(vacanciesToRender) {
  list.innerHTML = '';

  let vacanciesToShow = vacanciesToRender;

  if (!vacanciesToShow) {
    vacanciesToShow = [];

    return;
  }

  if (location) {
    vacanciesToShow = location === 'All locations'
      ? vacanciesToShow
      : vacanciesToShow.filter(vacancy => {
        return vacancy.categories.location.includes(location);
      });
  }

  vacanciesToShow.forEach(vacancy => {
    const row = document.createElement('tr');

    row.classList.add('vacancies__item');

    row.innerHTML = `
      <td class="vacancies__position">${vacancy.text}</td>
      <td class="vacancies__location">${vacancy.categories.location}</td>
      <td class="vacancies__apply">
        <a href="${vacancy.applyUrl}" class="vacancies__link">Apply</a>
      </td>
    `;

    list.append(row);
  });
}

function chooseLocation(text, select) {
  location = text;
  select.textContent = text;
  renderVacancies(vacancies);
}

async function startApplication() {
  await getData(groups);

  countGroupedVacancies(teamSelect);
  setBasicOption(basicTeamOption);
  setBasicOption(basicLocationOption);
  toggleLocationSelect();
  toggleTeamSelect();
}

startApplication();
