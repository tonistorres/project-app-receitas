import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import './Header.css';

function Header({ name }) {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="container-main-header">
      <div className="container-bar-header">
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile Icon"
            className="ico-bar-header"
          />
        </Link>
        <h1 className="h1-title-header">{name}</h1>
        <button
          type="button"
          onClick={ () => setIsSearch(!isSearch) }
          className="btn-search-header"
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search Icon"
            className="ico-bar-header"
          />
        </button>
      </div>
      { isSearch && <HeaderSearchBar /> }
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Header;
