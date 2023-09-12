/*
server.js
terminal: npm init -y (crea el .json)
package.json hacer el node => nodemon
terminal: npm install nodemon -g (instalar nodemon a nivel global) solo una vez se hace.
terminal: npm install express mongoose cors
crear carpeta server => config, controllers, models, routes.
--------------------
terminal 2 npx create-react-app client
happy hacking
terminal 2 cd client
npm install axios react-router-dom

*/






const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.json(), express.urlencoded({extended:true}));

app.use(
    cors({
        //url de react
        origin: "http://localhost:3000"
    })
)

//iniciar la BD
require("./server/config/mongoose.config");

//importar rutas
const misRutas = require("./server/routes/autor.routes");
misRutas(app);
app.listen(8000, () => console.log ("Servidor listo!"));