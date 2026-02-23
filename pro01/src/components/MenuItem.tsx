import React, {useState} from 'react';
import {Link} from 'react-router-dom';
interface MenuItemProps {
    menu: any;
    onUpdate: (id:number, menuName:string, price:number, stock:number) => void;
    onDelete: (id:number) => void;
}

const MenuItem = ({menu, onUpdate, onDelete}: MenuItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const [editForm, setEditForm] = useState({...menu});

    const handleUpdate = () => {
        onUpdate(menu.id, editForm.menuName, editForm.price, editForm.stock);
        setIsEditing(false)
    };

    return (
        <li className="menu-item">
            {isEditing ? (
                <div className="grid">
                    <div className="input-row">
                        <input
                            className="input"
                            value={editForm.menuName}
                            onChange={(e) => setEditForm({...editForm, menuName: e.target.value})}
                        />
                        <input
                            className="input"
                            value={editForm.price}
                            onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})}
                        />
                        <input
                            className="input"
                            value={editForm.stock}
                            onChange={(e) => setEditForm({...editForm, stock: Number(e.target.value)})}
                        />
                    </div>
                    <div className="menu-actions">
                        <button className="btn btn-primary" onClick={handleUpdate}>저장</button>
                        <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>취소</button>
                    </div>
                </div>
            ) : (
                <>
                    <Link to={`menu/${menu.id}`}>
                        <strong>{menu.menuName}</strong>
                    </Link>
                    <div className="menu-actions">
                        <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>수정</button>
                        <button className="btn btn-muted" onClick={() => onDelete(menu.id)}>삭제</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default MenuItem
