let Abstract = class Abstract{
    
    constructor(schema){
    this.model = database.createModel(schema)
    }
}


module.exports = Abstract;