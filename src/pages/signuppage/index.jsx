"use client";
import Button from '@/components/button';
import Input from '@/components/input'
import React, { useState } from 'react';
import { $api } from '@/api/api';
import { useRouter } from "next/navigation";


function SignUp() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const router = useRouter()


    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    const data = {
        email,
        password: pass,
        phoneNumber,
        name,
    };

    console.log(data);

    const validate = () => {
        const isEmailValid = emailRegex.test(email);
        const isPhoneNumberValid = phoneNumberRegex.test(phoneNumber);
        const isPassValid = pass.length >= 8;
        const isConfirmPassValid = pass === confirmPass;

        const isFormValid = isEmailValid && isPhoneNumberValid && isPassValid && isConfirmPassValid && name.trim() !== "";

        return {
            email: isEmailValid,
            phoneNumber: isPhoneNumberValid,
            pass: isPassValid,
            confirmPass: isConfirmPassValid,
            isFormValid
        };
    };

    const { email: isEmailValid, phoneNumber: isPhoneNumberValid, pass: isPassValid, confirmPass: isConfirmPassValid, isFormValid } = validate();


    // router.push("home")


    const signup = async () => {
        const res = await $api.post("/users/register", { ...data })

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
                Привет! Зарегистрируйся
                чтобы начать.
            </h3>

            <div style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
            }}>
                <Input
                    value={name}
                    setState={setName}
                    title={"Фамилия Имя"}
                    placeholder={"Лебедев Артем"}
                    isValid={name.trim() !== ""}
                    errorMessage={"Поле не может быть пустым"}
                />
                <Input
                    value={phoneNumber}
                    setState={setPhoneNumber}
                    title={"Номер телефона"}
                    placeholder={"+996 (555) 55-55-55"}
                    isValid={isPhoneNumberValid}
                    errorMessage={"Неверный формат телефона"}
                />
                <Input
                    value={email}
                    setState={setEmail}
                    title={"Email"}
                    placeholder={"example@mail.com"}
                    isValid={isEmailValid}
                    errorMessage={"Неверный формат email"}
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
                <Button
                    text={"Зарегистрироваться"}
                    styles={{
                        width: "100%",
                        backgroundColor: isFormValid ? "#F56868" : "#F8AFAF",
                        color: isFormValid ? "#FFF" : "#7A7A7A"
                    }}
                    fnc={() => (
                        isFormValid && signup()
                    )}
                />
            </div>
        </div>
    );
}

export default SignUp;
