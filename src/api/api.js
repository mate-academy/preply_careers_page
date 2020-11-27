/* eslint-disable no-undef */
const BASE_URL = 'https://api.lever.co/v0/postings/preply?mode=json';

export async function getData(groups) {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const vacancies = await response.json();

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
  } catch (error) {
    throw new Error(error);
  }
}
