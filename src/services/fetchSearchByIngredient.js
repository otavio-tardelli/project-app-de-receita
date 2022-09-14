export default async function fetchSearchByIngredients(ingredient) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}
