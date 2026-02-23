import {useState, useEffect} from 'react';
import {api} from '../api/api';


export const useMenus = (category:string) => {
    const [menus, setMenus] = useState<any[]>([]);

    const fetchMenus = async () => {

        try {
            const url = category === "All" ? "/menu" : `/menu?category=${category}`;
            const data = await api.getMenus(url);
            setMenus(data);
        } catch (e) {
            console.error("데이터 불러오기 실패", e);
        }
    }


    const addMenu = async (menuName: string, price: number, stock: number, category: string) => {
        try {
            await api.saveMenu({menuName, price, stock, category})
            fetchMenus();
        } catch (e) {
            console.error("저장에 실패하였습니다.", e);
        }
    };


    const updateMenu = async (id: number, menuName:string, price: number, stock: number) => {
        try {
            await api.updateMenu({menuName, price, stock ,id})
            fetchMenus();
        } catch (e) {
            console.error("업데이트 실패", e);
        }
    }

    const deleteMenu = async (id: number) => {
        try {
            await api.deleteMenu(id);
            await fetchMenus();
        } catch(e) {
            console.error("삭제 실패", e)
        }
    }

    useEffect(() => {
        fetchMenus();
    }, [category]);

    return {menus, addMenu, updateMenu, deleteMenu};

};