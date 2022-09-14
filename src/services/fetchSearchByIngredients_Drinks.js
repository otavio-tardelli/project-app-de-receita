export default async function fetchSearchByIngredientsDrinks(ingredient) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}
