const express = require(`express`);
const path = require(`path`);

require("./database/models");

const app = express();
const helmet = require(`helmet`);
const compression = require(`compression`);
const rateLimit = require(`express-rate-limit`);
const cookieSession = require(`cookie-session`)
const usuarioRouter = require(`./routes/usuario-route`);
const productoRouter = require(`./routes/producto-route`);
const categoriaRouter= require(`./routes/categoria-route`);
const cuponRouter = require(`./routes/cupon-route`);


//config
app.use(express.json());
app.use(helmet());
app.use(compression());


//rutas

app.use(
    cookieSession({
        nombre: "aunth-session",
        keys: [process.env.COOKIE_SECRET],
        httpOnly: true
    })
)

const limiter = rateLimit({windowMs: 60_000, max:100});

app.use(express.static(path.join(__dirname, './public')));
app.use(`/api/`, limiter);
app.use(`/api/usuarios`, usuarioRouter);
app.use(`/api/productos`, productoRouter);
app.use(`/api/categorias`, categoriaRouter);
app.use(`/api/cupones`, cuponRouter);




module.exports = app;