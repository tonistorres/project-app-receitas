import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="explore btn" />
      </Link>
      <Link to="/explore" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore btn" />
      </Link>
      <Link to="/foods" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="explore btn" />
      </Link>
    </div>);
}
