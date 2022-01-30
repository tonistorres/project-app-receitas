import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CategoryBtn from '../components/CategoryBtn';
import DrinkCard from '../components/DrinkCard';
import DrinksId from '../components/DrinksId';
import Footer from '../components/Footer';
import Header from '../components/Header';
import context from '../context/context';
import { nameSearch } from '../services/fetch';

export default function Drinks() {
  const { searchByFilter, drinkCategory, setSearchByFilter } = useContext(context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const fetchRecipes = async () => {
    const result = await nameSearch('', '/drinks');
    setSearchByFilter(result);
  };

  useEffect(() => {
    if (!searchByFilter[0]) {
      fetchRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByFilter]);
  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (history.location.pathname !== '/drinks') return <DrinksId />;
  return (
    <div>
      <h1 data-testid="page-title">Drinks</h1>
      <Header />
      {drinkCategory
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
        onClick={ () => setSearchByFilter([]) }
      >
        All
      </button>
      {searchByFilter !== null && searchByFilter
        .map((drink, index) => (
          <DrinkCard
            key={ index }
            index={ index }
            drink={ drink }
          />))}
      <Footer />
    </div>
  );
}
