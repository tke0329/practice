import React, {useState} from 'react';
import {useMenus} from '../hook/useMenus';

function MenuApp() {
    const {menus, addMenu} = useMenus();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMenu(name, price, stock);
        setName('');
        setPrice(0);
        setStock(0);
    };

    return (
        <div style={{ padding: '20px'}}>
            <h1>메뉴판</h1>

            {/*입력 폼!!*/}
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="메뉴명을 입력하세용"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    />
                <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    />
                <button type="submit">메뉴 추가</button>
            </form>

            {/*리스트 출력!!*/}
            <ul>
                {menus.map((menu:any) => (
                    <li key={menu.id}>
                        <strong>{menu.menuName}</strong> - {menu.price} (재고: {menu.stock})
                    </li>
                ))}
            </ul>


        </div>
    )
}
export default MenuApp;