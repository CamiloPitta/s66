module.exports = function (sequelize, Datatypes) {
    let alias = "Hosteria_actividad";

    let cols = {
        id: {
            type: Datatypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        hosteria_id: {
            type: Datatypes.INTEGER
        },
        actividad_id: {
            type: Datatypes.INTEGER
        },
    };

    let config = {freezeTableName: true, camelCase: false, timestamps: false};

    const Hosteria_actividad = sequelize.define(alias, cols, config);

    return Hosteria_actividad;
}