import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload
      );
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
