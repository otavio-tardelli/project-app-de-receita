import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/Details.css';
import MyContext from '../context/MyContext';
import RecomendationFoods from '../components/RecomendationFoods';

function FoodDetails() {
  const { favoriteState, setFavoriteState } = useContext(MyContext);
  const [resultDataID, setResultDataID] = useState([]);
  const { id_da_receita: id } = useParams();
  const [copied, setCopied] = useState(false);

  async function mealsIdAPI() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setResultDataID(data.meals);
  }
  const history = useHistory();
  useEffect(() => {
    mealsIdAPI();
  }, []);
  useEffect(() => {
  }, [resultDataID]);

  function handleClick() {
    history.push(`/foods/${id}/in-progress`);
  }

  function changeFavoriteState() {
    setFavoriteState(!favoriteState);
    console.log(favoriteState);
  }

  const favorite = favoriteState ? blackHeartIcon
    : whiteHeartIcon;

  async function handleClickShare() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }
  const ingredients = [
    'strIngredient1',
    'strIngredient2',
    'strIngredient3',
    'strIngredient4',
    'strIngredient5', 'strIngredient6', 'strIngredient7',
    'strIngredient8', 'strIngredient9', 'strIngredient10',
    'strIngredient11', 'strIngredient12', 'strIngredient13',
    'strIngredient14', 'strIngredient15', 'strIngredient16',
    'strIngredient17', 'strIngredient18', 'strIngredient19',
    'strIngredient20'];

  const measures = [
    'strMeasure1',
    'strMeasure2',
    'strMeasure3',
    'strMeasure4',
    'strMeasure5', 'strMeasure6', 'strMeasure7',
    'strMeasure8', 'strMeasure9', 'strMeasure10',
    'strMeasure11', 'strMeasure12', 'strMeasure13',
    'strMeasure14', 'strMeasure15', 'strMeasure16',
    'strMeasure17', 'strMeasure18', 'strMeasure19',
    'strMeasure20'];

  return (
    <>
      {
        resultDataID.map((element, index) => (
          <div key={ index }>
            <img
              src={ element.strMealThumb }
              data-testid="recipe-photo"
              alt="Recipe result"
            />
            <h1
              data-testid="recipe-title"
            >
              {element.strMeal}
            </h1>
            <p
              data-testid="recipe-category"
            >
              {element.strCategory}
            </p>
            <button
              type="button"
              data-testid="share-btn"
              alt="Share button"
              onClick={ handleClickShare }
            >
              <img src={ shareIcon } alt="shareIcon" />
            </button>
            {
              copied
                ? <p> Link copied! </p>
                : ''
            }
            <button
              type="button"
              alt="favorite button"
              onClick={ changeFavoriteState }
            >
              <img
                src={ favorite }
                alt="Favorite button"
                data-testid="favorite-btn"
              />
            </button>
            <ul>
              {' '}
              <b>Ingredients:</b>
              {
                ingredients.map((ingredient, i) => (
                  element[ingredient] === '' ? '' : (
                    <li
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      key={ i }
                    >
                      { element[ingredient] }
                      { ' ' }
                      { element[measures[i]] }
                    </li>)
                ))
              }
            </ul>
            <h1>Instructions</h1>
            <p
              data-testid="instructions"
            >
              {element.strInstructions}
            </p>
            <iframe
              width="560"
              height="315"
              title="YouTube video player"
              src={ element.strYoutube.split('watch?v=').join('embed/') }
              frameBorder="0"
              allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="video"
            >
              VIDEO
            </iframe>
            <div>
              <img
                alt="food"
              />
            </div>
          </div>
        ))
      }
      <button
        className="startButton"
        type="button"
        data-testid="start-recipe-btn"
        alt="Start recipe"
        onClick={ handleClick }
      >
        Start recipe
      </button>
      <div className="recomen">
        <RecomendationFoods />
      </div>
    </>
  );
}

export default FoodDetails;
