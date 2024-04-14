import {$authHost} from "./index";
export const changeClientStatus = async (clientId, newStatus) => {
    try {
        const response = await $authHost.put(`/api/client/${clientId}/status`, { status: newStatus });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw new Error("Error changing client status:", error);
    }
}

export const fetchClients = async () => {
    const {data} = await $authHost.get('api/client', )
    return data
}