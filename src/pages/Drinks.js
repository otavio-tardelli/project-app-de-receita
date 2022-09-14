import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';

function Drinks() {
  const [auxState, setAuxState] = useState(false);
  const [categorySelected, setCategorySelected] = useState('');
  const twelve = 12;
  const five = 5;
  const { resultAPIdrinks,
    filterState,
    resultDataDrinks,
    resultAPIdrinksCategories,
    fetchDrinksCategoriesSelected,
    resultAPIdrinksCategoriesSelected } = useContext(MyContext);
  const twelveFirsts = resultAPIdrinks.slice(0, twelve);
  const fiveFirsts = resultAPIdrinksCategories.slice(0, five);
  const twelveFirstsCategory = resultAPIdrinksCategoriesSelected.slice(0, twelve);
  const filterTwelve = resultDataDrinks.slice(0, twelve);
  const history = useHistory();

  function redirectByID(id) {
    history.push(`/drinks/${id}`);
  }

  if (auxState === true) {
    return (
      <>
        <Header title="Drinks" shouldRenderMagnifier />
        <div>
          <button
            type="button"
            data-testid="All-category-filter"
            value="allButton"
            onClick={ () => setAuxState(false) }
          >
            All
          </button>
          {
            fiveFirsts.map((element, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `${element.strCategory}-category-filter` }
                value={ element.strCategory }
                onClick={ ({ target }) => {
                  fetchDrinksCategoriesSelected(target.value);
                  if (element.strCategory === categorySelected) {
                    setAuxState(false);
                  } else {
                    setAuxState(true);
                    setCategorySelected(element.strCategory);
                  }
                } }
              >
                { element.strCategory }
              </button>
            ))
          }
        </div>
        {
          filterState === true
            ? resultDataDrinks.slice(0, twelve).map((element, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <button
                  type="button"
                  onClick={ () => redirectByID(element.idDrink) }
                >
                  <img
                    src={ element.strDrinkThumb }
                    alt="drink"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>
                    { element.strDrink }
                  </p>
                </button>
              </div>
            ))
            : twelveFirstsCategory.map((element, index) => (
              <div key={ element.idDrink } data-testid={ `${index}-recipe-card` }>
                <button
                  type="button"
                  onClick={ () => redirectByID(element.idDrink) }
                >
                  <img
                    src={ element.strDrinkThumb }
                    alt="drink"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>
                    { element.strDrink }
                  </p>
                </button>
              </div>
            ))
        }
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header title="Drinks" shouldRenderMagnifier />
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          value="allButton"
          onClick={ () => setAuxState(false) }
        >
          All
        </button>
        {
          fiveFirsts.map((element, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${element.strCategory}-category-filter` }
              value={ element.strCategory }
              onClick={ ({ target }) => {
                fetchDrinksCategoriesSelected(target.value);
                setAuxState(true);
                setCategorySelected(element.strCategory);
              } }
            >
              { element.strCategory }
            </button>
          ))
        }
      </div>
      {
        filterState === true ? filterTwelve.map((element, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <button
              type="button"
              onClick={ () => redirectByID(element.idDrink) }
            >
              <img
                src={ element.strDrinkThumb }
                alt="drink"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                { element.strDrink }
              </p>
            </button>
          </div>
        ))
          : twelveFirsts.map((element, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <button
                type="button"
                onClick={ () => redirectByID(element.idDrink) }
              >
                <img
                  src={ element.strDrinkThumb }
                  alt="drink"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>
                  { element.strDrink }
                </p>
              </button>
            </div>
          ))
      }
      <Footer />
    </>
  );
}

export default Drinks;
