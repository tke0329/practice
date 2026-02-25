import {useState} from 'react';
import client from '../api/client'

interface LoginProps {
    onLogin: () => void;
}

const Login = ({onLogin}: LoginProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await client.post("/user/login", {username, password})


            const meResponse = await client.get("/user/me");

            const userData = meResponse.data;


            console.log("로그인 정보: ", userData);

            // [2] 브라우저에 저장 (나중에 메뉴 등록할 때 쓰기 위함!)


            alert(`${userData.username}님 환영합니다`);

            onLogin();


        } catch (e) {
            console.error("문제가 발생했습니다: ", e);
        }

    }

    return (
        <div className="panel fade-in">
            <h2 className="section-title">로그인</h2>
            <div className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="input"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleLogin}>로그인</button>
            </div>
        </div>

    )

}

export default Login;
