import {useEffect, useState} from 'react';
import {useMenus} from '../hook/useMenus'
import {api} from '../api/api';

const OrderApp = () => {
    const {menus} = useMenus();
    const [cart, setCart] = useState([])

    const handleOrder = async () => {
        if(cart.length === 0) {alert("장바구니가 비어있습니다"); return;}

        const orderData = {
            orderItem: cart.map((item) => ({
                menuId: item.id,
                count: item.count
            }))


        };


        try {
            const response = await api.addOrder(orderData);

            console.log("주문 성공 완료!", response);
            alert(`주문이 완료되었습니다! 주문번호:${response.id}`)
            setCart([]);
        } catch(e) {
            console.error("주문 실패", e);
            alert("주문 중 오류가 발생했습니다");
        }
    };


    const addToCart = (menu) => {
        setCart([...cart, {
            id: menu.id,
            menuName: menu.menuName,
            price: menu.price,
            count: 1
        }]);
    };

    return (
        <div style={{display: 'flex', gap: '50px'}}>
            <div>
                <h1>주문 페이지</h1>
                {menus.map((m) => (
                    <div key={m.id}>
                        {m.menuName} | {m.price}원
                        <button onClick={() => addToCart(m)}>담기</button>
                    </div>
                ))}
            </div>


            <div style={{background: '#f9f9f9', padding: '20px', minWidth: '200px'}}>
                <h2>장바구니</h2>
                {cart.length === 0 ? <p>비어있음</p> : (
                    cart.map((item, index) => (
                        <div key={index}>
                            {item.menuName} x {item.count} ({item.price * item.count}원)
                        </div>
                    ))
                )}
                <hr/>
                <strong>총액: {cart.reduce((sum, item) => sum + (item.price * item.count), 0)}원</strong>
                <button
                    onClick={handleOrder}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: "#4CAF50",
                        color: 'white',
                        width: '100%',
                        cursor: 'pointer'
                    }}
                >결제 및 주문하기
                </button>
            </div>
            </div>


    );
}
export default OrderApp;