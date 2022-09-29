import { EMAIL_LOGIN } from '../actions';

const estadoInicial = {
  email: '',
};

const userLogin = (state = estadoInicial, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return { email: action.email };
  default: return state;
  }
};

export default userLogin;
