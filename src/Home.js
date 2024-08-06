import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwt']);
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            // JWT를 state에 저장
            setJwt(token);
        } else if (cookies.jwt) {
            // 쿠키에서 JWT를 가져와서 state에 저장
            setJwt(cookies.jwt);
        }
    }, [cookies.jwt]);

    const fetchHello = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/test/hello', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert(response.data);
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                console.error('Error fetching data:', errorData);
                alert(`Error: ${errorData.message} (Code: ${errorData.code})`);
            } else {
                console.error('Error fetching data:', error.message);
                alert('Failed to fetch data');
            }
        }
    };

    const fetchTest = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/test/test', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            alert(JSON.stringify(response.data, null, 2));
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                console.error('Error fetching data:', errorData);
                alert(`Error: ${errorData.message} (Code: ${errorData.code})`);
            } else {
                console.error('Error fetching data:', error.message);
                alert('Failed to fetch data');
            }
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <p>You have been successfully logged in.</p>
            <button onClick={fetchHello}>Fetch Hello</button>
            <button onClick={fetchTest}>Fetch Test</button>
        </div>
    );
};

export default Home;