module.exports = function(sequelize, dataTypes){

    let alias = 'Persona'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(50)
        },
        email: {
            type: dataTypes.STRING(50)
        },
        password: {
            type: dataTypes.STRING(100)
        },
        username: {
            type: dataTypes.STRING(50)
        }
    }

    let config = {
        freezeTableName: true, camelCase: false, timestamps: false
    }

    let Persona = sequelize.define(alias, cols, config)

    Persona.associate = function(models){
        Persona.hasMany(models.Reserva, {
            as: 'reservas',
            foreignKey: 'persona_id'
        })
    }

    return Persona

    
}