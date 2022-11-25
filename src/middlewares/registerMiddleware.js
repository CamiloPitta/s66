const {body} = require('express-validator');
const path = require('path');

const validacionesRegistro = [
    body('name').notEmpty().withMessage('Debes escribir un nombre'),
    body('email').notEmpty().withMessage('Debes escribir un email').bail()
    .isEmail().withMessage('Debes escribir un email valido'),
    body('password').notEmpty().withMessage('Debes escribir una contraseña'),
    body('username').notEmpty().withMessage('Debes escribir un nombre de usuario'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        if(!file){
            throw new Error ('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
]

module.exports = validacionesRegistro;