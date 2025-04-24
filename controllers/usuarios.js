const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    
    // const {q, nombre = 'no name', apiKey, page = 1, limit } = req.query;
    const {limite = 5, desde = 0} = req.query; 
    const query = {estado: true};
    // const usuarios = await Usuario.find()
    // .skip(Number(desde))
    // .limit((Number(limite)));

    // const total = await Usuario.countDocuments();

    const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
    ]);

    res.json({
        total,
       usuarios
    });
    }

const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id ,password, google, correo, ...resto} = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);       
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto,{ new: true });

    res.json(usuario);
    }

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //const {nombre, edad, cedula} = req.body;

    //verificar si el correo existe

    //encriptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en DB
    await usuario.save();
    res.json({
        usuario
        // nombre, 
        // edad, 
        // cedula
    });
    }

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
    }

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    //Fisicamente lo borramos de la Base de datos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

    res.json(usuario);
    }


    module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
    
    }