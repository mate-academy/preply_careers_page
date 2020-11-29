/* eslint-disable no-undef */
const BASE_URL = 'https://api.lever.co/v0/postings/preply?mode=json';

export async function getData(groups) {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const vacancies = await response.json();

    return vacancies;
  } catch (error) {
    throw new Error(error);
  }
}
