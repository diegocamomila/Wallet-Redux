// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_WALLET, FETCH } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case FETCH:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
