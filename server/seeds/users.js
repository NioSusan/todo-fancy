const User = require('../models/user');

function addInitialUsers(req,res){
    User.insertMany( [
        { fbId: "1", name: "Susan", email:"susan@mail.com", role: "admin"},
        { fbId: "2", name: "Nio", email:"nio@mail.com" },
        { fbId: "3", name: "Rey", email:"rey@mail.com" },
        { fbId: "4", name: "Sa", email:"sa@mail.com" },
        { fbId: "5", name: "James", email:"james@mail.com"},
     ] )
     .then(newUsers=>{
         res.status(201).json({
             msg : "successfully adding new users",
             newUsers
         })
     })
     .catch(err=>{
         res.status(500).json({msg:err.message})
     })
}

module.exports = addInitialUsers;