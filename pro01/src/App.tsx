import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import {useState, useEffect, JSX, useRef} from 'react';
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

    const PrivateRoute = ({user, children}: { user: any; children: JSX.Element }) => {

        const alerted = useRef(false);

        useEffect(() => {
            if (!user && !alerted.current) {
                alerted.current = true;
                alert("로그인이 필요합니다");
            }
        }, [user]);

        if (!user) {
            return <Navigate to="/login"/>;
        }
        return children;
    };

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
            <div className="app-shell">
                <nav className="topbar">
                    <div className="brand">BrewLab</div>
                    <div className="nav-links">
                        <Link to="/home">HOME</Link>
                        <Link to="/order">주문</Link>
                        <Link to="/list">관리자 메뉴</Link>
                    </div>
                    <div className="nav-actions">
                        {user ? (
                            <span className="greeting">{user.username} 님 환영합니다 (권한: {user.role})</span>
                        ) : (
                            <>
                                <Link to="/login">로그인</Link>
                                <Link to="/user/sign">회원가입</Link>
                            </>
                        )}
                    </div>
                </nav>

                <main className="page">
                    <Routes>
                        <Route path="/home" element={<Home onLogout={refreshUser}/>}/>
                        <Route path="/list" element={
                            <PrivateRoute user={user}>
                                <MenuApp/>
                            </PrivateRoute>
                        }/>
                        <Route path="/list/menu/:id" element={
                            <PrivateRoute user={user}>
                                <MenuDetail/>
                            </PrivateRoute>
                        }/>
                        <Route path="/order" element={
                            <PrivateRoute user={user}>
                                <OrderApp/>
                            </PrivateRoute>}/>
                        <Route path="/login" element={<Login onLogin={refreshUser}/>}/>
                        <Route path="/user/sign" element={<SignUp/>}></Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
