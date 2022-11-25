module.exports = function (sequelize, Datatypes) {
    let alias = "Actividad";

    let cols = {
        id: {
            type: Datatypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: {
            type: Datatypes.STRING(20)
        },
        tipo_actividad_id: {
            type: Datatypes.INTEGER
        },
    };

    let config = {freezeTableName: true, camelCase: false, timestamps: false};

    const Actividad = sequelize.define(alias, cols, config);

    Actividad.associate = function(models){
        Actividad.belongsTo(models.Tipo_actividad, {
            as: 'tipo',
            foreignKey: 'tipo_actividad_id'
        });
        Actividad.belongsToMany(models.Reserva, {
            as: 'reserva',
            through: 'Detalle_actividad',
            foreignKey: 'actividad_id',
            otherKey: 'reserva_id',
            timestamps: false
        });
        Actividad.belongsToMany(models.Hosteria, {
            as: 'hosteria_act',
            through: 'Hosteria_actividad',
            foreignKey: 'actividad_id',
            otherKey: 'hosteria_id',
            timestamps: false
        });
    }

    return Actividad;
}