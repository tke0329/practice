import React, {useState} from 'react';
import MenuItem from './MenuItem';

interface MenuListProps {
    menus: any[];
    onUpdate: (id: number, menuName: string, price: number, stock:number) => void;
    onDelete: (id: number) => void;
}

const MenuList = ({menus, onUpdate, onDelete}: MenuListProps) => {

    if(!menus || !Array.isArray(menus)) {
        return <p>메뉴를 불러오는 중이거나 메뉴가 없습니다.</p>;
    }

    return (
        <ul>
            {menus.map((menu) => (
                <MenuItem
                    key={menu.id}
                    menu={menu}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );

};

export default MenuList;