import React from 'react';

function LoginPage() {
    const googleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    React.useEffect(() => {
        // URL에서 JWT를 추출하여 localStorage에 저장
        const urlParams = new URLSearchParams(window.location.search);
        const jwt = urlParams.get('jwt');
        if (jwt) {
            localStorage.setItem('jwt', jwt);
            window.location.href = '/home';  // JWT 저장 후 홈 페이지로 리다이렉트
        }
    }, []);

    return (
        <div>
            <h1>Login</h1>
            <button onClick={googleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;