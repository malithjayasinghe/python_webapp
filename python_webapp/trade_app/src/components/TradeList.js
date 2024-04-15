import React, { useEffect, useState } from 'react';
import axios from 'axios';
import oauth from 'axios-oauth-client';

const API_URL = window?.configs?.serviceURL ? window.configs.serviceURL : "/";
const tokenUrl = window?.configs?.serviceURL ? window.configs.tokenUrl : "/";
const consumerKey = window?.configs?.serviceURL ? window.configs.consumerKey : "/";
const consumerSecret = window?.configs?.serviceURL ? window.configs.consumerSecret : "/";

async function TradeList() {
  const [trades, setTrades] = useState([]);
  const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    tokenUrl,
    consumerKey,
    consumerSecret
  );
  const auth = await getClientCredentials();
  const accessToken = auth.access_token;

  useEffect(() => {
    if (accessToken) { // Ensure accessToken is available before making the call
      axios.get(`${API_URL}/trading/trades`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => {
        setTrades(response.data.trades);
      })
      .catch(error => {
        console.error('Error fetching trades', error);
      });
    }
  }, [accessToken]);

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
