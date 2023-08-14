const express = require('express'); 
const tarefaController = require('./controllers/tarefaController'); 
const usuarioController = require('./controllers/usuarioController');
const app = express(); 
const port = 3000; 
const db = require('./models/db');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

app.use(session({secret: '1i2n3f4o'}));

app.use(expressLayouts);
app.set('layout', './layouts/default/index');
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));


//rotas
app.get('/', (req, res) => {
    if(!req.session.usuarios){
        res.redirect('/');
    }
    else{
        res.send("<h1>Tarefas</h1>");
    }
});

app.get('/login', (req, res)=>{
    app.set('layout', './layouts/default/login');
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


