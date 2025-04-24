const {Router} = require('express');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete
       } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db_validator');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
       check('id', 'No es Un ID Valido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       check('rol').custom(esRoleValido),
       validarCampos
], usuariosPut ); 

router.post('/',[
       check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
       check('password', 'El Password debe tener mas de 5 caracteres').isLength({min: 6}),
       check('correo', 'El Correo no es Valido').isEmail(),
       check('correo').custom(emailExiste),
       // check('rol', 'No es Un Rol Valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
       check('rol').custom(esRoleValido),
       validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
       check('id', 'No es Un ID Valido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       validarCampos
], usuariosDelete);

module.exports = router;