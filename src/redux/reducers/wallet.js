// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES_SUCCESS':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'SAVE_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],

    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenses.id),
    };
  default:
    return state;
  }
};

export default wallet;
