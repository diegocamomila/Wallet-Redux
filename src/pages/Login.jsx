import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  hadleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validationInputs());
  };

  validationInputs = () => {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    // https://backefront.com.br/validacao-email-javascript/ 10/02/22
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email) && password.length >= PASSWORD_LENGTH) {
      return this.setState({
        isDisabled: false,
      });
    }
    this.setState({ isDisabled: true });
  };

  handleClick = () => {
    const { history: { push }, saveUserDispatch } = this.props;
    const { email } = this.state;
    saveUserDispatch(email);
    return push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            email:
            <input
              type="email"
              id="email"
              name="email"
              placeholder="alguem@alguem.com"
              data-testid="email-input"
              onChange={ this.hadleChange }
              value={ email }
            />
          </label>
          password:
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="6 ou mais caracteres"
              data-testid="password-input"
              onChange={ this.hadleChange }
              value={ password }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUserDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserDispatch: (payload) => dispatch(saveUserAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
