import React from 'react'

function Button({ text, styles, fnc }) {
    return (
        <button style={{
            width: "80%",
            textAlign: "center",
            padding: "16px 0px",
            borderRadius: "32px",
            border: "none",
            ...styles
        }}
            onClick={() => fnc()}
        >
            <h6 style={{
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "19px"
            }}>
                {text}
            </h6>
        </button>
    )
}

export default Button