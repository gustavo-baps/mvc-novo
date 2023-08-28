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
        const resp = await db.query("DELETE FROM tarefas WHERE id = "+id);
        if(resp){
            console.log(resp);
            if(resp.affectedRows > 0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
} 
    
module.exports = Tarefa;