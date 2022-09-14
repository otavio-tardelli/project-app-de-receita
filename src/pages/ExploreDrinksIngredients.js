import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreDrinksIngredients() {
  const { resultDataDrinks } = useContext(MyContext);
  const TWELVE = 12;
  const twelveDrinks = resultDataDrinks.slice(0, TWELVE);
  const history = useHistory();
  return (
    <div>
      <Header title="Explore Ingredients" shouldRenderMagnifier={ false } />
      {
        twelveDrinks.map((drink, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => history.push('/drinks') }
          >
            <img data-testid={ `${index}-card-img` } src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` } alt={ drink.strIngredients1 } />
            <p data-testid={ `${index}-card-name` }>{ drink.strIngredient1 }</p>
          </button>
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
