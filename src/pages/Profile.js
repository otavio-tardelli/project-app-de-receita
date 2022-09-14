import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Header title="Profile" shouldRenderMagnifier={ false } />
      <h2 data-testid="profile-email">{user?.email}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
export default Profile;
