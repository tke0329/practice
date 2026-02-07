import React, {useState} from 'react';

interface MenuFormProps {
    onAdd: (name: string, price:number, stock:number) => void;
}

const MenuForm = ({onAdd}: MenuFormProps) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        onAdd(name, price, stock);
        setName("");
        setPrice(0);
        setStock(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="메뉴명을 입력하세요"
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
    )
};

export default MenuForm;