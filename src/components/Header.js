import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [shouldRenderInput, handleInput] = useState(false);
  const { title } = props;
  const { shouldRenderMagnifier } = props;
  const history = useHistory();

  if (shouldRenderMagnifier) {
    return (
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="profileIcon" />
        </button>

        <h1 data-testid="page-title">{ title }</h1>

        <button
          type="button"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => handleInput(!shouldRenderInput) }
        >
          <img src={ searchIcon } alt="searchIcon" />
        </button>

        {shouldRenderInput && <SearchBar />}
      </header>
    );
  }

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </button>

      <h2 data-testid="page-title">{ title }</h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  shouldRenderMagnifier: PropTypes.bool.isRequired,
};

export default Header;
