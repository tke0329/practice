import {useEffect, useState} from 'react';
import client from '../api/client';
import { useParams } from 'react-router-dom';

const MenuDetail = () => {
    const {id} = useParams();

    const [menu, setMenu] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const res = await client.get(`/menu/${id}`);
                console.log("받아온 데이터: " + res.data);
                setMenu(res.data);
            } catch (err) {
                console.error("에발", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id])



    if(loading) return <div className="panel fade-in">로딩중...</div>

    if(!menu) return <div className="panel fade-in">메뉴 정보가 없습니당</div>


    return (
        <div className="panel fade-in">
            <h2 className="section-title">메뉴 상세 정보</h2>
            <div className="grid">
                <p><strong>메뉴명:</strong> {menu.menuName}</p>
                <p><strong>가격:</strong> {menu.price}원</p>
                <p><strong>재고:</strong> {menu.stock}개</p>
            </div>
            <button className="btn btn-ghost" onClick={() => window.history.back()}>뒤로가기</button>
        </div>
    );
};

export default MenuDetail;
