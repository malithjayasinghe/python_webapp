import React, { useEffect, useState } from 'react';
import axios from 'axios';
import oauth from 'axios-oauth-client';

const API_URL = window?.configs?.serviceURL ? window.configs.serviceURL : "/";
const tokenUrl = window?.configs?.tokenURL ? window.configs.tokenURL : "/";
const consumerKey = window?.configs?.consumerKey ? window.configs.consumerKey : "/";
const consumerSecret = window?.configs?.consumerSecret ? window.configs.consumerSecret : "/";

function TradeList() {
  const [trades, setTrades] = useState([]);

  useEffect( () => {
    async function fetchData() {
        const getClientCredentials = oauth.clientCredentials(
            axios.create(),
            tokenUrl,
            consumerKey,
            consumerSecret
          );
        
          const auth =  await getClientCredentials();
    
           const accessToken=auth.access_token;
    
           console.log('accessToken', accessToken);
    
           axios.get(`${API_URL}/trading/trades`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .then(response => {
            console.log('Trades fetched:', response.data.trades);
            setTrades(response.data.trades);
          })
          .catch(error => {
            console.error('Error fetching trades', error);
          });
      }
      fetchData();


    console.log('tokenUrl', tokenUrl);
  

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
