import React, { useState, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [allDoneRecipes, setAllDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const getAllDoneRecipes = () => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    return recipes;
  };

  useEffect(() => {
    setAllDoneRecipes(getAllDoneRecipes());
    setFilteredRecipes(getAllDoneRecipes());
  }, []);

  const handleFilter = (type) => {
    if (type !== 'all') {
      const filtered = allDoneRecipes.filter((element) => element.type === type);
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(allDoneRecipes);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" shouldRenderMagnifier={ false } />
      <div>
        <button
          type="button"
          value="allButton"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          value="foodButton"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          value="drinksButton"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          filteredRecipes.map((recipe, index) => (
            <DoneRecipeCard
              key={ recipe.id }
              doneRecipe={ recipe }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
