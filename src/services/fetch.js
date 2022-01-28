const ALL_DRINKS_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const ALL_FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export function getDrinksCategory() {
  return fetch(ALL_DRINKS_CATEGORY)
    .then((r) => r.json())
    .then((data) => data.drinks.map((e) => e.strCategory));
}

export function filterDrinks(queue) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${queue}`)
    .then((r) => r.json())
    .then((data) => data.drinks);
}

export function getMealsCategory() {
  return fetch(ALL_FOOD_CATEGORY)
    .then((r) => r.json())
    .then((data) => data.meals.map((e) => e.strCategory));
}

export function filterMeals(queue) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${queue}`)
    .then((r) => r.json())
    .then((data) => data.meals);
}

export function ingredientsSearch(queue, pathname) {
  if (pathname === '/foods') {
    const result = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${queue}`)
      .then((r) => r.json())
      .then((data) => data.meals);
    return result;
  }
  const result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${queue}`)
    .then((r) => r.json())
    .then((data) => data.drinks);
  return result;
}

export function nameSearch(queue, pathname) {
  if (pathname === '/foods') {
    const result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queue}`)
      .then((r) => r.json())
      .then((data) => data.meals);
    return result;
  }
  const result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${queue}`)
    .then((r) => r.json())
    .then((data) => data.drinks);
  return result;
}

export function letterSearch(queue, pathname) {
  if (pathname === '/foods') {
    const result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${queue}`)
      .then((r) => r.json())
      .then((data) => data.meals);
    return result;
  }
  const result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${queue}`)
    .then((r) => r.json())
    .then((data) => data.drinks);
  return result;
}
