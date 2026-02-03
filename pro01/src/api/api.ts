import client from "./client";

export const api = {

    getMenus: async () => {
        const response = await client.get('/menu');
        return response.data;
    },

    saveMenu: async (menuData: {menuName:string, price:number,stock:number}) => {
        const response = await client.post('/menu', menuData);
        return response.data;
    }
}
