module.exports = function (sequelize, Datatypes) {
    let alias = "Hosteria";

    let cols = {
        id: {
            type: Datatypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        nombre: {
            type: Datatypes.STRING(20)
        },
        direccion: {
            type: Datatypes.STRING(20)
        },
        email: {
            type: Datatypes.STRING(50)
        },
        telefono: {
            type: Datatypes.STRING(10)
        }
    };

    let config = {freezeTableName: true, camelCase: false, timestamps: false};

    const Hosteria = sequelize.define(alias, cols, config);

    Hosteria.associate = function(models){
        Hosteria.belongsToMany(models.Actividad, {
            as: 'hosteria',
            through: 'Hosteria_actividad',
            foreignKey: 'hosteria_id',
            otherKey: 'actividad_id',
            timestamps: false
        })
    }

    return Hosteria;
}