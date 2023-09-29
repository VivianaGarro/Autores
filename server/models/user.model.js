const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const EsquemaUsuario = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Nombre obligatorio."]
    },
    lastName: {
        type: String,
        required: [true, "Apellido obligatorio."]
    },
    email: {
        type: String,
        required: [true, "E-mail obligatorio"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Ingrese email válido"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password obligatorio."],
        minLength: [8, "Password debe tener al menos 8 caracteres"]
    }
}, {timestamps: true, versionKey: false})

//cuando no queremos guardar en base de datos

EsquemaUsuario.virtual('confirmPassword')
    .get( () => this._confirmPassword)
    .set( value => this._confirmPassword = value)

///antes de validar esquema usuario

EsquemaUsuario.pre('validate', function(next){
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contrasenas no coinciden');
    }
    next(); 
})
//antes de guardar encriptamos la contrasena
EsquemaUsuario.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash =>{
        this.password = hash;
        next();
    });
});
const Usuario = mongoose.model("usuarios", EsquemaUsuario);
module.exports = Usuario;

