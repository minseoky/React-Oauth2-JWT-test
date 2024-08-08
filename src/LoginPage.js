import React from 'react';

function LoginPage() {
    const googleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const kakaoLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={googleLogin}>Login with Google</button>
            <button onClick={kakaoLogin}>Login with Kakao</button>
        </div>
    );
}

export default LoginPage;