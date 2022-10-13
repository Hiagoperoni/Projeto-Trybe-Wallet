import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
import mockFetch from './helpers/mockFetch';

const email = 'hiagoperoni@gmail.com';

describe('Página principal', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Testa se possui os inputs de Email, Senha e botão de Entrar', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    expect(inputEmail).toBeInTheDocument();
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    expect(inputPassword).toBeInTheDocument();
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).toBeInTheDocument();
  });

  test('Testa se a verificação de email e senha funcionam', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(inputPassword, '123456');
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    expect(botaoLogin).not.toHaveAttribute('disabled');
  });

  test('Testa se redireciona para a Pagina Carteira ao fazer o Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(inputPassword, '12345678');
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(botaoLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Testa se a pagina da Carteira possui o email cadastrado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(inputPassword, '12345678');
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(botaoLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const nomeEmail = screen.getByText(email);
    expect(nomeEmail).toBeInTheDocument();
  });

  test('Testa se o form possui os inputs corretos', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(inputPassword, '12345678');
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(botaoLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    await waitFor(() => expect(screen.getByTestId('value-input')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('description-input')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('currency-input')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('method-input')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('tag-input')).toBeInTheDocument());
  });

  test('Testa se possui um Carregando enquanto pega as Infos da API', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(inputPassword, '12345678');
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(botaoLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const loading = screen.getByText(/carregando/i);
    expect(loading).toBeInTheDocument();
  });

  test('Testa se um cabeçalho da Tabela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(inputPassword, '12345678');
    const botaoLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(botaoLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const descricao = screen.getByText(/descrição/i);
    expect(descricao).toBeInTheDocument();
    const tag = screen.getByText(/tag/i);
    expect(tag).toBeInTheDocument();
    const metodo = screen.getByText(/método de pagamento/i);
    expect(metodo).toBeInTheDocument();
    const valor = screen.getAllByText(/valor/i);
    expect(valor.length).toBe(2);
    const moeda = screen.getAllByText(/moeda/i);
    expect(moeda.length).toBe(2);
    const cambio = screen.getByText(/câmbio utilizado/i);
    expect(cambio).toBeInTheDocument();
    const convertido = screen.getByText(/valor convertido/i);
    expect(convertido).toBeInTheDocument();
    const conversao = screen.getByText(/moeda de conversão/i);
    expect(conversao).toBeInTheDocument();
    const excluir = screen.getByText(/excluir/i);
    expect(excluir).toBeInTheDocument();
  });

  test('Testa adiciona uma despesa e apaga', async () => {
    const dataDia = '2022-10-13 01:46:54';
    const initialState = {
      user: {
        email: 'hiagoperonip@gmail.com',
      },
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
        expenses: [
          {
            id: 0,
            value: '30',
            description: 'Hamburguer',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            exchangeRates: {
              USD: {
                code: 'USD',
                codein: 'BRL',
                name: 'Dólar Americano/Real Brasileiro',
                high: '5.2933',
                low: '5.2933',
                varBid: '0.0003',
                pctChange: '0',
                bid: '5.293',
                ask: '5.2935',
                timestamp: '1665591289',
                create_date: '2022-10-12 13:14:49',
              },
              USDT: {
                code: 'USD',
                codein: 'BRLT',
                name: 'Dólar Americano/Real Brasileiro Turismo',
                high: '5.295',
                low: '5.295',
                varBid: '0',
                pctChange: '0',
                bid: '5.14',
                ask: '5.45',
                timestamp: '1665574860',
                create_date: '2022-10-12 08:41:00',
              },
              CAD: {
                code: 'CAD',
                codein: 'BRL',
                name: 'Dólar Canadense/Real Brasileiro',
                high: '3.8356',
                low: '3.8287',
                varBid: '-0.0013',
                pctChange: '-0.04',
                bid: '3.8288',
                ask: '3.8295',
                timestamp: '1665636412',
                create_date: '2022-10-13 01:46:52',
              },
              GBP: {
                code: 'GBP',
                codein: 'BRL',
                name: 'Libra Esterlina/Real Brasileiro',
                high: '5.8864',
                low: '5.8628',
                varBid: '-0.0029',
                pctChange: '-0.05',
                bid: '5.8694',
                ask: '5.871',
                timestamp: '1665636414',
                create_date: dataDia,
              },
              ARS: {
                code: 'ARS',
                codein: 'BRL',
                name: 'Peso Argentino/Real Brasileiro',
                high: '0.0351',
                low: '0.0351',
                varBid: '0',
                pctChange: '0',
                bid: '0.0351',
                ask: '0.0351',
                timestamp: '1665608404',
                create_date: '2022-10-12 18:00:04',
              },
              BTC: {
                code: 'BTC',
                codein: 'BRL',
                name: 'Bitcoin/Real Brasileiro',
                high: '102',
                low: '100.566',
                varBid: '-931',
                pctChange: '-0.91',
                bid: '100.75',
                ask: '100.857',
                timestamp: '1665635869',
                create_date: '2022-10-13 01:37:49',
              },
              LTC: {
                code: 'LTC',
                codein: 'BRL',
                name: 'Litecoin/Real Brasileiro',
                high: '280.55',
                low: '275.22',
                varBid: '-1.62',
                pctChange: '-0.58',
                bid: '275.22',
                ask: '275.98',
                timestamp: '1665635869',
                create_date: '2022-10-13 01:37:49',
              },
              EUR: {
                code: 'EUR',
                codein: 'BRL',
                name: 'Euro/Real Brasileiro',
                high: '5.1461',
                low: '5.1323',
                varBid: '0.0003',
                pctChange: '0.01',
                bid: '5.1353',
                ask: '5.1379',
                timestamp: '1665636413',
                create_date: '2022-10-13 01:46:53',
              },
              JPY: {
                code: 'JPY',
                codein: 'BRL',
                name: 'Iene Japonês/Real Brasileiro',
                high: '0.03608',
                low: '0.03603',
                varBid: '0',
                pctChange: '0',
                bid: '0.03605',
                ask: '0.03607',
                timestamp: '1665636406',
                create_date: '2022-10-13 01:46:46',
              },
              CHF: {
                code: 'CHF',
                codein: 'BRL',
                name: 'Franco Suíço/Real Brasileiro',
                high: '5.3119',
                low: '5.3012',
                varBid: '0.0006',
                pctChange: '0.01',
                bid: '5.3041',
                ask: '5.3052',
                timestamp: '1665636414',
                create_date: dataDia,
              },
              AUD: {
                code: 'AUD',
                codein: 'BRL',
                name: 'Dólar Australiano/Real Brasileiro',
                high: '3.33',
                low: '3.3173',
                varBid: '-0.0009',
                pctChange: '-0.03',
                bid: '3.3203',
                ask: '3.3217',
                timestamp: '1665636414',
                create_date: dataDia,
              },
              CNY: {
                code: 'CNY',
                codein: 'BRL',
                name: 'Yuan Chinês/Real Brasileiro',
                high: '0.7374',
                low: '0.7368',
                varBid: '-0.0008',
                pctChange: '-0.11',
                bid: '0.7369',
                ask: '0.737',
                timestamp: '1665635464',
                create_date: '2022-10-13 01:31:04',
              },
              ILS: {
                code: 'ILS',
                codein: 'BRL',
                name: 'Novo Shekel Israelense/Real Brasileiro',
                high: '1.4848',
                low: '1.4825',
                varBid: '0.0053',
                pctChange: '0.36',
                bid: '1.4847',
                ask: '1.4849',
                timestamp: '1665636366',
                create_date: '2022-10-13 01:46:06',
              },
              ETH: {
                code: 'ETH',
                codein: 'BRL',
                name: 'Ethereum/Real Brasileiro',
                high: '6.94184',
                low: '6.78404',
                varBid: '-52.53',
                pctChange: '-0.77',
                bid: '6.796',
                ask: '6.80535',
                timestamp: '1665635868',
                create_date: '2022-10-13 01:37:48',
              },
              XRP: {
                code: 'XRP',
                codein: 'BRL',
                name: 'XRP/Real Brasileiro',
                high: '2.63',
                low: '2.5',
                varBid: '-0.09',
                pctChange: '-3.51',
                bid: '2.51',
                ask: '2.51',
                timestamp: '1665635850',
                create_date: '2022-10-13 01:37:30',
              },
              DOGE: {
                code: 'DOGE',
                codein: 'BRL',
                name: 'Dogecoin/Real Brasileiro',
                high: '0.321241',
                low: '0.310436',
                varBid: '-0.00898999',
                pctChange: '-2.8',
                bid: '0.311636',
                ask: '0.311636',
                timestamp: '1665636407',
                create_date: '2022-10-13 01:46:47',
              },
            },
          },
        ],
        editor: false,
        idToEdit: 0,
        valorTotal: '158.81',
      },
      somarTodos: '158.81',
    };
    renderWithRouterAndRedux(<Wallet />, initialState);
    const nenhumValor = screen.getByText('Nenhum Gasto ainda');
    expect(nenhumValor).toBeInTheDocument();
    const inputValor = await screen.findByTestId('value-input');
    expect(inputValor).toBeInTheDocument();
    const despesa = await screen.findByTestId('description-input');
    expect(despesa).toBeInTheDocument();
    const botaoAdicionar = await screen.findByRole('button', { name: /adicionar despesa/i });
    expect(botaoAdicionar).toBeInTheDocument();
    userEvent.type(inputValor, '30');
    userEvent.type(despesa, 'hamburguer');
    userEvent.click(botaoAdicionar);
    const hamburguer = await screen.findByText('hamburguer');
    expect(hamburguer).toBeInTheDocument();
    const valor = screen.getByRole('cell', { name: /30\.00/i });
    expect(valor).toBeInTheDocument();
    const botaoExcluir = screen.getByRole('button', { name: /excluir/i });
    expect(botaoExcluir).toBeInTheDocument();
    userEvent.click(botaoExcluir);
    expect(hamburguer).not.toBeInTheDocument();
  });
});
