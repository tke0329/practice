import {useState, useEffect} from 'react';
import client from './api/client';


interface LogoutProps {
    onLogout: () => void;
}

const Home = ({onLogout}: LogoutProps) => {
    const [loginUser, setLoginUser] = useState(null);


    const savedUser = async () => {
        try {
            const res = await client.get("/user/me");
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
            await client.post("/user/logout");
            setLoginUser(null);
            onLogout();
        } catch (e) {
            console.error("문제가 발생했습니다", e);
        }
    };


    return (
        <div className="panel fade-in">
            {loginUser ? (
                <div className="grid">
                    <div>
                        <h2 className="section-title">{loginUser.username}님 환영합니다!</h2>
                        <div className="badge">권한: {loginUser.role}</div>
                    </div>
                    <button className="btn btn-primary" onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <div className="grid">
                    <h2 className="section-title">로그인이 필요합니다</h2>
                    <p className="subtle">주문과 메뉴 관리를 위해 로그인해주세요.</p>
                    <button className="btn btn-primary" onClick={() => window.location.href = "/login"}>
                        로그인 하러 가기
                    </button>
                </div>
            )}
        </div>
    )

}

export default Home;
