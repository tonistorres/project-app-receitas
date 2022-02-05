import React from 'react';
import '../../index.css';
import './LoadingStyle.css';
import img from '../../assets/img/loading.gif';

function Loading() {
  return (
    <div className="main-loading">

      <section className="container-img-loading">
        <div className="effect-css-moviment-2">
          <span>A</span>
          <span>p</span>
          <span>p</span>
        </div>
        <img className="img-loading" src={ img } alt="Loading" />
        <div className="effect-css-moviment-2">
          <span>R</span>
          <span>e</span>
          <span>c</span>
          <span>e</span>
          <span>i</span>
          <span>t</span>
          <span>a</span>
          <span>s</span>
        </div>
      </section>

    </div>
  );
}

export default Loading;
