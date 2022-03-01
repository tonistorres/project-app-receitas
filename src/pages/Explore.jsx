import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import './Explore.css';

export default function Explore() {
  const history = useHistory();
  return (
    <div className="container-main-explore">

      <div className="container-bar-header-explore">
        <Link to="/profile">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile Icon" />
        </Link>
        <h1 data-testid="page-title">
          Explore
        </h1>
      </div>
      <div className="container-buttons-explore">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          <h1>Explore Foods</h1>
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          <h1>Explore Drinks</h1>
        </button>
      </div>
      <Footer />
    </div>);
}
