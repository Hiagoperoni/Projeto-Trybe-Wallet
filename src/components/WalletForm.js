import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, chosenCurrency, sumValues } from '../redux/actions';

class WalletForm extends Component {
  state = {
    isLoading: true,
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
    this.setState({ isLoading: false });
  }

  converterValor = () => {
    const { expenses, dispatch } = this.props;
    const valores = expenses.map((cadaDespesa) => {
      const { exchangeRates, currency, value } = cadaDespesa;
      const moedas = Object.entries(exchangeRates);
      const cotacoes = moedas.filter((cadaMoeda) => cadaMoeda[0] === currency);
      const valorPraConverter = cotacoes[0][1].ask;
      const valorConvertido = Number(value) * Number(valorPraConverter);
      return valorConvertido;
    });
    const somaTotal = valores.reduce((a, b) => Number(a) + Number(b), 0);
    const ValorSomaTotal = somaTotal.toFixed(2);
    dispatch(sumValues(ValorSomaTotal));
  };

  adicionarAoEstado = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const item = { id, value, description, currency, method, tag };
    await dispatch(chosenCurrency(item));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
    this.converterValor();
  };

  changeState = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { isLoading, value, description } = this.state;
    if (isLoading) {
      return <p>Carregando...</p>;
    }
    return (
      <form>
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.changeState }
          placeholder="Digite o Valor"
        />
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ this.changeState }
          placeholder="Digite sua Despesa"
        />
        <label htmlFor="currencies">
          <select
            data-testid="currency-input"
            id="currencies"
            name="currency"
            onChange={ this.changeState }
          >
            {
              currencies.map((cadaMoeda, index) => (
                <option key={ `Moeda: ${cadaMoeda}, ${index}` }>
                  {cadaMoeda}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="pagamento">
          <select
            data-testid="method-input"
            id="pagamento"
            name="method"
            onChange={ this.changeState }
          >
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
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ this.changeState }
          >
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
        <button
          type="button"
          onClick={ this.adicionarAoEstado }
        >
          Adicionar despesa
        </button>

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
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
