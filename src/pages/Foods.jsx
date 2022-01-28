import React, { useContext } from 'react';
import FoodCard from '../components/FoodCard';
import Header from '../components/Header';
import context from '../context/context';

export default function Foods() {
  const { searchByFilter } = useContext(context);
  return (
    <div>
      <Header />
      {searchByFilter.length > 1 && searchByFilter
        .map((food, index) => <FoodCard key={ index } index={ index } food={ food } />)}
    </div>
  );
}
