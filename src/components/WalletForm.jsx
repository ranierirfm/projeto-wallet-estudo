import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editAction, fetchCurriences, walletAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
    };
  }

  componentDidMount() {
    // requisicao da api
    const { getCurriences } = this.props;

    getCurriences();
    // execucao da funcao
  }

  saveFormWallet=({ name, value }) => {
    this.setState({
      [name]: value,

    });
  };

  saveExpensesStore = () => {
    const { getExpenses } = this.props;
    getExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: '',
    });
  };

  editExpensesStore = () => {
    const { editExpense, id } = this.props;
    this.setState({
      id,
      value: '',
      description: '',
      method: '',
      tag: '',
    });
    editExpense(this.state);
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies, editor } = this.props;
    // console.log(currencies);
    return (
      <div>
        <form id="form">
          {/* <h4>Registre aqui sua dispesa:</h4> */}
          <label htmlFor="value-input">
            <input
              value={ value }
              placeholder="Valor:"
              name="value"
              type="number"
              id="value-input"
              data-testid="value-input"
              onChange={ (event) => this.saveFormWallet(event.target) }
            />

          </label>
          <label htmlFor="description-input">
            <input
              value={ description }
              placeholder="Descrição:"
              name="description"
              type="Area-text"
              id="description-inputt"
              data-testid="description-input"
              onChange={ (event) => this.saveFormWallet(event.target) }
            />
          </label>

          <label
            htmlFor="currency-input"
          >
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.saveFormWallet(event.target) }
            >

              { currencies.map((currencie) => (

                <option
                  key={ currencie }
                  onChange={ (event) => this.saveFormWallet(event.target) }
                >
                  { currencie }

                </option>
              )) }
              ;
            </select>
          </label>
          <label htmlFor="method-inputt">
            <select
              value={ method }
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ (event) => this.saveFormWallet(event.target) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              value={ tag }
              name="tag"
              type="dropdown"
              id="tag-input"
              data-testid="tag-input"
              onChange={ (event) => this.saveFormWallet(event.target) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {
            editor === false
              ? (
                <button
                  type="button"
                  onClick={ this.saveExpensesStore }
                  disabled=""
                  id="add"
                >
                  Adicionar despesa

                </button>)
              : (
                <button
                  type="button"
                  onClick={ this.editExpensesStore }
                  disabled=""
                  id="rmv"
                >
                  Editar despesa

                </button>
              )

          }

        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  editor: store.wallet.editor,
  id: store.wallet.expenses.id,
});

const mapDispatchToProps = (dispatch) => ({
  getCurriences: () => dispatch(fetchCurriences()),

  getExpenses: (expenses) => dispatch(walletAction(expenses)),
  editExpense: (expenses) => dispatch(editAction(expenses)),

});

WalletForm.propTypes = {

  currencies: PropTypes.func.isRequired,
  getCurriences: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  editExpense: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
