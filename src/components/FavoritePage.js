import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiService } from '../services/ApiService'; // Import the ApiService

const FavoritesPage = () => {
    const { tableData } = useApiService(); // Use the ApiService
    const [favoriteData, setFavoriteData] = React.useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const fetchFavoriteData = () => {
            const favoriteData = favorites
                .filter((symbol) => tableData[symbol]) // Filter out symbols with undefined data
                .map((symbol) => tableData[symbol]);

            setFavoriteData(favoriteData);
        };

        fetchFavoriteData();

        const updateInterval = setInterval(() => {
            fetchFavoriteData();
        }, 2000);

        return () => clearInterval(updateInterval);
    }, [tableData]);

    const handleRowClick = (symbol) => {
        navigate(`/details/${symbol}`);
    };

    return (
        <div>
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
                    {favoriteData.map((data, index) => (
                        <tr key={data.symbol + index}>
                            <td onClick={() => handleRowClick(data.symbol)} style={{ cursor: 'pointer', color: 'cyan', fontWeight: 'bold' }}>{data.symbol}</td>
                            <td>{data.lastPrice}</td>
                            <td>{data.dailyChange}</td>
                            <td style={{ color: data.dailyChangePercent && data.dailyChangePercent < 0 ? 'red' : 'green' }}>
                                {data.dailyChangePercent ? data.dailyChangePercent.toFixed(2) + '%' : ''}
                            </td>
                            <td>{data.dailyHigh}</td>
                            <td>{data.dailyLow}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FavoritesPage;
