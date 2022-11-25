const fs = require('fs');
const path = require('path');


const User = {
    //nombre de la data de usuarios JSON
    fileName: path.join(__dirname, '../database/users.json'),

    //metodo para leer los usuarios como array de objetos y sea mas facil operarlos
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    //genera el nuevo id cuando se crea un nuevo usuario 
    generateId: function () { 
        let allUsers = this.findAll();
        let lastUserId = allUsers.pop();
        if(lastUserId) {
            return lastUserId.id + 1;
        }
        return 1;
    },

    findAll: function () {
		return this.getData();
	},

    //metodo para retornar un usuario por su id
    //pk hace referencia a primary key para las bases de datos

    findUserByPK: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound;
    },

    //metodo para buscar por un campo especifico, devuelve la primera coincidencia
    findUserByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    //metodo para crear un usuario recibe la info de un formulario y lo agrega a la DB
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    // metodo para eliminar un usuario por id como parametro y se elimina tambien de la DB
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);

        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
    }
}

module.exports = User;