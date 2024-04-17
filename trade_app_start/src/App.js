import React from 'react';
import TradeList from './components/TradeList';
import AddTrade from './components/AddTrade';
// import './App.css';  // Assuming you have some global styles

function App() {
  return (
    <div className="App">
        <h1>Stock Trading App</h1>
     
        <AddTrade />
        <TradeList />
     
    </div>
  );
}

export default App;
