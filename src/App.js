import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import './App.css';
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
import Provider from './context/Provider';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Foods from './pages/Foods';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/foods/:id" component={ FoodsId } />
            <Route exact path="/drinks/:id" component={ DrinksId } />
            <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
            <Route exact path="/explore" component={ Explore } />
            <Route exact path="/explore/foods" component={ ExploreFood } />
            <Route exact path="/explore/drinks" component={ ExploreDrink } />
            <Route
              exact
              path="/explore/foods/ingredients"
              component={ ExploreFoodsIngredients }
            />
            <Route
              exact
              path="/explore/drinks/ingredients"
              component={ ExploreDrinksIngredients }
            />
            <Route
              exact
              path="/explore/foods/nationalities"
              component={ ExploreFoodsNationalities }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
