import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency, wallet } from '../actions';
import fetchCurrencys from '../helpers/funçoes';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: [],
    };
    this.coin = this.coin.bind(this);
  }

  componentDidMount() {
    this.coin();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleButton = () => {
    const { setDispatch, setDispatchFetch } = this.props;
    const { currency } = this.state;
    setDispatch(this.state);
    console.log('teste 123');
    setDispatchFetch(currency);
    this.setState((state) => ({ value: 0, id: state.id + 1 }));
  }

  async coin() {
    const fetch = await fetchCurrencys();
    this.setState({ exchangeRates: fetch });
  }

  render() {
    const { method, tag, currency, value, description } = this.state;
    const moeda = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    return (
      <form>
        <input
          value={ value }
          id="value"
          name="value"
          type="number"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          value={ description }
          id="description"
          name="description"
          type="text"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          Moeda:
          <select
            value={ currency }
            id="currency"
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {moeda.map((coin) => (
              <option key="coin" data-testid={ coin }>
                {coin}
              </option>
            ))}

          </select>
        </label>
        <label htmlFor="method">
          Método De Pagamento:
          <select
            value={ method }
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            value={ tag }
            id="tag"
            name="tag-input"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setDispatch: (value) => dispatch(wallet(value)),
  setDispatchFetch: (val) => dispatch(getCurrency(val)),

});

Form.propTypes = {
  setDispatch: PropTypes.func.isRequired,
  setDispatchFetch: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Form);
