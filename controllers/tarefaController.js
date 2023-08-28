const Tarefa = require('../models/tarefaModel'); 
let tarefas = [];

async function getTarefas(req, res) { 
    tarefas = await Tarefa.listarTarefas();
    res.render('tarefas', { tarefas }); 
} 

function addTarefa(req, res) { 
    const { title } = req.body; 

    const tarefa = new Tarefa(null, title, null); 
    tarefa.salvar();
    tarefas.push(tarefa); 
    res.redirect('/tarefas'); 
} 

async function deleteTarefa(req, res) { 
    if(await Tarefa.deleteTarefa(req.params.id)){
        req.session.msg = "Tarefa excluída com sucesso";
        res.redirect('/tarefas');
    }
    else{
        req.session.msg = "a exclusão falhou"
        res.redirect('/tarefas');
    }
}

function updateTarefa(req, res) {
    const { id, title, description } = req.body;
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id == id) {
            tarefa.title = title;
            tarefa.description = description;
        }
        return tarefa;
    });
    res.redirect('/tarefas');
}


module.exports = { getTarefas, addTarefa, deleteTarefa, updateTarefa};
