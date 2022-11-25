module.exports = function (sequelize, Datatypes) {
    let alias = "Tipo_actividad";

    let cols = {
        id: {
            type: Datatypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        tipo: {
            type: Datatypes.STRING(20)
        },
        valor: {
            type: Datatypes.INTEGER(20)
        },
        cantidad_maxima: {
            type: Datatypes.INTEGER(2)
        },
        imagen: {
            type: Datatypes.STRING(50)
        },
        descripcion: {
            type: Datatypes.STRING(500)
        }
    };

    let config = {freezeTableName: true, camelCase: false, timestamps: false};

    const Tipo_actividad = sequelize.define(alias, cols, config);

    Tipo_actividad.associate = function(models){
        Tipo_actividad.hasMany(models.Actividad, {
            as: 'actividad',
            foreignKey: 'tipo_actividad_id'
        })
        
    }

    return Tipo_actividad;
}