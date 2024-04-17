import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = window?.configs?.serviceURL ? window.configs.serviceURL : "/";

function TradeList() {
  const [trades, setTrades] = useState([]);

  useEffect( () => {
    async function fetchData() {
        
    
           axios.get(`${API_URL}/trading/trades`)
          .then(response => {
            console.log('Trades fetched:', response.data.trades);
            setTrades(response.data.trades);
          })
          .catch(error => {
            console.error('Error fetching trades', error);
          });
      }
      fetchData();
  

  },[])
 

  return (
    <div>
      <h2>Trades</h2>
      <ul>
        {trades.map(trade => (
          <li key={trade.id}>{trade.stock_symbol} - {trade.quantity} shares at ${trade.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default TradeList;
