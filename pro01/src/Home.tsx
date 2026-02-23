import {useState, useEffect} from 'react';
import axios from 'axios';

interface LogoutProps {
    onLogout: () => void;
}

const Home = ({onLogout}: LogoutProps) => {
    const [loginUser, setLoginUser] = useState(null);


    const savedUser = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/user/me", {
                withCredentials: true
            });
            setLoginUser(res.data);
        } catch {
            setLoginUser(null);
        }
    }
    useEffect(() => {
        savedUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8081/logout", null, {
                withCredentials: true
            });
            setLoginUser(null);
            onLogout();
        } catch (e) {
            console.error("문제가 발생했습니다", e);
        }
    };


    return (
        <div>
            {loginUser ? (
                <div>
                    <h3>{loginUser.username}님 환영합니다! (권한: {loginUser.role})</h3>
                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <div>
                    <h2>로그인이 필요합니다</h2>
                    <button onClick={() => window.location.href = "/login"}>로그인 하러 가기</button>
                </div>
            )}
        </div>
    )

}

export default Home;