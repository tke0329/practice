import {useState} from 'react';
import client from '../api/client';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await client.post("/user/login", {
                username:username,
                password:password
            });

            const userData = response.data;
            console.log("로그인 정보: " + userData);

            // [2] 브라우저에 저장 (나중에 메뉴 등록할 때 쓰기 위함!)
            localStorage.setItem("user", JSON.stringify(userData));

            alert(`${userData.username}님 환영합니다`);

        } catch (e) {
            console.error("문제가 발생했습니다: ", e);
        }

    }

    return (
        <div>
            <h2>로그인 페이지</h2>
            <input
                type="text"
                placeholder="아이디를 입력하세요"
                onChange={(e) => setUsername(e.target.value)}
                />
            <input
                type="text"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
        </div>

    )

}

export default Login;