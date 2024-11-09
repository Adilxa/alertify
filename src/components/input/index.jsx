import React from 'react';

function Input({ title, placeholder, type = "text", setState, value }) {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        }}>
            <h6 style={{
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "normal",
                margin: "0",
                paddingLeft: "12px"
            }}>
                {title}
            </h6>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => setState(e.target.value)}
                style={{
                    width: "100%",
                    padding: "16px 16px",
                    fontSize: "16px",
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "25px",
                    outline: "none",
                    boxSizing: "border-box",
                }}
            />
        </div>
    );
}

export default Input;
