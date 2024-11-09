import React, { useState } from 'react';
import ARROW from "../../assets/arrow.svg";
import Image from 'next/image';
import { $api } from '@/api/api';

const SOSInfoPopup = () => {

    const [isConfirmed, setConfirm] = useState(false)



    const onConfiramtion = async () => {
        const userId = localStorage.getItem("id")
        const res = await $api.post(`/users/${userId}/confirm`)

        if (res.data.user.isConfirmed) {
            setConfirm(res.data.user.isConfirmed)
        }
    }



    return (
        <div>
            {isConfirmed ? <></> : <div style={styles.overlay}>
                <p style={{ height: "40dvh" }}></p>
                <Image alt='' src={ARROW} style={{ position: "relative", right: -50, top: -10 }} />

                <div style={styles.popup}>

                    <p style={styles.message}>
                        {"Зажмите кнопку сигнала SOS и удерживайте 3 секунды. Ближайший патрульный приедет на ваш сигнал о помощи."}
                    </p>
                    <button style={styles.button} onClick={() => onConfiramtion()}>
                        Хорошо
                    </button>
                </div>
            </div>}
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '20px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

    },
    message: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#E0E0E0',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#333',
        cursor: 'pointer',
    },
};

export default SOSInfoPopup;
