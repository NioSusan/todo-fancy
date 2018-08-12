const Todo = require('../models/todo');
const User = require('../models/user');

module.exports = {
    getTodos : (req,res)=>{
        Todo.find()
        .then(todos=>{
            res.status(200).json(todos)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    newTodo : (req,res)=>{
        console.log(req.headers)
        const {name, completed} = req.body;
        Todo.create({name, completed})
        .then(newTodo=>{
            User.findOne({name:req.headers.session})
                .then(user=>{
                    console.log("user===>", user)
                    user.todos.push(newTodo)
                    user.update({
                        $push:{todos:newTodo}
                })})
            res.status(201).json(newTodo)
        })
        .catch(err=>{
            res.status(500).json(err.errors.name.message)
        })
    },

    getTodo : (req,res)=>{
        Todo.findById(req.params.todoId)
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    updateTodo : (req,res)=>{
        Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
        .then(todo=>{
            res.status(200).json(todo)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    deleteTodo : (req,res)=>{
        Todo.remove({_id: req.params.todoId})
        .then(()=>{
            res.status(200).json({msg : "Successfully deleted!"})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}