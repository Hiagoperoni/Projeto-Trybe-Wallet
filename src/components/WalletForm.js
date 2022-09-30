import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
    this.setState({ isLoading: false });
  }

  render() {
    const { currencies } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          placeholder="Digite o Valor"
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="Digite sua Despesa"
        />
        <label htmlFor="currencies">
          <select data-testid="currency-input" id="currencies">
            {
              currencies.map((cadaMoeda) => (
                <option key={ cadaMoeda }>
                  {cadaMoeda}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="pagamento">
          <select data-testid="method-input" id="pagamento">
            <option>
              Dinheiro
            </option>
            <option>
              Cartão de crédito
            </option>
            <option>
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          <select data-testid="tag-input" id="tag">
            <option>
              Alimentação
            </option>
            <option>
              Lazer
            </option>
            <option>
              Trabalho
            </option>
            <option>
              Transporte
            </option>
            <option>
              Saúde
            </option>
          </select>
        </label>

      </form>
    );
  }
}

function mapStateToProps(state) {
  const { wallet } = state;
  return wallet;
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
