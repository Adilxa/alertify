import React, { useEffect, useState } from 'react';
import { useLongPress } from "@uidotdev/usehooks";
import { $api } from '@/api/api';
import { useRouter } from "next/navigation";

const SOSButton = () => {
    const [location, setLocation] = useState(null);

    const [hold, setHold] = useState(false);

    const router = useRouter()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;
                    setLocation({ lat: latitude, lng: longitude, accuracy });
                    console.log(`Точность: ${accuracy} метров`); // Вывод точности
                },
                (err) => {
                    setError("Не удалось получить местоположение.");
                    console.error(err);
                },
                {
                    enableHighAccuracy: true,  // Включение высокой точности
                    timeout: 1000,             // Тайм-аут запроса (10 секунд)
                    maximumAge: 0              // Без кэширования старых значений
                }
            );
        } else {
            setError("Геолокация не поддерживается в этом браузере.");
        }
    }, []);

    const clickSos = async () => {
        await $api.put(`users/${localStorage.getItem("id")}/position`, { lng: location?.lng, lat: location?.lat })
            .finally(() =>
                $api.post("sos/create", { uid: localStorage.getItem("id"), lng: location?.longitude, lat: location?.latitude })
                    .then((res) => localStorage.setItem("sos", JSON.stringify(res.data.sos)))
            ).finally(() =>
                router.push("map")
            )
        setHold(false);
    }

    const attrs = useLongPress(
        () => {
            if (location) {
                console.log("SOS Alert sent with location:", location);
            } else {
                console.log("Location not available");
            }
        },
        {
            onStart: () => {
                console.log("Press started");
                setHold(true);
            },
            onFinish: async () => await clickSos()
            ,
            onCancel: () => {
                console.log("Press cancelled");
                setHold(false);
            },
            threshold: 1500,
        }
    );

    return (
        <div style={{ ...styles.buttonContainer, ...(hold ? styles.buttonContainerHold : {}) }} {...attrs}>
            <div style={{ ...styles.glowEffect, ...(hold ? styles.glowEffectActive : {}) }}></div>
            <div style={styles.textContainer}>
                <p style={styles.sosText}>Alertify</p>
                <p style={styles.instructionText}>Нажмите и удерживайте<br />3 секунды</p>
            </div>
        </div>
    );
};

const styles = {
    buttonContainer: {
        position: 'relative',
        width: "60%",
        aspectRatio: "1 / 1",
        borderRadius: '50%',
        backgroundColor: '#1E1E1E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
    },
    buttonContainerHold: {
        transform: 'scale(0.9)',
    },
    glowEffect: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        boxShadow: '0 0 20px 5px rgba(245, 104, 104, 0.4)',
        top: 0,
        left: 0,
        transition: 'box-shadow 0.3s ease',
    },
    glowEffectActive: {
        animation: 'pulse 1.5s infinite',
        boxShadow: '0 0 30px 10px rgba(245, 104, 104, 0.6)',
    },
    textContainer: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    sosText: {
        fontSize: '32px',
        fontWeight: 'bold',
        margin: 0,
    },
    instructionText: {
        fontSize: '14px',
        margin: '5px 0 0 0',
        lineHeight: '1.5',
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
            boxShadow: '0 0 20px 5px rgba(245, 104, 104, 0.4)',
        },
        '50%': {
            transform: 'scale(2)',
            boxShadow: '0 0 30px 10px rgba(245, 104, 104, 0.6)',
        },
        '100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 20px 5px rgba(245, 104, 104, 0.4)',
        },
    },
};

export default SOSButton;
