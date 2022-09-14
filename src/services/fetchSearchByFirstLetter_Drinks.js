export default async function fetchSearchByFirstLetterDrinks(letter) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}
