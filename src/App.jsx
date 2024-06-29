import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ExpenseTracker from './component/ExpenseTracker';

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <ExpenseTracker />
      </div>
    </Provider>
  );
};

export default App;
