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

    const cities = [
        { name: 'New York', coords: { lat: 40.7128, lon: -74.0060 } },
        { name: 'London', coords: { lat: 51.509865, lon: -0.118092 } },
        { name: 'Tokyo', coords: { lat: 35.6895, lon: 139.6917 } },
        { name: 'Beijing', coords: { lat: 39.9042, lon: 116.4074 } },
        { name: 'Sydney', coords: { lat: -33.8688, lon: 151.2093 } },
        { name: 'Cape Town', coords: { lat: -33.9249, lon: 18.4241 } },
        { name: 'Rio de Janeiro', coords: { lat: -22.9083, lon: -43.1964 } },
        { name: 'Delhi', coords: { lat: 28.6139, lon: 77.2090 } },
        { name: 'Gharaunda', coords: { lat: 29.5404, lon: 76.9784 } },
        { name: 'Mumbai', coords: { lat: 19.0760, lon: 72.8777 } },
        { name: 'Chennai', coords: { lat: 13.0827, lon: 80.2707 } },
        { name: 'Kolkata', coords: { lat: 22.5726, lon: 88.3639 } },
        { name: 'Bangalore', coords: { lat: 12.9716, lon: 77.5946 } },
        { name: 'Hyderabad', coords: { lat: 17.3850, lon: 78.4867 } },
        { name: 'Ahmedabad', coords: { lat: 23.0225, lon: 72.5714 } },
        { name: 'Pune', coords: { lat: 18.5204, lon: 73.8567 } },
        { name: 'Jaipur', coords: { lat: 26.9124, lon: 75.7873 } },
        { name: 'Lucknow', coords: { lat: 26.8467, lon: 80.9462 } },
        { name: 'Moscow', coords: { lat: 55.7558, lon: 37.6176 } },
        { name: 'Paris', coords: { lat: 48.8566, lon: 2.3522 } },
        { name: 'Berlin', coords: { lat: 52.5200, lon: 13.4050 } },
        { name: 'Rome', coords: { lat: 41.9028, lon: 12.4964 } },
        { name: 'Istanbul', coords: { lat: 41.0082, lon: 28.9784 } },
        { name: 'Shanghai', coords: { lat: 31.2304, lon: 121.4737 } },
        { name: 'Toronto', coords: { lat: 43.6532, lon: -79.3832 } },
        { name: 'Los Angeles', coords: { lat: 34.0522, lon: -118.2437 } },
        { name: 'Toronto', coords: { lat: 43.651070, lon: -79.347015 } }

    ];

    const customIconUrl =
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

    const customIcon = new L.Icon({
        iconUrl: customIconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataForCities = async () => {
            try {
                const promises = cities.map(async (city) => {
                    const response = await axios.get(
                        'https://api.openweathermap.org/data/2.5/weather',
                        {
                            params: {
                                q: city.name,
                                appid:  process.env.REACT_APP_APP_ID,
                                units: 'metric',
                            },
                        }
                    );

                    return response.data;
                });

                const cityData = await Promise.all(promises);
                setData(cityData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataForCities();
    }, [cities]);

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

    console.log(process.env.REACT_APP_ACCESS_TOKEN);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">EnviroMap</h1>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                >
                    Logout
                </button>
            </header>
            <div className="flex-grow p-4">
                <MapContainer center={[0, 0]} zoom={2} className="h-screen w-full">
                    <TileLayer
                        url={mapboxUrl.replace('{id}', 'mapbox/streets-v11').replace(
                            '{accessToken}',
                            process.env.REACT_APP_ACCESS_TOKEN
                        )}
                    />
                    {data.map((item, index) => (
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
    );
};

export default Home;