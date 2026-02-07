import React, {useState} from 'react';
import {useMenus} from '../hook/useMenus';
import MenuForm from './MenuForm';
import MenuList from './MenuList';


function MenuApp() {

    const {menus, addMenu, updateMenu, deleteMenu} = useMenus();




    return (
        <div style={{padding: '20px'}}>
            <h1>메뉴판</h1>

            {/*입력 폼!!*/}
            <MenuForm onAdd={addMenu}/>

            {/*리스트 출력!!*/}
            <MenuList
                menus={menus}
                onUpdate={updateMenu}
                onDelete={deleteMenu}
            />
        </div>
    )
}

export default MenuApp;