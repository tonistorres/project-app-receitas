import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from './Loading/Loading';
import '../index.css';
import './Login.css';

const TIMER_SETTIMOUT = 5000;

function Login() {
  const history = useHistory();
  const [loading, setLoanding] = useState(true);
  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });

  function controLoading() {
    setLoanding(false);
  }

  useEffect(() => {
    setTimeout(controLoading, TIMER_SETTIMOUT);
  }, []);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { email, password } = infos;

  function checkInput() {
    const minNumber = 6;
    if (email.endsWith('.com') && email.includes('@') && minNumber <= password.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  function handleCLick() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const obj = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/foods');
  }

  function handleChange({ target }) {
    checkInput();
    const { name, value } = target;
    setInfos({ ...infos, [name]: value });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="loginInput-main">
      <div className="efeitos-autenticacao-app">
        <div className="login-input-conteudo">
          <input
            className="inputs-padrao-login"
            name="email"
            id="email"
            value={ email }
            type="email"
            data-testid="email-input"
            placeholder="email"
            onChange={ (e) => handleChange(e) }
          />
          <input
            className="inputs-padrao-login"
            value={ password }
            name="password"
            id="password"
            type="password"
            placeholder="user name"
            data-testid="password-input"
            onChange={ (e) => handleChange(e) }
          />
        </div>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ buttonDisabled }
          onClick={ () => handleCLick() }
          className="btns-login-model-1"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
