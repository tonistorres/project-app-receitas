import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DoneRecipes from './components/DoneRecipes';
import DrinksId from './components/DrinksId';
import DrinksInProgress from './components/DrinksInProgress';
import ExploreDrink from './components/ExploreDrink';
import ExploreDrinksIngredients from './components/ExploreDrinksIngredients';
import ExploreFood from './components/ExploreFood';
import ExploreFoodsIngredients from './components/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './components/ExploreFoodsNationalities';
import FavoriteRecipes from './components/FavoriteRecipes';
import FoodsId from './components/FoodsId';
import FoodsInProgress from './components/FoodsInProgress';
import Login from './components/Login';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/foods/:id" component={ FoodsId } />
          <Route path="/drinks/:id" component={ DrinksId } />
          <Route path="/foods/:id/in-progress" component={ FoodsInProgress } />
          <Route path="/drinks/:id/in-progress" component={ DrinksInProgress } />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/foods" component={ ExploreFood } />
          <Route path="/explore/drinks" component={ ExploreDrink } />
          <Route
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationalities }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
