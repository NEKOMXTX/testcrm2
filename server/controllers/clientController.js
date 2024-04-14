const uuid = require('uuid')
const path = require('path');
const {Client, User} = require('../models/models')
const ApiError = require('../error/ApiError');

class ClientController {
    async create(req, res, next) {
        try {
            let {lastName, firstName, surName, birthDate, inn, responsibleId, status} = req.body
            

            const client = await Client.create({lastName, firstName, surName, birthDate, inn, responsibleId, status})
            
            return res.json(client)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res, next) {
        const { responsibleId } = req.body;
        const currentUserId = req.user;

        const filter = responsibleId ? { responsibleId } : { responsibleId: currentUserId.id };


        try {
            const clients = await Client.findAll({
                where: filter,
                order: [
                    ['id', 'ASC'],
                ],
                include: {
                    model: User,
                    attributes: ['lastName', 'firstName', 'surName'],
                    as: 'User' 
                },
                attributes: { exclude: ['responsibleId'] } // Исключаем поле responsibleId из результатов запроса
            });
            return res.json(clients);

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateStatus(req, res, next) {
        const { id } = req.params; 
        const { status } = req.body; 
        try {
            let client = await Client.findByPk(id); 
            if (!client) {
                return next(ApiError.notFound(`Client with id ${id} not found`)); 
            }
            client = await client.update({ status }); 
            return res.json(client); 
        } catch (e) {
            next(ApiError.badRequest(e.message)); 
        }
    }

}

module.exports = new ClientController() 