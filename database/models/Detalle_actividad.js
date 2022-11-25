module.exports = function(sequelize, dataTypes){

    let alias = 'Detalle_acividad'

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reserva_id: {
            type: dataTypes.STRING
        },
        actividad_id: {
            type: dataTypes.STRING
        }
    }

    let config = {
        freezeTableName: true, camelCase: false, timestamps: false
    }

    let Detalle_actividad = sequelize.define(alias, cols, config)



    return Detalle_actividad

    
}