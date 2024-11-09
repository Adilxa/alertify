"use client"
import Image from 'next/image'
import React from 'react';
import BACKIMG from "../../assets/back.svg";
import { useRouter } from 'next/navigation';

function Header() {

    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <header
            style={{
                backgroundColor: "#1E1E1E",
                width: "100%",
                padding: "10px",
                height: "10vh"
            }}
        >
            <Image onClick={() => handleBack()} src={BACKIMG} alt='' />
        </header>
    )
}

export default Header