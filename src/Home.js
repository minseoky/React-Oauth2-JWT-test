import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwt']);
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        // useEffect 훅을 사용하여 쿠키 값을 가져옵니다.
        const jwtToken = cookies.jwt;
        if (jwtToken) {
            setJwt(jwtToken);
        } else {
            console.log("No JWT token found in cookies.");
        }
    }, [cookies]);

    const fetchHello = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/test/hello', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                withCredentials: true
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
            console.log("JWT token in fetchTest: ", jwt);
            const response = await axios.get('http://localhost:8080/api/v1/test/test', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                withCredentials: true
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