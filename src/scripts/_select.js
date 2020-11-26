import { getData } from '../api/api';

const teamSelect = document.querySelector('.js-team');
const basicTeamOption = teamSelect.querySelector('.js-select');
const locationSelect = document.querySelector('.js-location');
const basicLocationOption = locationSelect.querySelector('.js-select');
let vacancies;
let location;
const list = document.querySelector('.vacancies__list');
const groups = {};

function countGroupedVacancies(select) {
  const options = select.querySelectorAll('.js-option');

  options.forEach((option) => {
    const text = option.textContent;
    const length = groups[text] ? groups[text].length : '0';

    option.textContent = `${text} (${length})`;
  });
}

function setBasicOption(select) {
  const wrapper = select.closest('.js-group');
  const option = wrapper.querySelectorAll('.js-option')[0];
  const text = option.textContent;

  select.textContent = text;

  if (wrapper.classList.contains('js-team')) {
    chooseTeam(text, select);
  } else {
    chooseLocation(text, select);
  }
}

function toggleTeamSelect() {
  teamSelect.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('js-option')) {
      chooseTeam(target.textContent, basicTeamOption);
    }

    basicTeamOption.classList.toggle('select__basic-option--open');
  });
}

function toggleLocationSelect() {
  locationSelect.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('js-option')) {
      chooseLocation(target.textContent, basicLocationOption);
    }

    basicLocationOption.classList.toggle('select__basic-option--open');
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

    const noVacancies = document.createElement('p');

    noVacancies.textContent = 'No vacancies available here';

    list.append(noVacancies);

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

    row.insertAdjacentHTML('beforeend', `
      <td class="vacancies__info">
        <div class="vacancies__position">${vacancy.text}</div>
        <div class="vacancies__location">${vacancy.categories.location}</div>
      </td>
      <td class="vacancies__apply">
        <a href="${vacancy.applyUrl}" class="vacancies__link">Apply</a>
        <a href="${vacancy.applyUrl}" class="vacancies__arrow"></a>
      </td>
    `);

    list.append(row);
  });

  if (vacanciesToShow.length === 0) {
    const noVacancies = document.createElement('p');

    noVacancies.textContent = 'No vacancies available here';

    list.append(noVacancies);
  }
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
