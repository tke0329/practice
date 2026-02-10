import {useState, useEffect} from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSign = async() => {
        try {
        const response = await axios.post("http://localhost:8081/api/user/sign/manager", {
            username:username,
            password:password

        });
            alert("회원가입에 성공하였습니다.");
        } catch (e) {
            console.error("몬가 잘못됐어: ", e);
        }

    }

    return (
        <div>
            <h2>회원가입 페이지</h2>
            <input
                type="text"
                placeholder="아이디를 입력하세요"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            <input
                type="text"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <button onClick={handleSign}>회원가입</button>
        </div>
    );

};

export default SignUp;