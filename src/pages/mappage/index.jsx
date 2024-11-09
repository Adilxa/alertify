"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { $api } from '@/api/api';

const mapStyles = [
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1f2429"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b4b4b"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#434343"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#31363b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#31363b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#154f28"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#74a46b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2e3337"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#394045"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#544d50"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#544d50"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e5962"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4e5962"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9a8d8a"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#5b585b"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#2e2e2e"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#31363b"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0d1722"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e5962"
            }
        ]
    }
];

const MapPage = () => {
    const [nearest, setNearest] = useState([]);
    const [map, setMap] = useState(null);
    const [directions, setDirections] = useState(null);

    const getNear = async () => {
        try {
            const data = JSON.parse(localStorage.getItem("sos"));
            const res = await $api.post("/police/nearest", {
                sosId: data.id,
                lat: data.lat,
                lng: data.lng
            });
            setNearest(res?.data.nearestPolice);
        } catch (error) {
            console.error("Error fetching nearest police:", error);
        }
    };

    useEffect(() => {
        getNear();
    }, []);

    const containerStyle = {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    const data = JSON.parse(localStorage.getItem("sos"));

    const [center, setCenter] = useState({
        lat: data.lat,
        lng: data.lng
    });

    const mapOptions = {
        styles: mapStyles,
        // gestureHandling: 'cooperative',
        disableDefaultUI: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        backgroundColor: '#1f2429'
    };

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const createPath = () => {
        const path = [center]; // Start path with the user's location

        nearest.forEach(police => {
            path.push({ lat: police.position.latitude, lng: police.position.longitude });
        });

        return path;
    };

    const calculateRoute = async () => {
        const directionsService = new google.maps.DirectionsService();

        const waypoints = nearest.map(police => ({
            location: new google.maps.LatLng(police.position.latitude, police.position.longitude),
            stopover: true
        }));

        const request = {
            origin: new google.maps.LatLng(center.lat, center.lng),
            destination: new google.maps.LatLng(nearest[nearest.length - 1]?.position.latitude, nearest[nearest.length - 1]?.position.longitude),
            waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
                console.error('Error calculating directions:', status);
            }
        });
    };

    useEffect(() => {
        if (nearest.length > 0) {
            calculateRoute();
        }
    }, [nearest]);

    return (
        <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
            <LoadScript googleMapsApiKey={"AIzaSyDzUqZoO2-89kI5gRX1dIfFvjGXyqjyppU"}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={mapOptions}
                >
                    <Marker position={center} />
                    {nearest.map((police, index) => (
                        <Marker
                            key={index}
                            position={{ lat: police.position.latitude, lng: police.position.longitude }}
                        />
                    ))}
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapPage;
