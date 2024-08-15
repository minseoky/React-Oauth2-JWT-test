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

    // Presigned URL을 요청하고 이미지를 업로드하는 함수
    const uploadProfileImage = async () => {
        console.log("UPLOADPROFILE");
        if (!profileImage) {
            return null;
        }

        try {
            // Presigned URL 요청
            const response = await axios.get('http://localhost:8080/api/v1/s3/generate-presigned-url/put', {
                params: {
                    fileName: profileImage.name,
                },
                withCredentials: true,
            });

            // 서버에서 반환된 응답 구조 확인
            console.log("Server response:", response);

            // Presigned URL에서 파일 키만 추출 (e.g., '174018575.png')
            const presignedUrl = response.data.presigned_url;
            const url = new URL(presignedUrl);
            const profileS3Key = url.pathname.substring(1);  // 첫 번째 '/' 제거하고 경로만 추출

            console.log("Presigned URL:", presignedUrl);
            console.log("profileS3Key:", profileS3Key);

            if (!presignedUrl) {
                throw new Error('Failed to retrieve presigned URL');
            }

            // S3에 파일 업로드
            await axios.put(presignedUrl, profileImage, {
                headers: {
                    'Content-Type': profileImage.type,
                },
            });

            // 업로드된 파일의 키를 반환
            return profileS3Key;
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload profile image');
            return null;
        }
    };
    // 유저 정보를 패치하는 함수
    const handlePatchUserRequiredInfo = async () => {
        console.log("HANDLEPATCH");
        try {
            const profile_s3_key = await uploadProfileImage();  // 파일 키를 받아옴
            console.log("profile_s3_key: " + profile_s3_key);

            const userInfo = {
                gender,
                birthdate,
                nickname,
                profile_s3_key,  // S3에 업로드된 이미지의 키
            };

            console.log("userInfo before sending: ", JSON.stringify(userInfo));  // JSON 직렬화 후 로그 출력

            const response = await axios.patch('http://localhost:8080/api/v1/user/required', userInfo, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
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