import React, {useState} from 'react';
import {useMenus} from '../hook/useMenus';

function MenuApp() {

    const {menus, addMenu, updateMenu, deleteMenu} = useMenus();

    const [editForm, setEditForm] = useState({id:0, menuName: '', price: 0, stock: 0});

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        addMenu(name, price, stock);
        setName('');
        setPrice(0);
        setStock(0);
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setEditForm({
            ...editForm,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        })
    }

    return (
        <div style={{padding: '20px'}}>
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
                {menus.map((menu : any)=> (
                    <li key={menu.id}>
                        {editingId === menu.id ? (
                            <div>
                                <input
                                    name="menuName"
                                    value={editForm.menuName}
                                    onChange={handleChange}
                                    />
                                <input
                                    name="price"
                                    type="number"
                                    value={editForm.price}
                                    onChange={handleChange}
                                    />
                                <input
                                    name="stock"
                                    type="number"
                                    value={editForm.stock}
                                    onChange={handleChange}
                                    />
                                <button onClick={() => {
                                    updateMenu(editForm.menuName, editForm.price, editForm.stock, menu.id)
                                    setEditingId(null)
                                }}>수정완료</button>
                                <button onClick={() => setEditingId(null)}>취소</button>
                            </div>

                            ) : (
                            <div>
                                <strong>{menu.menuName}</strong> - {menu.price}원 (재고: {menu.stock})
                                <button onClick={() => {setEditingId(menu.id); setEditForm({...menu})}}>수정</button>
                                <button onClick={() => deleteMenu(menu.id)}>삭제</button>
                            </div>
                        )}
                    </li>
                    ))}
            </ul>
        </div>
    )
}

export default MenuApp;