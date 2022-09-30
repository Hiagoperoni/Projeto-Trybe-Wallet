import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actEmailLogin } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  verificarLogin = () => {
    const { email, password } = this.state;
    const validacaoEmail = /\S+@\S+\.\S+/;
    const verificarEmail = validacaoEmail.test(email);
    const minSenha = 6;
    const verificarSenha = password.length >= minSenha;
    const podeLogar = verificarEmail && verificarSenha;
    this.setState({ disabled: !podeLogar });
  };

  mudarEstado = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificarLogin();
    });
  };

  guardarEmail = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actEmailLogin(email));
    history.push('/carteira');
  };

  render() {
    const { disabled } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          placeholder="Digite seu E-mail"
          onChange={ this.mudarEstado }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="Digite sua Senha"
          onChange={ this.mudarEstado }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.guardarEmail }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
