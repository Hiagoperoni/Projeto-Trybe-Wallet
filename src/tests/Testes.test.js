import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';

const email = 'hiagoperoni@gmail.com';

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

test('Testa adiciona uma despesa', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const inputEmail = screen.getByPlaceholderText(/digite seu e-mail/i);
  userEvent.type(inputEmail, email);
  const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
  userEvent.type(inputPassword, '12345678');
  const botaoLogin = screen.getByRole('button', { name: /entrar/i });
  userEvent.click(botaoLogin);
  const { pathname } = history.location;
  expect(pathname).toBe('/carteira');
  await waitFor(() => {
    const valorInput = screen.getByTestId('value-input');
    userEvent.type(valorInput, '200');
    const description = screen.getByTestId('currency-input');
    userEvent.type(description, 'Hamburguer');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addButton);
    const valorAdicionado = screen.getByText(/hamburguer/i);
    expect(valorAdicionado).toBeInTheDocument();
  });

  // await waitFor(() => expect(screen.getByTestId('description-input')).toBeInTheDocument());
  // await waitFor(() => expect(screen.getByTestId('currency-input')).toBeInTheDocument());
  // await waitFor(() => expect(screen.getByTestId('method-input')).toBeInTheDocument());
  // await waitFor(() => expect(screen.getByTestId('tag-input')).toBeInTheDocument());
});
