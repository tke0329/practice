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
        <div className="panel fade-in">
            <h2 className="section-title">회원가입</h2>
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
                <button className="btn btn-primary" onClick={handleSign}>회원가입</button>
            </div>
        </div>
    );

};

export default SignUp;
