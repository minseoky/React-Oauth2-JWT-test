import React from 'react';

function LoginPage() {
    const googleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={googleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;