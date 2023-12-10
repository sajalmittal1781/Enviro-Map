import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import { AuthContext } from './context/AuthContext';
import { signOutUser } from './firebase/firebase';

const Home = () => {
    const auth = useContext(AuthContext);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://weather-et1t.onrender.com/cities'); 
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        const fetchDataForCities = async () => {
            try {
                const newData = {};

                for (const city of cities) {
                    const response = await axios.get(
                        'https://api.openweathermap.org/data/2.5/weather',
                        {
                            params: {
                                q: city.name,
                                appid: process.env.REACT_APP_APP_ID,
                                units: 'metric',
                            },
                        }
                    );

                    newData[city.name] = response.data;
                }

                if (JSON.stringify(newData) !== JSON.stringify(data)) {
                    setData(newData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCities();
        fetchDataForCities();

        const intervalId = setInterval(() => {
            fetchDataForCities();
        }, 1 * 60 * 1000);  // 1 minute

        return () => clearInterval(intervalId);
    }, [cities, data]);

    const customIconUrl =
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

    const customIcon = new L.Icon({
        iconUrl: customIconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const mapboxUrl =
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

    const handleLogout = async () => {
        try {
            await signOutUser();
            auth.logout();
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">EnviroMap</h1>
                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white mr-4"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <div className="flex-grow p-4">
                <div style={{ height: '85vh', width: '100%' }}>
                    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url={mapboxUrl.replace('{id}', 'mapbox/streets-v11').replace(
                                '{accessToken}',
                                process.env.REACT_APP_ACCESS_TOKEN
                            )}
                        />
                        {Object.values(data).map((item, index) => (
                            <Marker key={index} position={[item.coord.lat, item.coord.lon]} icon={customIcon}>
                                <Popup className="text-center p-4">
                                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                                    <p className="text-gray-700 mb-2">Temperature: {item.main.temp}°C</p>
                                    <p className="text-gray-700">Humidity: {item.main.humidity}%</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Home;
