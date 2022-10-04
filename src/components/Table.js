import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, sumValues } from '../redux/actions/index';

class Table extends Component {
  pegarNomeMoeda = (cadaGasto) => {
    const arrayDeMoedas = Object.entries(cadaGasto.exchangeRates);
    const moedaEscolhida = arrayDeMoedas
      .filter((cadaArray) => cadaArray[0] === cadaGasto.currency);
    return (moedaEscolhida[0][1].name);
  };

  pegarCambio = (cadaGasto) => {
    const arrayDeMoedas = Object.entries(cadaGasto.exchangeRates);
    const moedaEscolhida = arrayDeMoedas
      .filter((cadaArray) => cadaArray[0] === cadaGasto.currency);
    const valorAsk = Number(moedaEscolhida[0][1].ask);
    const valorCerto = valorAsk.toFixed(2);
    return valorCerto;
  };

  pegarValorTotal = (cadaGasto) => {
    const arrayDeMoedas = Object.entries(cadaGasto.exchangeRates);
    const moedaEscolhida = arrayDeMoedas
      .filter((cadaArray) => cadaArray[0] === cadaGasto.currency);
    const valorAsk = Number(moedaEscolhida[0][1].ask);
    const valorTotal = cadaGasto.value * valorAsk;
    const valorTotalCerto = valorTotal.toFixed(2);
    return valorTotalCerto;
  };

  pegarValorDoValue = (cadaGasto) => {
    const valor = Number(cadaGasto.value);
    const valorCerto = valor.toFixed(2);
    return valorCerto;
  };

  excluirItem = (id) => {
    const { expenses, dispatch } = this.props;
    const listaDeExpenses = expenses.filter((cadaExpense) => cadaExpense.id !== id);
    dispatch(deleteExpense(listaDeExpenses));
    const valores = listaDeExpenses.map((cadaGasto) => {
      const { value, currency, exchangeRates } = cadaGasto;
      const moedas = Object.entries(exchangeRates);
      const moedaEscolhida = moedas.filter((cadaMoeda) => cadaMoeda[0] === currency);
      const valorAsk = moedaEscolhida[0][1].ask;
      const valorTotal = Number(value) * Number(valorAsk);
      return valorTotal;
    });
    const somaTotal = valores.reduce((a, b) => Number(a) + Number(b), 0);
    const valorSomaTotal = somaTotal.toFixed(2);
    dispatch(sumValues(valorSomaTotal));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses ? expenses.map((cadaGasto) => (
              <tr key={ cadaGasto.id }>
                <td>{cadaGasto.description}</td>
                <td>{cadaGasto.tag}</td>
                <td>{cadaGasto.method}</td>
                <td>{this.pegarValorDoValue(cadaGasto)}</td>
                <td>{this.pegarNomeMoeda(cadaGasto)}</td>
                <td>{this.pegarCambio(cadaGasto)}</td>
                <td>{this.pegarValorTotal(cadaGasto)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.excluirItem(cadaGasto.id) }
                    id={ cadaGasto.id }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) : <td>Nenhum Gasto ainda</td>
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return state.wallet;
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
