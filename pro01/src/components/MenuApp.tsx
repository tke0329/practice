import {useState} from 'react';
import {useMenus} from '../hook/useMenus';
import MenuForm from './MenuForm';
import MenuList from './MenuList';


function MenuApp() {

    const categories = ["All", "Coffee", "Tea", "Drink"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const {menus, addMenu, updateMenu, deleteMenu} = useMenus(selectedCategory);


    return (
        <div className="grid grid-2">
            <section className="panel fade-in">
                <h1 className="section-title">메뉴 입력</h1>
                <MenuForm onAdd={addMenu}/>
            </section>
            <section className="panel fade-in">
                <h2 className="section-title">메뉴 목록</h2>
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
                <MenuList
                    menus={menus}
                    onUpdate={updateMenu}
                    onDelete={deleteMenu}
                />
            </section>
        </div>
    )
}

export default MenuApp;
