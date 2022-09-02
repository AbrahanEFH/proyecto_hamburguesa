// Importaciones

const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'qwerty';


const {nuevoUsuario, getUsuarios, setUsuarioStatus, getUsuario} = require("./dt")

app.listen(3000, ()=> {
    console.log('Server ON')
})

//Midlewares 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(
    expressFileUpload({
        limits: 5000000,
        abortOnLimit: true,
        responseOnLimit: 'El tamaño del archivo supera el limite permitido',
    })
);

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: `${__dirname}/views/mainLayout`,
    })
);
app.set('view engine', 'handlebars');

// Rutas
app.get('/', function (req, res) {
    res.render('home');
})

app.get('/registro', function (req, res) {
    res.render('Registro');
})

app.post('/usuarios', async (req, res) => {
    const { email, nombre, password } = req.body;
    try {
        
        const usuario = await nuevoUsuario( email, nombre, password);
        res.status(201).send(usuario);
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal... ${e}`,
            code:500
        })
    };
})

app.put('/usuarios', async (req, res) => {
    const { id, auth } = req.body;
    try {
        const usuario = await setUsuarioStatus( id, auth);
        res.status(200).send(JSON.stringify(usuario));
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal... ${e}`,
            code: 500
        })
    };
});

app.get('/Admin', async (req, res) => {
    try {
       const usuarios = await getUsuarios();
       res.render('Admin', { usuarios }); 
    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal... ${e}`,
            code: 500
        })
    };
});

app.get('/Login', (req, res) =>{
    res.render('Login')
})

app.post('/verify', async (req, res) => {
    const { email, password } = req.body;
    const user = await getUsuario(email, password);
    if (user) {
        if (user.auth) {
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 180,
                    data: user,
                },
                secretKey
            );
            res.send(token);
        } else {
            res.status(401).send({
                error: 'Este usuario aun no ha sido validado para subir Criticas',
                code: 401,
            });
        }
    } else {
        res.status(404).send({
            error: 'Este usuario no esta resgistrado en la base de datos',
            code: 404,
        });
    }
});

app.get('/Criticas', (req, res) => {
    const { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
        const { data } = decoded
        const { nombre, email } = data
        err
            ? res.status(401).send(
                res.send({
                    error: '401 Unauthorized',
                    message: 'Usted no esta autorizado para estar aqui',
                    token_error: err.message,
                })
            )
            : res.render('Criticas', { nombre, email });
    });
});

app.post('/upload', (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No se encontro ningun archivo en la consulta');
    }
    const { files } = req
    const { foto } = files;
    const { name } = foto;
    const { email, nombre } = req.body
    foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
        if (err) return res.status(500).send({
            error: `Algo salio mal... ${err}`,
            code: 500
        })

     res.send('Foto cargada con exito');
    });
});