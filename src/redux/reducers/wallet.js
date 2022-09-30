import { GET_CURRENCIES } from '../actions/index';

const WALLET_INICIAL = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const currenciesReducer = (state = WALLET_INICIAL, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    state.wallet.currencies.push(...action.currencies);
    return state.wallet;
  }
  default:
    return state;
  }
};

export default currenciesReducer;
