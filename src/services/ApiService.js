import { useState, useEffect } from 'react';

const symbols = ['BTCUSD', 'ETHUSD', 'LTCUSD', 'LTCBTC', 'ETHBTC'];

export const useApiService = () => {
    const [tableData, setTableData] = useState({});
    const [error, setError] = useState({});

    const establishWebSocketConnection = (symbol) => {
        const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        socket.onopen = () => {
            socket.send(JSON.stringify({
                event: 'subscribe',
                channel: 'ticker',
                symbol,
            }));
        };

        socket.onerror = (event) => {
            console.error(`WebSocket error for ${symbol}:`, event);
            setError(prevErrors => ({
                ...prevErrors,
                [symbol]: 'WebSocket connection error'
            }));
            socket.close();
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data) && data.length === 2) {
                const [
                    ,
                    [
                        ,
                        ,
                        ,
                        ,
                        dailyChange,
                        dailyChangeRelative,
                        lastPrice,
                        ,
                        dailyHigh,
                        dailyLow,
                    ],
                ] = data;
        
                if (
                    lastPrice !== undefined &&
                    dailyChange !== undefined &&
                    !isNaN(dailyChangeRelative) &&
                    dailyHigh !== undefined &&
                    dailyLow !== undefined
                ) {
                    const tickerData = {
                        symbol,
                        lastPrice,
                        dailyChange,
                        dailyChangePercent: dailyChangeRelative * 100,
                        dailyHigh,
                        dailyLow,
                    };
                    setTableData((prevData) => ({
                        ...prevData,
                        [symbol]: tickerData,
                    }));
                }
            }
        };
        

        socket.onclose = (event) => {
            if (event.code !== 1000) {
                console.error(`WebSocket connection closed unexpectedly for ${symbol}:`, event);
                setError(prevErrors => ({
                    ...prevErrors,
                    [symbol]: 'WebSocket connection closed unexpectedly'
                }));

                setTimeout(() => {
                    establishWebSocketConnection(symbol);
                }, 5000);
            }
        };
    };

    useEffect(() => {
        symbols.forEach(symbol => {
            establishWebSocketConnection(symbol);
        });

        return () => {
            symbols.forEach(symbol => {
                // Clean up WebSocket connections if needed.
            });
        };
    }, []);

    return { tableData, error };
};
