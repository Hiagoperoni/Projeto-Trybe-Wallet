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
