"use client";

import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import SOSInfoPopup from '@/components/sosinfo';
import { $api } from '@/api/api';
import SOSButton from '@/components/sosBtn';

export const getMe = async () => {
    const id = localStorage.getItem("id")
    const res = await $api.get(`users/me/${id}`)
    return res;
}

function Home() {

    const router = useRouter();
    const user = getMe();


    useEffect(() => {
        const res = localStorage.getItem("id");
        if (!res) {
            router.push("/signin")
        }
    }, []);


    return (
        <>
            <div style={{
                height: "100dvh",
                backgroundColor: "#1E1E1E",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div></div>
                <SOSButton />
                <div></div>
            </div>
            {
                user?.isConfirmed &&
                <SOSInfoPopup />
            }
        </>
    )
}

export default Home