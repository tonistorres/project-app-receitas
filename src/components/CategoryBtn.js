import PropTypes from 'prop-types';
import React from 'react';

export default function CategoryBtn({ category, index }) {
  const NO_MAGIC_NUMBER = 5;
  if (index >= NO_MAGIC_NUMBER) return null;
  return (
    <div>
      <button
        type="button"
        data-testid={ `${category}-category-filter` }
      >
        {category}
      </button>
    </div>);
}

CategoryBtn.propTypes = {
  category: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
