"use client"
import React, { useEffect } from "react";
import BG from "../../assets/bg.svg";
import Logo from "@/components/logo";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

function Enter() {

    const router = useRouter()

    useEffect(() => {
        const res = localStorage.getItem("id");
        if (res) {
            router.push("home")
        }
    }, [router])

    return (
        <div
            style={{
                backgroundColor: "#1E1E1E",
                backgroundImage: `url(${BG.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
                height: "100dvh",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: "15px"
                }}
            >
                <div style={{ marginBottom: "20px" }}>
                    <Logo />

                </div>
                <Button fnc={() => router.push("/signin")} text="Войти" styles={{ backgroundColor: "#fff", color: "#222222" }} />
                <Button fnc={() => router.push("/signup")} text="Зарегистрироваться" styles={{ backgroundColor: "#222222", color: "#fff", border: "1px solid #fff" }} />
            </div>
        </div>
    );
}

export default Enter;
