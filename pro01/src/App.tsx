import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import MenuApp from './components/MenuApp';
import MenuDetail from './components/MenuDetail';
import OrderApp from './OrderComponent/OrderApp';
import SignUp from './UserComponent/SignUp';
import Login from './UserComponent/Login';
import Home from './Home';

function App() {

    const [user, setUser] = useState<any | null>(null);

    const url = "http://localhost:8081/api/user/me";

    const refreshUser = async () => {
        try {
            const res = await axios.get(url, {withCredentials: true});
            setUser(res.data)
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <BrowserRouter>
            <nav style={{padding: '10px', borderBottom: '1px solid #ccc'}}>
                <Link style={{marginRight: '10px'}} to="/home">HOME</Link>
                <Link style={{marginRight: '10px'}} to="/order">주문</Link>
                <Link style={{marginRight: '10px'}} to="/list">관리자 메뉴</Link>
                {user ? (
                    <span>{user.username} 님 환영합니다 (권한: {user.role})</span>
                    ) : (
                    <>
                    <Link style={{marginRight: '10px', color: "chocolate"}} to="/login">로그인</Link>
                    <Link style={{color: "#ccc"}} to="/user/sign">회원가입</Link>
                    </>
                )}

            </nav>

            <div style={{padding: '20px'}}>
                <Routes>
                    <Route path="/home" element={<Home onLogout={refreshUser}/>}/>
                    <Route path="/list" element={<MenuApp/>}/>
                    <Route path="/list/menu/:id" element={<MenuDetail/>}/>
                    <Route path="/order" element={<OrderApp/>}/>
                    <Route path="/login" element={<Login onLogin={refreshUser}/>}/>
                    <Route path="/user/sign" element={<SignUp/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;