import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreFoodsIngredients() {
  const { resultDataMeals } = useContext(MyContext);
  const TWELVE = 12;
  const twelveFoods = resultDataMeals.slice(0, TWELVE);
  const history = useHistory();

  return (
    <div>
      <Header title="Explore Ingredients" shouldRenderMagnifier={ false } />
      {
        twelveFoods.map((food, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => history.push('/foods') }
          >
            <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` } alt={ food.strIngredients } />
            <p data-testid={ `${index}-card-name` }>{ food.strIngredient }</p>
          </button>
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
