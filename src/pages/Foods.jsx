import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';
import FoodCard from '../components/FoodCard';
import FoodsId from '../components/FoodsId';
import Header from '../components/Header';
import Fotter from '../components/Footer';
import context from '../context/context';
import { ingredientsSearch, nameSearch } from '../services/fetch';
import './Foods.css';
import '../index.css';

export default function Foods() {
  const { searchByFilter,
    foodCategory, setSearchByFilter } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;
  const fetchRecipes = async () => {
    const result = await nameSearch('', '/foods');
    setSearchByFilter(result);
  };

  const verifyStateLocation = async () => {
    const { location: { state } } = history;
    if (state) {
      const result = await ingredientsSearch(state, '/drinks');
      setSearchByFilter(result);
    }
  };

  useEffect(() => {
    const { location: { state } } = history;
    if (!searchByFilter[0] && !state) {
      fetchRecipes();
    } else {
      verifyStateLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByFilter]);
  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pathname !== '/foods') return <FoodsId />;

  return (
    <div className="container-main-foods">
      <h1 data-testid="page-title"> </h1>
      <Header name="Foods" />
      <div className="container-buttons-food">
        {foodCategory
          .map((i, index) => (
            <CategoryBtn
              category={ i }
              pathname={ pathname }
              index={ index }
              key={ index }
            />))}

        <button
          type="button"
          data-testid="All-category-filter"
          className="btn-all-category"
          onClick={ () => setSearchByFilter([]) }
        >
          All
        </button>
      </div>
      <section className="body-food-main">
        {searchByFilter !== null && searchByFilter
          .map((food, index) => (
            <FoodCard
              key={ index }
              index={ index }
              food={ food }
            />))}
      </section>
      <Fotter />
    </div>
  );
}
