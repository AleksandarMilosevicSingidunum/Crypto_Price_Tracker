import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useApiService } from '../services/ApiService';

const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD', 'LTCBTC', 'ETHBTC'];

const HomePage = () => {
    const { tableData, error } = useApiService();
    const navigate = useNavigate();
    const handleRowClick = (symbol) => {
        navigate(`/details/${symbol}`);
    };

    return (
        <div>
            {Object.keys(error).length > 0 ? (
                <div>
                    {Object.keys(error).map((symbol, index) => (
                        <div key={index}>
                            {symbol} Error: {error[symbol]}
                        </div>
                    ))}
                </div>
            ) : (
                <table className="table table-striped shadow">
                    <thead>
                        <tr>
                            <th className="font-weight-bold">Name</th>
                            <th className="font-weight-bold">Last</th>
                            <th className="font-weight-bold">Change</th>
                            <th className="font-weight-bold">Change Percent</th>
                            <th className="font-weight-bold">High</th>
                            <th className="font-weight-bold">Low</th>
                        </tr>
                    </thead>
                    <tbody>
                        {symbols.map((symbol) => {
                            const {
                                lastPrice,
                                dailyChange,
                                dailyChangePercent,
                                dailyHigh,
                                dailyLow,
                            } = tableData[symbol] || {};

                            return (
                                <tr key={symbol}>
                                    <td
                                        onClick={() => handleRowClick(symbol)}
                                        style={{
                                            cursor: 'pointer',
                                            color: 'cyan',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {symbol}
                                    </td>
                                    <td>{lastPrice}</td>
                                    <td>{dailyChange}</td>
                                    <td style={{ color: dailyChangePercent < 0 ? 'red' : 'green' }}>
                                        {dailyChangePercent?.toFixed(2)}%
                                    </td>
                                    <td>{dailyHigh}</td>
                                    <td>{dailyLow}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HomePage;
