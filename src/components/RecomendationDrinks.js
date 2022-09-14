import React, { useEffect, useState } from 'react';
import '../style/Recomendation.css';

function RecomendationDrinks() {
  const [resultData, setResultData] = useState([]);

  async function recomendatioApi() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setResultData(data.meals);
  }
  const SIX = 6;
  const recomendations = resultData.slice(0, SIX);

  useEffect(() => {
    recomendatioApi();
  }, [resultData]);

  return (
    <div className="smallDiv">
      {
        recomendations.map((recomendation, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            className="position"
          >
            <img
              src={ recomendation.strMealThumb }
              data-testid="recipe-photo"
              alt="Recipe result"
              className="img"
            />
            <h1
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendation.strMeal}
            </h1>
            <p
              data-testid="recipe-category"
            >
              {recomendation.strCategory}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default RecomendationDrinks;
