const Todo = require('../models/todo');

function addInitialTodos(req,res){
    Todo.insertMany( [
        { name: 'Learning vue', completed: false },
        { name: 'Learning react', completed: false},
        { name: 'Creating a fancy app ', completed: false},
        { name: 'Completing portfolio', completed: false},
        { name: 'Sleep', completed: false},
     ] )
     .then(newTodos=>{
         res.status(201).json({
             msg : "successfully adding new todos",
             newTodos
         })
     })
     .catch(err=>{
         res.status(500).json({msg:err.message})
     })
}

module.exports = addInitialTodos;