import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  total = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => (
      acc + curr.value * curr.exchangeRates[curr.currency].ask
    ), 0).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          {`Email: ${email}`}
        </span>

        <span data-testid="total-field">
          {`Total ${this.total()}`}
        </span>

        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
