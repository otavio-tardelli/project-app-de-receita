export default async function fetchSearchByNameDrinks(name) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}
