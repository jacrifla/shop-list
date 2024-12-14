import { BASE_URL } from "../utils/base";

const API_URL = `${BASE_URL}/shared-list`

export async function checkPermission(listId, userId,) {
    try {
        const response = await fetch(`${API_URL}/${listId}/${userId}`);
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function addPermission(listId, userId) {    
    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listId,
                userId,
                canEdit: true,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function updatePermission(listId, userId, canEdit) {
    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listId,
                userId,
                canEdit,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);        
    }
}