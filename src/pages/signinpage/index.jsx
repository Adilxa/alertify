"use client";
import { $api } from '@/api/api';
import Button from '@/components/button';
import Input from '@/components/input'
import React, { useState } from 'react';

import { useRouter } from "next/navigation";

function SignIn() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const router = useRouter()


    const phoneNumberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    const data = {
        phoneNumber,
        password: pass,
    };


    const validate = () => {
        const isPassValid = pass.length >= 8;
        const isConfirmPassValid = pass === confirmPass;
        const isPhoneNumberValid = phoneNumberRegex.test(phoneNumber);


        const isFormValid = isPhoneNumberValid && isPassValid && isConfirmPassValid;

        return {
            phoneNumber: isPhoneNumberValid,
            pass: isPassValid,
            confirmPass: isConfirmPassValid,
            isFormValid
        };
    };

    const { phoneNumber: isPhoneNumberValid, pass: isPassValid, confirmPass: isConfirmPassValid, isFormValid } = validate();


    const signin = async () => {
        const res = await $api.post("/users/login", { ...data });

        if (res) {
            localStorage.setItem("id", res?.data.id)
            router.push("home")
        }
    }

    return (
        <div style={{
            backgroundColor: "#1E1E1E",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            height: "90vh"
        }}>
            <h3 style={{
                color: "#fff"
            }}>
                Привет! Войдите
                чтобы начать.
            </h3>

            <div style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "40px"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}>
                    <Input
                        value={phoneNumber}
                        setState={setPhoneNumber}
                        title={"Номер телефона"}
                        placeholder={"+996 (555) 55-55-55"}
                        isValid={isPhoneNumberValid}
                        errorMessage={"Неверный формат телефона"}
                    />
                    <Input
                        value={pass}
                        setState={setPass}
                        title={"Пароль"}
                        placeholder={"*********"}
                        isValid={isPassValid}
                        errorMessage={"Пароль должен быть не менее 8 символов"}
                    />
                    <Input
                        value={confirmPass}
                        setState={setConfirmPass}
                        title={"Подтвердить пароль"}
                        placeholder={"*********"}
                        isValid={isConfirmPassValid}
                        errorMessage={"Пароли не совпадают"}
                    />
                </div>
                <Button
                    text={"Войти"}
                    styles={{
                        width: "100%",
                        backgroundColor: isFormValid ? "#F56868" : "#F8AFAF",
                        color: isFormValid ? "#FFF" : "#7A7A7A"
                    }}
                    fnc={() => (
                        isFormValid && signin()
                    )}
                />
            </div>
        </div>
    );
}

export default SignIn;
