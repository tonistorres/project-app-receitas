import React from 'react';
import '../../index.css';
import './LoadingStyle.css';
import img from '../../assets/img/loading.gif';

function Loading() {
  return (
    <div className="main-loading">

      <section className="container-img-loading">
        <div className="effect-css-moviment-2">
          {/* <span>R</span>
          <span></span>
          <span>p</span> */}
        </div>
        <img className="img-loading" src={ img } alt="Loading" />
        <div className="effect-css-moviment-2">
          <span>K</span>
          <span>o</span>
          <span>n</span>
          <span>o</span>
          <span>h</span>
          <span>a</span>
          {/* <span>.</span>
          <span>.</span> */}
        </div>
      </section>

    </div>
  );
}

export default Loading;
