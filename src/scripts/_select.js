import { getData } from '../api/api';

const teamSelect = document.querySelector('.js-team');
const basicTeamOption = teamSelect.querySelector('.js-select');
const locationSelect = document.querySelector('.js-location');
const basicLocationOption = locationSelect.querySelector('.js-select');
let vacancies;
let location;
const list = document.querySelector('.vacancies__list');
const groups = {};
let filteredGroups;

function countGroupedVacancies(select, teams) {
  const options = select.querySelectorAll('.js-option');

  options.forEach((option) => {
    const text = option.textContent.split(' (')[0];

    const length = teams[text] ? teams[text].length : '0';

    option.textContent = `${text} (${length})`;
  });

  setBasicOption(basicTeamOption, options);
}

function setBasicOption(select, options) {
  const wrapper = select.closest('.js-group');
  const option = wrapper.querySelectorAll('.js-option')[0];
  const text = option.textContent;

  if (select.textContent) {
    const textCut = select.textContent.split(' (')[0];

    select.textContent = [...options].find((opt) => {
      return opt.textContent.includes(textCut);
    }).textContent;

    return;
  }

  select.textContent = text;

  if (wrapper.classList.contains('js-team')) {
    chooseTeam(text, select);
  } else {
    chooseLocation(option, select);
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

  document.addEventListener('click', (event) => {
    const { target } = event;

    if (!basicTeamOption.classList.contains('select__basic-option--open')) {
      return;
    }

    if (!target.closest('.js-team')) {
      basicTeamOption.classList.remove('select__basic-option--open');
    }
  });
}

function toggleLocationSelect() {
  locationSelect.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('js-option')) {
      chooseLocation(target, basicLocationOption);
    }

    basicLocationOption.classList.toggle('select__basic-option--open');
  });

  document.addEventListener('click', (event) => {
    const { target } = event;

    if (!basicLocationOption.classList.contains('select__basic-option--open')) {
      return;
    }

    if (!target.closest('.js-location')) {
      basicLocationOption.classList.remove('select__basic-option--open');
    }
  });
}

function chooseTeam(text, select) {
  vacancies = filteredGroups[text.split(' ')[0]];

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

function chooseLocation(target, select) {
  const text = target.textContent;

  if (location) {
    if (target.id !== 'all') {
      for (const key in groups) {
        filteredGroups[key] = [...groups[key]].filter((vacancy) => {
          return vacancy.categories.location.includes(text);
        });
      }
    } else {
      filteredGroups = { ...groups };
    }
    countGroupedVacancies(teamSelect, filteredGroups);
  }

  location = text;
  select.textContent = text;
  renderVacancies(vacancies);
}

function renderError() {
  const vacanciesSection = document.querySelector('.vacancies');

  vacanciesSection.innerHTML = `
    <div>
      <p class="error">Can't load the vacancies. Try to reload the page</p>
    </div>
  `;
}

async function startApplication() {
  try {
    await getData(groups);
    filteredGroups = { ...groups };

    countGroupedVacancies(teamSelect, groups);
    setBasicOption(basicLocationOption);
    toggleLocationSelect();
    toggleTeamSelect();
  } catch (error) {
    renderError();
  }
}

startApplication();
