var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

var cons = require('consolidate');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//- Rutas

var routes = require('./http/routes');

var imagenes = require('./http/rutas/Imagen');
var usuario = require('./http/rutas/Usuario');
var Boleto = require('./http/rutas/Boleto');
var Carrera = require('./http/rutas/Carrera');
var Estado = require('./http/rutas/Estado');
var Municipio = require('./http/rutas/Municipio');
var Orden = require('./http/rutas/Orden');
var Patrocinador = require('./http/rutas/Patrocinador');
var PuntoVenta = require('./http/rutas/PuntoVenta');
var Cupon = require('./http/rutas/Cupon');
var Ruta = require('./http/rutas/Ruta');
var Auth = require('./http/rutas/Autentificacion');
var impreso = require('./http/rutas/Impreso')


// - Conexion a la base de datos

var con = require('./http/conexion');
//require('./conf/auth')(app);

// - Middlewares

var lessMiddleware = require('less-middleware')

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/aplicacion/dist/'));
app.set("view engine", "html");

/* app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade"); */


app.use(favicon(path.join(__dirname, '/aplicacion/dist/', 'favicon.ico')))
/* app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico'))) */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(flash());

app.use(session({secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }});

app.use('/', routes);

app.use('/', imagenes);
app.use('/', usuario);

app.use('/', Boleto);
app.use('/', Carrera);
app.use('/', Estado);
app.use('/', Municipio);
app.use('/', Orden);
app.use('/', Patrocinador);
app.use('/', PuntoVenta);
app.use('/', Cupon);
app.use('/', Ruta);
app.use('/', Auth);
app.use('/', impreso);

app.use(lessMiddleware(__dirname + '/aplicacion/dist/'));

app.use(express.static(path.join(__dirname, 'aplicacion/dist/')));

/* app.use(lessMiddleware(__dirname + '/assets'));
app.use(lessMiddleware(__dirname + '/assets/frags'));

app.use(express.static(path.join(__dirname, 'assets'))); */
app.use(express.static(path.join(__dirname, 'http')));

module.exports = app;
