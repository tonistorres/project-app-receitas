import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../context/context';
import { searchByCategory } from '../services/fetch';
import './CategoryBtn.css';

export default function CategoryBtn({ category, index, pathname }) {
  const [btnClick, setBtnClick] = useState('');
  const NO_MAGIC_NUMBER = 5;
  const { setSearchByFilter, searchByFilter } = useContext(context);
  const handleCLick = async ({ target }) => {
    const { name } = target;
    const result = await searchByCategory(name, pathname);
    if (name === btnClick) {
      setSearchByFilter([]);
    }
    setSearchByFilter(result);
    if (!btnClick[0]) {
      setBtnClick(name);
    }
  };

  useEffect(() => {
    if (!searchByFilter[0]) {
      setBtnClick('');
    }
  }, [searchByFilter]);

  if (index >= NO_MAGIC_NUMBER) return null;
  return (
    <div className="container-butons-category-btn">
      <button
        name={ category }
        type="button"
        data-testid={ `${category}-category-filter` }
        onClick={ (e) => handleCLick(e) }
      >
        {category}
      </button>
    </div>);
}

CategoryBtn.propTypes = {
  category: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
