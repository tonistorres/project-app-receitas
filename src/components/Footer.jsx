import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Fotter.css';

export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="container-main-footer"
      style={ { position: 'fixed', bottom: 0 } }
    >
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="explore btn" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="explore btn" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="explore btn" />
      </Link>
    </div>);
}
