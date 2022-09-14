import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';

function SearchBar() {
  const history = useHistory();
  const [radioValue, setRadioValue] = useState('Ingredient');
  const { inputText,
    setInputText,
    fetchSearchByName,
    fetchSearchByNameDrinks,
    fetchSearchByIngredientsDrinks,
    fetchSearchByIngredients,
    fetchSearchByFirstLetter,
    fetchSearchByFirstLetterDrinks,
    resultDataMeals,
    resultDataDrinks,
    setFilterState } = useContext(MyContext);

  function targetInput({ target }) {
    setInputText(target.value);
  }

  const url = window.location.href;
  const urlDrinks = 'http://localhost:3000/drinks';
  const urlFoods = 'http://localhost:3000/foods';

  function searchByRadioButton() {
    if (radioValue === 'Ingredient' && url === urlFoods) {
      fetchSearchByIngredients(inputText);
    } else if (radioValue === 'Ingredient' && url === urlDrinks) {
      fetchSearchByIngredientsDrinks(inputText);
    }

    if (radioValue === 'Name' && url === urlFoods) {
      fetchSearchByName(inputText);
    } else if (radioValue === 'Name' && url === urlDrinks) {
      fetchSearchByNameDrinks(inputText);
    }

    if (radioValue === 'FirstLetter' && inputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }

    if (radioValue === 'FirstLetter' && url === urlFoods) {
      fetchSearchByFirstLetter(inputText);
    } else if (radioValue === 'FirstLetter' && url === urlDrinks) {
      fetchSearchByFirstLetterDrinks(inputText);
    }
  }

  function redirectByID() {
    if (url === urlFoods && resultDataMeals.length === 1) {
      history.push(`/foods/${resultDataMeals[0].idMeal}`);
    } else if (url === urlDrinks && resultDataDrinks.length === 1) {
      history.push(`/drinks/${resultDataDrinks[0].idDrink}`);
    }
  }

  function click() {
    searchByRadioButton();
    setFilterState(true);
  }

  useEffect(() => {
    redirectByID();
  }, [resultDataMeals, resultDataDrinks]);

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar"
        onChange={ targetInput }
        value={ inputText }
        id="inputText"
      />
      <label htmlFor="ingredient-search">
        <input
          type="radio"
          id="ingredient-search"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          name="radioButton"
          defaultChecked={ radioValue === 'Ingredient' }
          onClick={ ({ target }) => setRadioValue(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="name-search">
        <input
          type="radio"
          id="dname-search"
          data-testid="name-search-radio"
          value="Name"
          name="radioButton"
          defaultChecked={ radioValue === 'Name' }
          onClick={ ({ target }) => setRadioValue(target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter-search">
        <input
          type="radio"
          id="first-letter-search"
          data-testid="first-letter-search-radio"
          value="FirstLetter"
          name="radioButton"
          defaultChecked={ radioValue === 'FirstLetter' }
          onClick={ ({ target }) => setRadioValue(target.value) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ click }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
