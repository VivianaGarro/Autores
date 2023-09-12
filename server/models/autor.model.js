const mongoose = require("mongoose");

const EsquemaAutor = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre Obligatorio"],
        minLength: [3, " Nombre debe tener al menos tres caracteres"]
    },
    imagen: {
        type: String
    },
    libros: {
        type: Boolean,
        default: false
    },
    cuentos: {
        type: Boolean,
        default: false
    },
    articulos: {
        type: Boolean,
        default: false
    }
}, {timestamps: true, versionKey: false });

const Autor = mongoose.model("autores", EsquemaAutor);
module.exports = Autor;
