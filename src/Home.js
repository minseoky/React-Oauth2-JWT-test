import React from 'react';
import axios from 'axios';

const Home = () => {
    const fetchHello = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/test/hello', {
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
            const response = await axios.get('http://localhost:8080/api/v1/test/test', {
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