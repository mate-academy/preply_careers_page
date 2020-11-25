/* eslint-disable no-undef */
export async function getData(groups) {
  const data = await fetch('https://api.lever.co/v0/postings/preply?mode=json');
  const vacancies = await data.json();

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
