const ExampleDao = require('../dao/ExampleDao');
const db = require('../config/connection');
let exemplo = new ExampleDao(db);

module.exports = {


    async list(req, res){
        exemplo.list();        
        return res.json({'Message' : 'test'});
    },
    
    async show(req, res){
        exemplo.show();
        return res.json({'Message' : 'test'});
    }, 
    
    async create(req, res){ //html
        exemplo.create();
        return res.json({'Message' : 'test'});
    },
    
    async store(req, res){
        exemplo.store();
        return res.json({'Message' : 'test'});
    },
    
    async edit(req, res){ //html
        exemplo.edit();
        return res.json({'Message' : 'test'});
    },
    
    async update(req, res){
        exemplo.update();
        return res.json({'Message' : 'test'});
    },
    
    async destroy(req, res){
        exemplo.destroy();
        return res.json({'Message' : 'test'});
    }
}