import {useState} from 'react';
import {useMenus} from '../hook/useMenus';
import MenuForm from './MenuForm';
import MenuList from './MenuList';


function MenuApp() {

    const categories = ["All", "Coffee", "Tea", "Drink"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const {menus, addMenu, updateMenu, deleteMenu} = useMenus(selectedCategory);


    return (
        <div style={{padding: '20px'}}>
            <h1>메뉴입력</h1>

            {/*입력 폼!!*/}
            <MenuForm onAdd={addMenu}/>
            <h3>메뉴 목록</h3>
            {categories.map((c) => (
                <button key={c} onClick={() => setSelectedCategory(c)}>{c}
                </button>
            ))}

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