import { getData } from '../api/api';

const teamSelect = document.querySelector('.js-team');
const locationSelect = document.querySelector('.js-location');
const basicTeamOption = teamSelect.querySelector('.js-select');
const basicLocationOption = locationSelect.querySelector('.js-select');
const list = document.querySelector('.js-list');
const groups = {};
let filteredGroups;

function createGroups(vacancies) {
  vacancies.forEach(vacancy => {
    const group = vacancy.categories.team;

    if (groups[group]) {
      groups[group] = [
        ...groups[group],
        vacancy,
      ];
    } else {
      groups[group] = [vacancy];
    }
  });
}

function countGroupedVacancies(select, teams) {
  const set = Object.keys(teams);
  const optionsList = select.querySelector('.js-options');

  optionsList.innerHTML = '';

  for (const value of set) {
    const option = document.createElement('li');
    const length = teams[value].length;

    option.classList.add('js-option');
    option.classList.add('select__option');
    option.textContent = `${value} (${length})`;
    optionsList.append(option);
  }

  setBasicOption(basicTeamOption);
}

function setBasicOption(basicOption) {
  const wrapper = basicOption.closest('.js-group');
  const options = wrapper.querySelectorAll('.js-option');
  const option = options[0];
  const text = option.textContent;

  if (basicOption.textContent) {
    const textCut = basicOption.textContent.split(' (')[0];

    basicOption.textContent = [...options].find((opt) => {
      return opt.textContent.includes(textCut);
    }).textContent;

    return;
  }

  basicOption.textContent = text;

  if (wrapper.classList.contains('js-team')) {
    chooseTeam(option, basicOption);
  } else {
    chooseLocation(option, basicOption);
  }
}

function toggleSelect(select, func, basicOption, selectPurpose) {
  select.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('js-option')) {
      func(target, basicOption);
    }

    basicOption.classList.toggle('select__basic-option--open');
  });

  document.addEventListener('click', (event) => {
    const { target } = event;

    if (!basicOption.classList.contains('select__basic-option--open')) {
      return;
    }

    if (!target.closest(`.js-${selectPurpose}`)) {
      basicOption.classList.remove('select__basic-option--open');
    }
  });
}

function chooseTeam(target, basicOption) {
  const text = target.textContent;
  const team = text.split(' (')[0];

  basicOption.textContent = text;

  renderVacancies(team);
}

function chooseLocation(target, basicOption) {
  const text = target.textContent;
  const teamText = basicTeamOption.textContent.split(' (')[0];

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
  basicOption.textContent = text;
  renderVacancies(teamText);
}

function renderVacancies(text) {
  list.innerHTML = '';

  const vacanciesToShow = filteredGroups[text];

  if (!vacanciesToShow || vacanciesToShow.length === 0) {
    const noVacancies = document.createElement('p');

    noVacancies.textContent = 'No vacancies available here';
    list.append(noVacancies);

    return;
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
}

function renderError() {
  const vacanciesSection = document.querySelector('.vacancies');

  vacanciesSection.innerHTML = `
    <div>
      <p class="vacancies__error">
        Can't load the vacancies. Try to reload the page.
      </p>
    </div>
  `;
}

async function startApplication() {
  try {
    const vacancies = await getData();

    createGroups(vacancies);
    filteredGroups = { ...groups };

    countGroupedVacancies(teamSelect, groups);
    setBasicOption(basicLocationOption);

    toggleSelect(
      locationSelect,
      chooseLocation,
      basicLocationOption,
      'location'
    );

    toggleSelect(teamSelect, chooseTeam, basicTeamOption, 'team');
  } catch (error) {
    renderError();
  }
}

startApplication();
