import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config';

function TradeList() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        axios.get(`${API_CONFIG.apiUrl}/trading/trades`)
            .then(response => setTrades(response.data.trades))
            .catch(error => console.error('Error fetching trades', error));
    }, []);

    return (
        <div>
            {/* Render the list of trades */}
        </div>
    );
}

export default TradeList;
