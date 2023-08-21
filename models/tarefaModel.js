class Tarefa { 
    constructor(id, title, description) { 
    this.id = id; 
    this.title = title; 
    this.description = description; 
    } 

    static listarTarefas() {
        const db = require('./db');
        let tarefas = db.query('SELECT * FROM tarefas');
        return tarefas;
    }

    async salvar() {
        const db = require('./db');
        let res = await db.query(`INSERT INTO tarefas (title) VALUES ('${this.title}')`);
        console.log(res)
    }

    static async deleteTarefa(id){
        const db = require('./db');
        if(await db.query("DELETE FROM tarefas WHERE id = "+id)){
            return true;
        }
        else{
            return false;
        }
    }
} 
    
module.exports = Tarefa;