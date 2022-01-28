import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer">
      <button data-testid="drinks-bottom-btn" type="button">
        <img src={ drinkIcon } alt="explore btn" />
        Drinks
      </button>
      <button data-testid="explore-bottom-btn" type="button">
        <img src={ exploreIcon } alt="explore btn" />
        Explore
      </button>
      <button data-testid="food-bottom-btn" type="button">
        <img src={ mealIcon } alt="explore btn" />
        Food
      </button>
    </div>);
}
