import React from 'react';

function Logo() {
    return (
        <div
            style={{
                background: "linear-gradient(135deg, rgba(46, 46, 46, 0) 0%, #000000 100%)", // Use 'background' for gradients
                width: "176px",
                height: "176px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
                fontSize: "35px",
                fontWeight: "bold",
                textAlign: "center"
            }}
        >
            <h5 style={{ margin: 0 }}>  Alertify</h5>
        </div>
    );
}

export default Logo;
