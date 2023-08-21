const express = require('express'); 
const path = require('path');
const tarefaController = require('./controllers/tarefaController'); 
const usuarioController = require('./controllers/usuarioController');
require('dotenv').config();
const app = express(); 
const port = 3000; 
const db = require('./models/db');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

app.use(session({secret: '1i2n3f4o'}));

app.use(expressLayouts);
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

//estudar middleware 
app.use((req, res, next)=>{
    console.log('0')
    if(!req.session.usuarios){
        if(req.originalUrl == "/login" || req.originalUrl == '/autenticar'){
            console.log('1')
            console.log(req.session)
            app.set('layout', './layouts/default/login');
            res.locals.layoutVariables = {
                url: process.env.URL,
                style: '/css/',
                title: 'Login',
                user: req.session.usuarios
            };
            next();
        }
        else{
            console.log('55')
            res.redirect('/login');
        }
    }
    else{
        console.log('233')
        app.set('layout', './layouts/default/index');
        res.locals.layoutVariables = {
            url: process.env.URL,
            style: '/css/',
            title: 'Tarefas',
            user: req.session.usuarios
        };
        next();
    }
});

//rotas
app.get('/', (req, res) => {
    if(req.session.usuarios){
        res.render('home');
    }
    else{
        res.redirect('/login');
    }
});

app.get('/login', (req, res)=>{
    usuarioController.login(req, res);
});
app.post('/login', (req, res)=>{
    console.log(req.body);
    usuarioController.autenticar(req, res);
});

app.get('/tarefas', tarefaController.getTarefas); 
app.post('/tarefa', tarefaController.addTarefa); 
app.delete('/tarefa', tarefaController.deleteTarefa);
app.put('/tarefa', tarefaController.updateTarefa);


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});


