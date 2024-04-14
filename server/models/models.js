const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lastName: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    surName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Client = sequelize.define('Client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lastName: { type: DataTypes.STRING },
    firstName: { type: DataTypes.STRING },
    surName: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATE, allowNull: false },
    inn: { type: DataTypes.STRING, allowNull: false, unique: true },
    responsibleId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING, defaultValue: "Не в работе" },
});

// Далее описание взаимоотношений  

User.hasMany(Client, { foreignKey: 'responsibleId' }); // каждый клиент принадлежит пользователю через поле responsibleId
Client.belongsTo(User, { foreignKey: 'responsibleId' }); // каждый клиент принадлежит только одному пользователю





module.exports = {
    User,
    Client
}