import React, {useState} from 'react';
import MenuItem from './MenuItem';

interface MenuListProps {
    menus: any[];
    onUpdate: (id: number, menuName: string, price: number, stock:number) => void;
    onDelete: (id: number) => void;
}

const MenuList = ({menus, onUpdate, onDelete}: MenuListProps) => {

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