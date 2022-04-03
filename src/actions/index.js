// Coloque aqui suas actions
import fetchCurrencys from '../helpers/funçoes';

export const SAVE_USER_EMAIL = 'SAVE_USER';
export const saveUserAction = (payload) => ({
  type: SAVE_USER_EMAIL,
  payload,
});

export const SAVE_WALLET = 'SAVE_WALLET';
export const wallet = (payload) => ({
  type: SAVE_WALLET,
  payload,
});

export const FETCH = 'FETCH';
export const Fetch = (payload) => ({
  type: FETCH,
  payload,
});

export const getCurrency = (currency) => async (dispatch) => {
  await fetchCurrencys(currency).then((response) => dispatch(Fetch(response)));
};
