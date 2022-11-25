const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require('../../database/models');

const controller = {

activities: (req, res) => {
    db.Actividad.findAll({include:[{association:'tipo'}]})
    .then((actividades)=>{
        let listaActividades = [];

        for(a of actividades){
            listaActividades.push( {
                nombre: a.nombre,
                participantes: a.tipo.cantidad_maxima,
                valor: a.tipo.valor,
                imagen:a.tipo.imagen,
                descripcion: a.tipo.descripcion
  
            });
        }

        res.render('activities', {actividades: listaActividades})
    })
},

detalle: (req, res) => {
    //vista con detalle actividad
    let nombreActividad = req.params.nombre;

    db.Actividad.findAll({include:[{association:'tipo'}]})
    .then((actividades)=>{
        
        let detalleActividad = null;

        for(a of actividades){
            if (a.nombre==nombreActividad){
                detalleActividad=a
                break;
            }
        }
   

    if (detalleActividad){ 

        res.render('detalle', {actividad: detalleActividad})
    }else{
        res.send('Actividad no encontrada.');
    }
})
},

//crear actividad

create: (req, res) => {
    res.render('form-crear-actividad')
    // db.Tipo_actividad.findAll({raw: true}).then( function (respuesta){
    //     for (r of respuesta){
    //         console.log(r.tipo)
    //     }
    // })
    
 

},
store: (req, res) => {
    console.log('El tipo es------' + req.body.categoria)
    db.Tipo_actividad.create({
 
        tipo: req.body.categoria,
        valor: req.body.valor,
        cantidad_maxima: req.body.participantes,
        imagen: req.file.filename,
        descripcion: req.body.descripcion
        
    })
    
    .then(function(){
    var idBuscado 
  
    db.Tipo_actividad.findAll({raw: true}).then( function (respuesta){

        for (r of respuesta){

            if (r.tipo == req.body.categoria){
                idBuscado = r.id
                // break
            }
        
        }
        return idBuscado
    }
    )


    .then( function (idBuscado){

    db.Actividad.create({

        nombre: req.body.nombre,
        
        tipo_actividad_id: idBuscado
    })
    .then(function(){
        res.redirect('/actividades') //////
    })
    
    
})
})
},

update: (req, res) => {
    let nombreActividad = req.params.nombre;

    db.Actividad.findAll({include:[{association: 'tipo'}]})
    .then((respuesta)=>{
        let todasLasActividades = respuesta

        let actividadParticular = {}

        for (h of todasLasActividades){
         
            if (nombreActividad == h.nombre){
  
                actividadParticular.nombre = h.nombre
                actividadParticular.id = h.id
                actividadParticular.tipo_actividad_id = h.tipo_actividad_id
                actividadParticular.tipo = h.tipo.tipo
                actividadParticular.valor = h.tipo.valor
                actividadParticular.participantes = h.tipo.cantidad_maxima
                actividadParticular.descripcion = h.tipo.descripcion
            }
        }


    res.render('form-actualizar-actividad', {actividades: actividadParticular})
}

)

},

 actualizar: (req, res) =>{
    // Saber cuál es el tipo_actividad_id de la actividad que se quiere editar
    var idUpdate = req.params.id
    var idTipoActividad
    
    db.Actividad.findByPk(idUpdate)
        .then(function(respuesta){
           
            idTipoActividad = respuesta.tipo_actividad_id
            return idTipoActividad
        })

    //    
    .then(function(idTipoActividad){
    
    db.Actividad.update({
        
        nombre: req.body.nombre,
        // tipo_actividad_id: 2

    },
    {
        where:{
            id: req.params.id
        }
    })
    db.Tipo_actividad.update({
        // tipo: 'tipo_update',
        tipo: req.body.categoria,
        valor: req.body.precio,
        cantidad_maxima: req.body.participantes,
        imagen: req.file.filename,
        descripcion: req.body.descripcion
    },
    {
        where:{
           
            id: idTipoActividad

        }
    })
    .then(function(){
    res.redirect('/actividades')
    })
})

},

//op
delete: (req, res) =>{
    
    db.Actividad.destroy({
        where: {
            nombre: req.params.nombre//ooeell
        }
    })
    .then(function(){

        res.redirect('/actividades')
    })
}
};


module.exports = controller;
