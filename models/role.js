const { Schema, model } = require('mongoose');

const RoleSchema = Schema({

rol: {
    type: String,
    required: [true, 'El Rol Es Obligatorio']
}

});

module.exports = model('Role', RoleSchema); 