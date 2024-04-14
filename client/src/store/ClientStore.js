import {makeAutoObservable} from "mobx";
import { changeClientStatus } from "../http/clientAPI";

export default class ClientStore {
    constructor() {
        this._clients = []
        
        makeAutoObservable(this)
    }

    setClients(clients) {
        this._clients = clients
    }

    get clients() {
        return this._clients
    }

    async changeClientStatus(clientId, newStatus) {
        try {
            await changeClientStatus(clientId, newStatus);
            // Обновить статус клиента в хранилище
            const updatedClients = this._clients.map(client => {
                if (client.id === clientId) {
                    return { ...client, status: newStatus };
                }
                return client;
            });
            this.setClients(updatedClients);
        } catch (error) {
            console.error(error);
            // Обработка ошибок при изменении статуса клиента
        }
    }

}