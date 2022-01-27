import React from 'react';
import PropTypes from 'prop-types';
import context from './context';

export default function Provider({ children }) {
  return (
    <context.Provider value={ context }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;
