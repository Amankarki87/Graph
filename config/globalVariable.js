let requireAll = require("require-all")
let path = require("path")
let fs = require("fs")

module.exports = function(){

    global.ROOT = path.join(__dirname,"..");
    global.config = require(".");
    global.async = require("async");
    global._ = require("lodash");
    global.log = require("log");
    global.Abstract = require(ROOT +"/generics/abstract");

    // global.models = requireAll({
    //     dirname     :  ROOT + '/models',
    //     filter      :  /(.+)\.js$/,
    //     resolve: function (Model) {
    //         return Model;
    //   }
      
    // });

    fs.readdirSync(ROOT +'/models').forEach(file=>{
      if (file.match(/\.js$/) !== null) {
      let fsFile = file.replace('.js','')
      global[fsFile +  'Schema'] = require(ROOT+'/models/'+file)
      }
    })

    global.controllers = requireAll({
      dirname: ROOT + '/controllers',
      filter      :  /(.+)\.js$/,
       resolve: function (Controller) {
        // if (Controller.name) return new Controller(models[Controller.name]);
        // else 
        return new Controller();
      }
    })

    fs.readdirSync(ROOT+'/controllers').forEach(eachController=>{
      if (eachController.match(/\.js$/) !== null) {
        let fsFile = eachController.replace('.js','')
        global[fsFile +  'BaseControllers'] = require(ROOT+'/controllers/'+eachController)
        } 
    })
}