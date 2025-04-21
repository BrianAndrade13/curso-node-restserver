const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    
    const {q, nombre = 'no name', apiKey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q, 
        nombre,
        apiKey,
        page, 
        limit
    });
    }

const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
    }

const usuariosPost = (req, res) => {

    const body = req.body;
    //const {nombre, edad, cedula} = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        body
        // nombre, 
        // edad, 
        // cedula
    });
    }

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
    }

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
    }


    module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
    
    }