const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const db = require('../../database/models');

const actividadesFilePath = path.join(__dirname, '../database/actividades.json');
const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));


const controller = {

reserva: (req, res) => {
    // const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
    //vista con todas las actividades
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
        // const actividades = JSON.parse(fs.readFileSync(actividadesFilePath, 'utf-8'));
  

        res.render('reserva', {actividades: listaActividades})

        
    })
},

crearReserva: (req,res) => {
    // console.log(req.body)
    // db.Persona.create({
    //     nombre:'p',
        
    
    // })
    // .then(function (){
        db.Reserva.create({
            persona_id:3
        })
    // })
    
//     .then(function(){
//     var idBuscado 
  
//     db.Tipo_actividad.findAll({raw: true}).then( function (respuesta){
//         for (r of respuesta){
//             // console.log('r.tipo' + r.tipo)
//             // console.log('req, body,tipo' + req.body.tipo)
//             if (r.tipo == req.body.tipo){
//                 idBuscado = r.id
//                 // console.log('IF--------' + idBuscado)
//                 // break
//             }
//             // else{
//             //     idBuscado = req.body
//             // }
//             // console.log('FUERA DEL IF' + idBuscado)
//         }
//         return idBuscado
//     }
//     )
//     // console.log('ANTES' + idBuscado)
//     // return idBuscado
// // }
// // )

//     .then( function (idBuscado){
//     console.log('id buscado----------------------' + idBuscado)
//     db.Actividad.create({

//         // nombre: 'test2',
//         // tipo_actividad_id: 4
//         nombre: req.body.nombre,
        
//         tipo_actividad_id: idBuscado
//         // db.Tipo_actividad.findAll({
//         //     where: {
//         //         tipo: 'Temporada'
//         //     }
//         // }).then( function (respuesta){
//         //     console.log(respuesta)
//         // })



//     })
//     .then(function(){
//         res.redirect('/actividades') //////
//     })
    
    
// })
// })
},
    
update: (req, res) => {
    console.log(req.body)
	// res.render('form-actualizar-actividad')
    // db.Reserva.create({
    //     fecha_reserva: 'p_update',
    //     cantidad_personas: 4,
    //     horario: 4,
    //     persona_id: 4
    // },
    // {
    //     where:{
    //         id: 1
    //     }

    // })
//     db.Tipo_actividad.update({

//         tipo: req.body.tipo,
//         valor: req.body.valor,
//         cantidad_maxima: req.body.participantes,
//         imagen: 'imagen',
//         descripcion: req.body.descripcion
        
//     })

//     .then(function(){
//     var idBuscado 
  
//     db.Tipo_actividad.findAll({raw: true}).then( function (respuesta){
//         for (r of respuesta){

//             if (r.tipo == req.body.tipo){
//                 idBuscado = r.id

//             }
//         }
//         return idBuscado
//     }
//     )


//     .then( function (idBuscado){
//     console.log('id buscado----------------------' + idBuscado)
//     db.Actividad.create({

//         nombre: req.body.nombre,
        
//         tipo_actividad_id: idBuscado

//     })
//     .then(function(){
//         res.redirect('/actividades') //////
//     })
    
    
// })
// })
}

}
module.exports = controller;
