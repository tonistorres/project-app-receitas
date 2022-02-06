import Copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';
import './ShareBtn.css';

// copiar para clipboard = https://www.npmjs.com/package/clipboard-copy
export default function ShareBtn({ type, id }) {
  const [copy, setCopy] = useState(false);
  const history = useHistory();
  const copyToClipBoard = () => {
    if (!id && !type) {
      const { pathname } = history.location;
      if (pathname.includes('in-progress')) {
        Copy(`http://localhost:3000${pathname.split('/in-')[0]}`);
        setCopy(true);
      } else {
        Copy(`http://localhost:3000${pathname}`);
        setCopy(true);
      }
    } else {
      Copy(`http://localhost:3000/${type}/${id}`);
      setCopy(true);
    }
  };
  return (
    <div className="container-main-share-btn">
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => copyToClipBoard() }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      {copy && <p>Link copied!</p>}
    </div>);
}

ShareBtn.propTypes = {
  id: PropTypes.any,
  type: PropTypes.any,
}.isRequired;
