import React, { useState } from 'react';
import '../index.css';
import './Login.css';

function Login() {
  const [infos, setInfos] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function checkInput() {
    const { email, password } = infos;
    const minNumber = 6;
    if (email.endsWith('.com') && email.includes('@') && minNumber <= password.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }

  function handleChange({ target }) {
    checkInput();
    const { name, value } = target;
    setInfos({ ...infos, [name]: value });
  }

  const { email, password } = infos;
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
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
