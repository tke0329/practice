import {useState, useEffect} from 'react';
import {api} from '../api/api';

export const useMenus = () => {
    const [menus, setMenus] = useState<any[]>([]);

    const fetchMenus = async () => {
        try {
            const data = await api.getMenus();
            setMenus(data);
        } catch (e) {
            console.error("데이터 불러오기 실패", e);
        }
    }

    const addMenu = async (menuName: string, price: number, stock: number) => {
        try {
            await api.saveMenu({menuName, price, stock})
            fetchMenus();
        } catch (e) {
            console.error("저장에 실패하였습니다.", e);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    return {menus, addMenu};

};