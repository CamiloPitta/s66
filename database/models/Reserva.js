module.exports = function(sequelize, dataTypes){

    let alias = 'Reserva'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_reserva: {
            type: dataTypes.DATE
        },
        cantidad_personas: {
            type: dataTypes.INTEGER(2)
        },
        horario: {
            type: dataTypes.DATE
        },
        persona_id: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        freezeTableName: true, camelCase: false, timestamps: false
    }

    let Reserva = sequelize.define(alias, cols, config)

    Reserva.associate = function(models){
        Reserva.belongsTo(models.Persona, {
            as: 'reservas',
            foreignKey: 'persona_id'
        })
        Reserva.belongsToMany(models.Actividad, {
            as: 'reservaciones',
            through: 'Detalle_actividad',
            foreignKey: 'reserva_id',
            otherKey: 'actividad_id',
            timestamps: false
        })
    }


    return Reserva

    
}