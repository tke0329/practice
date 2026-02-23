import client from "./client";

export const api = {

    getMenus: async (url = "/menu") => {
        const response = await client.get(url);
        return response.data;
    },

    saveMenu: async (menuData: {menuName:string, price:number, stock:number, category:string}) => {
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
    },

    addOrder: async (orderData) => {
        const response = await client.post("/order", orderData);
        return response.data;


    }

}
