import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../style/DoneRecipes.css';

function DoneRecipeCard(props) {
  const { doneRecipe: {
    id, type,
    nationality, category,
    alcoholicOrNot, name,
    image, doneDate,
    tags }, index } = props;

  const [copied, setCopied] = useState(false);

  async function handleClickShare() {
    const url = `http://localhost:3000/foods/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    type === 'food'
      ? (
        <div>
          <Link to={ `/foods/${id}` } key={ name }>
            <div>
              <img
                className="doneRecipeImage"
                src={ image }
                alt="Recipe"
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            <div>
              <h3 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h3>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${nationality} - ${category}` }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { doneDate.split(' ')[0] }
              </p>
              <div>
                { tags.map((tag) => {
                  if (tag) {
                    return (
                      <p
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </p>
                    );
                  }
                  return null;
                }) }
              </div>
            </div>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            alt="Share button"
            onClick={ handleClickShare }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          {
            copied
              ? <p> Link copied! </p>
              : ''
          }
        </div>
      )
      : (
        <div>
          <Link to={ `/drinks/${id}` } key={ name }>
            <div>
              <img
                className="doneRecipeImage"
                src={ image }
                alt="Recipe"
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            <div>
              <h3 data-testid={ `${index}-horizontal-name` }>
                { name }
              </h3>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { doneDate.split(' ')[0] }
              </p>
            </div>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            alt="Share button"
            onClick={ handleClickShare }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          {
            copied
              ? <p> Link copied! </p>
              : ''
          }
        </div>
      )
  );
}

DoneRecipeCard.propTypes = {
  doneRecipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipeCard;
