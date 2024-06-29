import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, removeTransaction } from '../transactionsSlice';
import { motion, AnimatePresence } from 'framer-motion';

const ExpenseTracker = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === '' || amount.trim() === '') {
      alert('Please add a text and amount');
    } else {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
      };
      dispatch(addTransaction(newTransaction));
      setText('');
      setAmount('');
    }
  };

  const handleRemoveTransaction = (id) => {
    dispatch(removeTransaction(id));
  };

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-5 text-center text-gray-700">Expense Tracker</h2>
      <div className="mb-4">
        <h4 className="text-lg text-gray-600">Your Balance</h4>
        <h1 className="text-4xl font-bold">${total}</h1>
      </div>
      <div className="flex justify-between mb-8">
        <div className="w-1/2 p-4 bg-green-100 rounded-lg text-center mr-2">
          <h4 className="text-lg text-green-600">Income</h4>
          <p className="text-2xl text-green-800 font-bold">+${income}</p>
        </div>
        <div className="w-1/2 p-4 bg-red-100 rounded-lg text-center ml-2">
          <h4 className="text-lg text-red-600">Expense</h4>
          <p className="text-2xl text-red-800 font-bold">-${expense}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-700">History</h3>
      <ul className="mb-5">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <motion.li
              key={transaction.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-2 ${
                transaction.amount < 0 ? 'border-r-4 border-red-500' : 'border-r-4 border-green-500'
              }`}
            >
              {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
              <button
                onClick={() => handleRemoveTransaction(transaction.id)}
                className="ml-4 text-red-500 hover:text-red-800 transition duration-300"
              >
                x
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <h3 className="text-xl font-bold text-gray-700 mb-3">Add new transaction</h3>
      <form onSubmit={handleAddTransaction}>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700">Text</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">Amount <small>(negative - expense, positive - income)</small></label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Add transaction</button>
      </form>
    </div>
  );
};

export default ExpenseTracker;
