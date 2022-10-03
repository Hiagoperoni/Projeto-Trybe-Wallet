import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
};

export default connect(mapStateToProps)(Table);
