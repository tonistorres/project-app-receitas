import Copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import './ShareDoneBtnDone.css';

export default function ShareBtnDone({ local, id, index }) {
  const [copy, setCopy] = useState(false);

  const copyToClipBoard = () => {
    Copy(`http://localhost:3000/${local}/${id}`);
    setCopy(true);
  };
  return (
    <div className="container-main-share-btn-done">
      <button
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
        onClick={ () => copyToClipBoard() }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {copy && <p>Link copied!</p>}
    </div>);
}

ShareBtnDone.propTypes = {
  id: PropTypes.any,
  local: PropTypes.any,
  index: PropTypes.any,
}.isRequired;
