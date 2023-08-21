let usuarios = [];
const UsuarioModel = require('../models/usuarioModel');

function login(req, res){
    res.render('login');
}

async function autenticar(req, res){
    if(req.body.email == "" || req.body.senha == ""){
        console.log('erro');
    }
    else{
        console.log('entrou');
        let resp = await UsuarioModel.autenticar(req.body.email, req.body.senha);
        if(resp.length > 0){
            console.log(req.session);
            console.log(resp);
            req.session.usuarios = {
                idusuarios: resp[0].idusuarios,
                nome: resp[0].nome,
                email: resp[0].email
            };
        
            res.redirect('/tarefas');
        }
        else{
            console.log('erro2');
            res.redirect('/login');
        }
    }
    //res.redirect('./login');
    //res.render('login');
}
async function logout(req, res){
    delete req.session.usuarios;
    res.redirect('/');
}

module.exports = {login, autenticar, logout};