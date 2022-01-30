import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import '../index.css';
// import './Login.css';

function Login() {
  const history = useHistory();
  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });
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

  return (
    <div className="loginInput-main">
      <div className="login-input-conteudo">
        <input
          name="email"
          id="email"
          value={ email }
          type="email"
          data-testid="email-input"
          onChange={ (e) => handleChange(e) }
        />
        <input
          value={ password }
          name="password"
          id="password"
          type="password"
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
        />
      </div>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
        onClick={ () => handleCLick() }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
