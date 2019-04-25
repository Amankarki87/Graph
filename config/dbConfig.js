const mongoose = require("mongoose")

let DB = function(config){
    let db = mongoose.createConnection(config.host +"/"+ config.database,config.options)
    db.on('error', function(err){
        if(err) throw err;
      });
    db.once('open', function callback () {
        console.info('Mongo db connected successfully');
      });

    let createModel = function(opts){
        let schema = opts.schema
        let model = db.model(opts.name, schema, opts.name);
        return model;
      } 

    return{
        database:db,
        createModel:createModel,
        models:db.models
      }
}

module.exports = DB