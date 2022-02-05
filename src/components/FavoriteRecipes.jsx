import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import ShareBtnDone from './ShareBtnDone';
import './Favorites.css';
import Footer from './Footer';

export default function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const [elementsFilter, setElementsFilter] = useState([]);
  const [reLoad, setReLoad] = useState(false);

  const removeLocal = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes.filter((i) => i.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setReLoad(true);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filter === 'Drink') {
      setElementsFilter(favoriteRecipes.filter((item) => item.type.includes('drink')));
    }
    if (filter === 'Food') {
      setElementsFilter(favoriteRecipes.filter((item) => item.type.includes('food')));
    }
    if (filter === 'All') {
      setElementsFilter(favoriteRecipes);
    }
    setReLoad(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, reLoad]);

  const convertLink = (tipo, id) => {
    if (tipo.includes('food')) {
      return `/foods/${id}`;
    }
    return `/drinks/${id}`;
  };

  return (
    <main className="container-main-favorites">

      <header className="cotainer-header-favorites">
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile Icon"
          />
        </Link>
        <h1 data-testid="page-title">Favorites</h1>
      </header>

      <section className="container-buttons-favorites">
        <button
          type="button"
          onClick={ () => setFilter('All') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => setFilter('Food') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => setFilter('Drink') }
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </section>

      <div className="container-body-important-favorites">
        {elementsFilter && elementsFilter.map((i, index) => (

          <div key={ index } className="container-conteudo-body-favorites">

            <div className="container-img-body-favorites">

              <Link
                to={ convertLink(i.type, i.id) }
              >

                <img
                  src={ i.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ i.name }
                  className="img-main-favorites"
                />

              </Link>

            </div>

            <div className="container-info-body-favorites">

              <div className="container-info-body-horizontal-favorites">

                <p data-testid={ `${index}-horizontal-top-text` } id="nationality">
                  {i.nationality !== ''
                    ? `${i.nationality} - ${i.category}` : i.alcoholicOrNot }
                </p>

                <ShareBtnDone
                  index={ index }
                  local={ i.type.includes('food') ? 'foods' : 'drinks' }
                  id={ i.id }
                />
              </div>
              <section className="container-info-body-horizontal-two-favorites">
                <Link to={ convertLink(i.type, i.id) }>
                  <p data-testid={ `${index}-horizontal-name` }>{i.name}</p>
                </Link>

                <button
                  type="button"
                  onClick={ () => removeLocal(i.id) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt="blackhearticon" />

                </button>
              </section>

            </div>

          </div> // FIM container-conteudo-body
        ))}
      </div>
      <Footer />
    </main>
  );
}
