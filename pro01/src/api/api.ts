import client from "./client";

export const api = {

    getMenus: async () => {
        const response = await client.get('/menu');
        return response.data;
    },

    saveMenu: async (menuData: {menuName:string, price:number,stock:number}) => {
        const response = await client.post('/menu', menuData);
        return response.data;
    },

    updateMenu: async (menuData) => {
        const response = await client.put(`/menu/${menuData.id}`, menuData);
        return response.data;
    },

    deleteMenu: async (id) => {
        const response = await client.delete(`/menu/${id}`);
        return response.data;
    }

}
