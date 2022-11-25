const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//Middlewares
const uploadFile = require('../middlewares/multerUsersMiddlewares');
const validacionesRegistro = require('../middlewares/registerMiddleware');
const guestMiddlewares = require('../middlewares/guestMiddlewares');
const authMiddlewares = require('../middlewares/authMiddlewares');


router.get("/", controller.home)
// router.get('/:actividad', controller.actividad);
router.get('/act/:actividad', controller.actividad);

router.get("/register", guestMiddlewares, controller.register );
router.post("/register", uploadFile.single('imgPrincipal'), validacionesRegistro, controller.registerProcess );

router.get("/login", guestMiddlewares,  controller.login);
router.post("/login", controller.loginProcess);

router.get("/profile", authMiddlewares, controller.profile);

router.get("/logout", authMiddlewares, controller.logout);

module.exports = router;