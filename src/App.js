import React from 'react';
import TradeList from './components/TradeList';
import AddTrade from './components/AddTrade';

function App() {
    return (
        <div>
            <h1>Stock Trading App</h1>
            <AddTrade />
            <TradeList />
        </div>
    );
}

export default App;
