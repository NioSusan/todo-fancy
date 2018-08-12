const User = require('../models/user');
const jwt = require('jsonwebtoken');
const filterBody = require('../helpers/updateAuth');
const axios = require('axios');

module.exports = {
    login : (req, res) =>{
        console.log("req.body => ", req.body)
        let authResponse = req.body
        let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`
        
        axios.get(url_user_info)
            .then(userFb =>{
                console.log("user's data :", userFb.data)
                User.find({email : userFb.data.email})
                    .then(user=>{
                      if(user.length>0){
                        console.log(`${user.name} is found in DB!`)
                        console.log('user ', user[0])
                        req.session.current_user = user[0].name;
                        console.log('logging in ', req.session.current_user)
                        let token = jwt.sign({id : user[0]._id, role : user[0].role},  process.env.SECRET_KEY)
                        res.status(200).json({
                            msg : `${user[0].name} has successfully logged in!`,
                            token,
                            current_user : req.session.current_user
                        })
                      } else {
                        console.log("user is not in DB! Register him/her to the DB!")
                        console.log(userFb.data)
                        User.create({
                            fbId : userFb.data.id,
                            name : userFb.data.name, 
                            email: userFb.data.email
                        })
                            .then(newUser=>{
                                console.log("Successfully adding a new user =>", newUser)
                                req.session.current_user = newUser.name;
                                let token = jwt.sign({id : newUser._id, role : newUser.role},  process.env.SECRET_KEY)
                                res.status(201).json({
                                    msg: `${newUser.name} is successfully registered and logged in`, 
                                    token,
                                    current_user : req.session.current_user
                                })
                            })
                            .catch(err=>{
                                console.log(err)
                                res.status(500).json(err)
                            })
                      }
                    })
                    .catch(err=>{
                        res.status(500).json(err)
                    })
            })
    },

    logout: (req, res) => {
        console.log('logging out ', req.session.current_user)
        const current_user = req.session.current_user;
        req.session.current_user = null;
        res.status(200).json({msg:`${current_user} has successfully logged out!`})
    },

    getUsers : (req, res) =>{
        User.find()
        .populate("todos")
        .then(users => {
            res.status(200).json({
                msg: "Success!", 
                users,
                current_user : req.session.current_user
            });
        })
        .catch(err => {
            res.status(500).json({msg:err});
        })
    },

    newUser : (req, res) =>{
        const {fbId, name, email} = req.body;
        User.create({fbId, name, email})
        .then(newUser=>{
            res.status(201).json({
                msg: `${newUser.name} is successfully registered`, 
                newUser,
                current_user : req.session.current_user
            })
        })
        .catch(err=>{
            res.status(500).json(err.errors)
        })
    },

    getUser : (req, res) =>{
        // User.findById(req.params.userId)
        User.findOne({_id: req.params.userId})
        .then(user=>{
            res.status(200).json({
                msg: `${user.name} is found!`, 
                user,
                current_user : req.session.current_user
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }, 

    updateUser : (req, res) => {
        let allowedData = filterBody(req.body, ['name', 'email'])
        User.findOneAndUpdate({_id: req.params.userId}, allowedData, {new: true})
        .then(updatedUser=>{
            res.status(200).json({
                msg: `${updatedUser.name} data has been updated!`,
                updatedUser,
                current_user : req.session.current_user
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }, 

    updateUserRole : (req , res) =>{
        User.findOneAndUpdate({_id: req.params.userId}, {role: req.body.role}, {new: true})
        .then(updatedUser=>{
            res.status(200).json({
                msg: `${updatedUser.name}'s role is updated!`,
                updatedUser,
                current_user : req.session.current_user
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    },

    deleteUser : (req, res) =>{
        User.remove({_id: req.params.userId})
        .then(()=>{
            res.status(200).json({
                msg : "Successfully deleted!",
                current_user : req.session.current_user
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}