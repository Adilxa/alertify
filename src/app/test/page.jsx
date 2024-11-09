"use client"
import React, { useState } from 'react';

const GeoLocationRequest = () => {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestLocation = async () => {
        setIsLoading(true);
        setError(null);

        const data = {
            homeMobileCountryCode: 310,
            homeMobileNetworkCode: 410,
            radioType: "gsm",
            carrier: "Vodafone",
            considerIp: true,
        };

        const apiKey = "AIzaSyDzUqZoO2-89kI5gRX1dIfFvjGXyqjyppU"; // Замените на ваш ключ API

        try {
            const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch location');
            }

            const responseData = await response.json();
            setLocation(responseData.location);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={requestLocation} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get Location'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {location && (
                <div>
                    <h3>Location:</h3>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lng}</p>
                </div>
            )}
        </div>
    );
};

export default GeoLocationRequest;
