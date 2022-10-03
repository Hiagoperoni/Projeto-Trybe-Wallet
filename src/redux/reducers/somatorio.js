import { SUM_VALUES } from '../actions/index';

const somarTodos = (state = 0, action) => {
  switch (action.type) {
  case SUM_VALUES: {
    return action.valor;
  }
  default:
    return state;
  }
};

export default somarTodos;
