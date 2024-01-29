const fs = require('fs');
const path = require('path');




const Users = {
    filename:  path.join(__dirname ,'../data/usersDatabase.json' ),
    getData: function() {
        return JSON.parse( fs.readFileSync(this.filename , 'utf-8'))
    },
    findAll : function (){
        return this.getData();
    },
    generateId: function(){
        let allUseres = this.findAll();
        let lastUser = allUseres.pop();
        if (lastUser){
        return lastUser.id + 1;
        }else{
            return 1
        }
    },
    findByPk: function(id){
        let allUseres = this.findAll();
        let userFound = allUseres.find(user =>{ return user.id === id})
        return userFound;
    },
    findByField: function(field , text){
        let allUseres = this.findAll();
        let userFound = allUseres.find(user =>{ return user[field] === text})
        return userFound;
    },
    create : function(userData){
        let allUseres = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUseres.push(newUser);
        fs.writeFileSync(this.filename , JSON.stringify(allUseres , null , ' '))
        return newUser;

    },
    delete : function(id){
        let allUseres = this.findAll();
        let finalUsers = allUseres.filter( user =>{ return user.id !== id});
        fs.writeFileSync(this.filename , JSON.stringify(finalUsers , null , ' '))
        return true;
    }
}



module.exports = Users;