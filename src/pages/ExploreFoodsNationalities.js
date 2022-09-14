import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreFoodsNationalities() {
  const {
    // resultDataMeals,
    fetchAFoodsByArea,
    fetchSearchByNationalitie,
    resultArea } = useContext(MyContext);
  const [valueOption, setValueOption] = useState('');
  const [render, setRender] = useState([]);
  const TWELVE = 12;
  const history = useHistory();

  const renderByNationalitie = async () => {
    const data = await fetchSearchByNationalitie();
    const slice = data?.meals.slice(0, TWELVE);
    setRender(slice);
  };

  const getValueOption = async () => {
    if (valueOption === 'All') {
      return renderByNationalitie();
    }
    if (valueOption) {
      const data = await fetchAFoodsByArea(valueOption);
      const slice = data?.meals.slice(0, TWELVE);
      setRender(slice);
    }
  };

  function onChange({ target }) {
    setValueOption(target.value);
  }

  useEffect(() => {
    getValueOption();
  }, [valueOption]);
  useEffect(() => {
    renderByNationalitie();
  }, []);

  return (
    <div>
      <Header title="Explore Nationalities" shouldRenderMagnifier />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (event) => onChange(event) }
      >
        <option data-testid="All-option" value="All" name="All">All</option>
        {
          resultArea.map((nacionalitie, index) => {
            console.log(nacionalitie.strArea);
            return (
              <option
                data-testid={ `${nacionalitie.strArea}-option` }
                name={ nacionalitie.strArea }
                value={ nacionalitie.strArea }
                key={ index }
              >
                { nacionalitie.strArea }
              </option>
            );
          })
        }
      </select>
      {
        render.map((nationalitie, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <button
              type="button"
              onClick={ () => history.push(`/foods/${nationalitie.idMeal}`) }
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ nationalitie.strMeal }
                src={ nationalitie.strMealThumb }
              />
              <p data-testid={ `${index}-card-name` }>{ nationalitie.strMeal }</p>
            </button>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
