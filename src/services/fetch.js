const ALL_DRINKS_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const ALL_FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export function getDrinksCategory() {
  fetch(ALL_DRINKS_CATEGORY)
    .then((r) => r.json())
    .then((data) => data.drinks.map((e) => e.strCategory));
}

export function filterDrinks(queue) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${queue}`)
    .then((r) => r.json())
    .then((data) => data.drinks);
}

export function getMealsCategory() {
  fetch(ALL_FOOD_CATEGORY)
    .then((r) => r.json())
    .then((data) => data.meals.map((e) => e.strCategory));
}

export function filterMeals(queue) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${queue}`)
    .then((r) => r.json())
    .then((data) => data.meals);
}
