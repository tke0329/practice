import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import MenuApp from './components/MenuApp';
import MenuDetail from './components/MenuDetail';
import OrderApp from './OrderComponent/OrderApp';
import SignUp from './UserComponent/SignUp';
import Login from './UserComponent/Login';

const Home = () => <h2>홈페이지에 오신걸 환영맨</h2>;


function App () {
    return (
        <BrowserRouter>
            <nav style={{ padding: '10px', borderBottom: '1px solid #ccc'}}>
                <Link style={{marginRight: '10px'}} to="/home">HOME</Link>
                <Link style={{marginRight: '10px'}} to="/order">주문</Link>
                <Link style={{marginRight: '10px'}} to="/list">관리자 메뉴</Link>
                <Link style={{display:"block", color:"chocolate"}} to="/login">로그인</Link>
                <Link style={{display: 'flex', margin:'30px'}} to="/user/sign">회원가입</Link>
            </nav>

            <div style={{padding: '20px'}}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/list" element={<MenuApp /> }/>
                    <Route path="/list/menu/:id" element={<MenuDetail/>} />
                    <Route path="/order" element={<OrderApp/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user/sign" element={<SignUp/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;