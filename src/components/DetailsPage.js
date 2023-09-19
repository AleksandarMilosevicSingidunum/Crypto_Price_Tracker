import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { useApiService } from '../services/ApiService';

const DetailsPage = () => {
    const { symbol } = useParams();
    const [symbolData, setSymbolData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { isLoggedIn } = useAuth();
    const { tableData } = useApiService();

    useEffect(() => {
        const initialFavoriteStatus = localStorage.getItem(`favorite_${symbol}`);
        setIsFavorite(initialFavoriteStatus === 'true');
    }, [symbol]);

    useEffect(() => {
        if (tableData[symbol]) {
            setSymbolData(tableData[symbol]);
        }
    }, [tableData, symbol]);

    const toggleFavorite = () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (newFavoriteStatus) {
            if (!favorites.includes(symbol)) {
                favorites.push(symbol);
            }
        } else {
            const index = favorites.indexOf(symbol);
            if (index !== -1) {
                favorites.splice(index, 1);
            }
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem(`favorite_${symbol}`, newFavoriteStatus);
    };

    return (
        <div className="container mt-4 shadow">
            {symbolData ? (
                <>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                <h2>Crypto Details</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <h4 className="font-weight-bold">Name</h4>
                            <p>{symbolData.symbol}</p>
                        </div>
                        <div className="col-md-3">
                            <h4 className="font-weight-bold">Last Price</h4>
                            <p>{symbolData.lastPrice}</p>
                        </div>
                        <div className="col-md-3">
                            <h4 className="font-weight-bold">High</h4>
                            <p>{symbolData.dailyHigh}</p>
                        </div>
                        <div className="col-md-3">
                            <h4 className="font-weight-bold">Low</h4>
                            <p>{symbolData.dailyLow}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-3 text-left">
                        {isLoggedIn && (
                            <button
                                className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
                                onClick={toggleFavorite}
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
