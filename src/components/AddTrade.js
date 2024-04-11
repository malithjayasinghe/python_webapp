import React, { useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config';

function AddTrade() {
    const [tradeData, setTradeData] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_CONFIG.apiUrl}/trading/trades`, tradeData, {
            headers: {
                'Client-ID': API_CONFIG.clientId,
                'Client-Secret': API_CONFIG.clientSecret
            }
        })
        .then(response => {/* handle success */})
        .catch(error => console.error('Error adding trade', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for tradeData */}
            <button type="submit">Add Trade</button>
        </form>
    );
}

export default AddTrade;
