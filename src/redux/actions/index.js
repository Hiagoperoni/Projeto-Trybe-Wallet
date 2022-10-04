export const EMAIL_LOGIN = 'EMAIL_LOGIN';

export const actEmailLogin = (email) => ({
  type: EMAIL_LOGIN, email,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const actGetCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const fetchAllCurrencies = await fetch(endpoint);
  const data = await fetchAllCurrencies.json();
  const dataArray = Object.keys(data);
  const novoArray = dataArray.filter((cadaUma) => cadaUma !== 'USDT');
  dispatch(actGetCurrencies(novoArray));
};

export const FILTER_CURRENCIES = 'FILTER_CURRENCIES';

export const actFilterCurrencies = (item) => ({
  type: FILTER_CURRENCIES,
  item,
});

export const chosenCurrency = (item) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const fetchAllCurrencies = await fetch(endpoint);
  const data = await fetchAllCurrencies.json();
  item.exchangeRates = data;
  dispatch(actFilterCurrencies(item));
};

export const SUM_VALUES = 'SUM_VALUES';

export const sumValues = (valor) => ({
  type: SUM_VALUES,
  valor,
});

export const DEL_EXPENSE = 'DEL_EXPENSE';

export const deleteExpense = (novaLista) => ({
  type: DEL_EXPENSE,
  novaLista,
});
