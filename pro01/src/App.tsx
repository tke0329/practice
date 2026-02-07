import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import MenuApp from './components/MenuApp';
import MenuDetail from './components/MenuDetail';

const Home = () => <h2>홈페이지에 오신걸 환영맨</h2>;


function App () {
    return (
        <BrowserRouter>
            <nav style={{ padding: '10px', borderBottom: '1px solid #ccc'}}>
                <Link style={{marginRight: '10px'}} to="/home">HOME</Link>
                <Link style={{marginRight: '10px'}} to="/list">메뉴 목록</Link>
                <Link to="/admin">관리자 메뉴</Link>
            </nav>

            <div style={{padding: '20px'}}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/list" element={<MenuApp /> }/>
                    <Route path="/list/menu/:id" element={<MenuDetail/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;