import {useState} from 'react';
import {useMenus} from '../hook/useMenus'
import {api} from '../api/api';

const OrderApp = () => {

    const categories = ["All", "Coffee", "Tea", "Drink"];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const {menus} = useMenus(selectedCategory);
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
        setCart((prev) => {
            const found = prev.find((item) => item.id === menu.id);
            if(found) {
                return prev.map((item) =>
                    item.id === menu.id ? {...item, count: item.count + 1} : item
                );
            }
            return [
                ...prev,
                {id: menu.id, menuName: menu.menuName, price: menu.price, count: 1 }
            ];
        });
    };

    return (
        <div className="order-wrap">
            <section className="panel fade-in">
                <h1 className="section-title">주문 페이지</h1>
                <div className="pill-group">
                    {categories.map((c) => (
                        <button
                            key={c}
                            className={`pill ${selectedCategory === c ? "active" : ""}`}
                            onClick={() => setSelectedCategory(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <div className="menu-list">
                    {menus.map((m) => (
                        <div className="menu-item" key={m.id}>
                            <div>
                                <strong>{m.menuName}</strong>
                                <div className="subtle">{m.price}원</div>
                            </div>
                            <button className="btn btn-ghost" onClick={() => addToCart(m)}>담기</button>
                        </div>
                    ))}
                </div>
            </section>

            <aside className="cart-panel fade-in">
                <h2 className="section-title">장바구니</h2>
                {cart.length === 0 ? <p className="subtle">비어있음</p> : (
                    cart.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <span>{item.menuName} x {item.count}</span>
                            <span>{item.price * item.count}원</span>
                        </div>
                    ))
                )}
                <hr/>
                <strong>총액: {cart.reduce((sum, item) => sum + (item.price * item.count), 0)}원</strong>
                <button
                    className="btn btn-primary"
                    onClick={handleOrder}
                >
                    결제 및 주문하기
                </button>
            </aside>
        </div>


    );
}
export default OrderApp;
