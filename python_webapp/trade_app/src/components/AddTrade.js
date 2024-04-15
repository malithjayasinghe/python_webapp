import React, { useState } from 'react';
import oauth from 'axios-oauth-client';
import axios from 'axios';
const API_URL = window?.configs?.serviceURL ? window.configs.serviceURL : "/";
const tokenUrl = window?.configs?.serviceURL ? window.configs.tokenUrl : "/";
const consumerKey = window?.configs?.serviceURL ? window.configs.consumerKey : "/";
const consumerSecret = window?.configs?.serviceURL ? window.configs.consumerSecret : "/";


function AddTrade() {
  const [tradeData, setTradeData] = useState({
    stock_symbol: '',
    price: '',
    quantity: '',
    trade_type: 'buy'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTradeData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  //sample nodeJS code snippet



  const handleSubmit =async (event) => {
    event.preventDefault();
    // consumerKey, consumerSecret and tokenUrl represent variables to which respective environment variables were read
    const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    tokenUrl,
    consumerKey,
    consumerSecret
    );
    const auth = await getClientCredentials();
    const accessToken = auth.access_token;


    axios.post(`${API_URL}/trading/trades`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
    },tradeData)
      .then(response => {
        console.log('Trade added:', response.data);
      })
      .catch(error => {
        console.error('Error adding trade', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="stock_symbol" value={tradeData.stock_symbol} onChange={handleChange} placeholder="Stock Symbol" />
      <input type="number" name="price" value={tradeData.price} onChange={handleChange} placeholder="Price" />
      <input type="number" name="quantity" value={tradeData.quantity} onChange={handleChange} placeholder="Quantity" />
      <select name="trade_type" value={tradeData.trade_type} onChange={handleChange}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <button type="submit">Submit Trade</button>
    </form>
  );
}

export default AddTrade;
