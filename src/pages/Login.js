import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const {
    disabled,
    setDisabled,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(MyContext);

  function getLocalStorage() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const emailLogin = { email };
    localStorage.setItem('user', JSON.stringify(emailLogin));
  }

  const history = useHistory();
  function submitButton() {
    const minLength = 6;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = regexEmail.test(email);

    const campos = [password, email];
    const todosCamposValidos = campos.every((field) => field !== '');

    if (password.length >= minLength
    && todosCamposValidos
    && isEmailValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function onInputChangeEmail({ target }) {
    setEmail(target.value);
    submitButton();
  }
  function onInputChangePassword({ target }) {
    setPassword(target.value);
    submitButton();
  }

  function handleClick() {
    submitButton();
    getLocalStorage();
    history.push('./foods');
  }

  return (
    <div>
      <div className="meals">
        <span className="logo">LOGIN!</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <label htmlFor="emailInput">
          Email
          <br />
          <input
            type="email"
            id="emailInput"
            data-testid="email-input"
            placeholder="e-mail"
            value={ email }
            onChange={ onInputChangeEmail }
          />
        </label>
        <label htmlFor="passwordInput">
          Senha
          <br />
          <input
            type="password"
            id="passwordInput"
            data-testid="password-input"
            placeholder="senha"
            value={ password }
            onChange={ onInputChangePassword }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ disabled }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
