import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [nickname, setNickname] = useState('');
    const [profileImage, setProfileImage] = useState(null);

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

    const fetchAdditionalInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/additional-info-check', {
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

    const handlePatchUserRequiredInfo = async () => {
        const formData = new FormData();

        // JSON 데이터를 문자열로 변환 후 추가
        const userInfoJson = JSON.stringify({
            gender,
            birthdate,
            nickname
        });
        formData.append('userInfo', new Blob([userInfoJson], { type: 'application/json' }));

        // 파일 추가
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await axios.patch('http://localhost:8080/api/v1/user/required', formData, {
                withCredentials: true,
            });
            alert(`Success: ${response.data.message} (Code: ${response.data.code})`);
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                console.error('Error patching user info:', errorData);
                alert(`Error: ${errorData.message} (Code: ${errorData.code})`);
            } else {
                console.error('Error patching user info:', error.message);
                alert('Failed to patch user info');
            }
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <p>You have been successfully logged in.</p>
            <button onClick={fetchHello}>Fetch Hello</button>
            <button onClick={fetchTest}>Fetch Test</button>
            <button onClick={fetchAdditionalInfo}>AdditionalInfo</button>

            <h2>Patch User Required Info</h2>
            <div>
                <label>
                    Gender:
                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Birthdate:
                    <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Nickname:
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Profile Image:
                    <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
                </label>
            </div>
            <button onClick={handlePatchUserRequiredInfo}>Patch User Info</button>
        </div>
    );
};

export default Home;