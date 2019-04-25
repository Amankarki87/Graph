module.exports = class Login extends Abstract{
    constructor(){
        super(drilldownSchema)
    }

    async create(req){
        return new Promise(async (resolve,reject)=>{
            try{
                if(req.body.graphDrillDown){
                    let graphDrillDown = await database.models.drilldown.create(req.body.graphDrillDown)

                    let responseMessage = "Drilldown graph data inserted successfully"

                    return resolve({
                        message:responseMessage,
                        result:graphDrillDown
                    })
                }
                }
            catch(err){
                return reject({message:err})
            }
        })
    }

    async list(req){
        return new Promise(async (resolve,reject)=>{
            try{

                let drillDownDocument = await database.models.drilldown.findOne({
                    externalId:req.params.id
                })

                let hierarchyLevel = 0;
                let noRecordFound = false;
                let result= {}

                while(noRecordFound !== true)
                {
                    let drillDownResult = drillDownDocument.graphScore.filter(data=>data.hierarchyLevel == hierarchyLevel)
                    
                    if(drillDownResult.length>0){

                        drillDownResult.forEach(eachDrillDownDocument=>{
                            
                            if(!result[hierarchyLevel]){
                                result[hierarchyLevel] = {
                                    data:new Array
                                }
                            }

                            if(!eachDrillDownDocument.hierarchyTrack[hierarchyLevel-1] || !eachDrillDownDocument.hierarchyTrack[hierarchyLevel-1].name){
                                result[hierarchyLevel].data.push(_.pick(eachDrillDownDocument,["name","score"]))
                            }else{
                                if( !result[hierarchyLevel][eachDrillDownDocument.hierarchyTrack[hierarchyLevel-1].name]){
                                    
                                    result[hierarchyLevel][eachDrillDownDocument.hierarchyTrack[hierarchyLevel-1].name]={
                                        data:new Array
                                    }
                                }

                                result[hierarchyLevel][eachDrillDownDocument.hierarchyTrack[hierarchyLevel-1].name].data.push(_.pick(eachDrillDownDocument,["name","score"]))
                            }    
                        })

                        hierarchyLevel +=1
                   
                    }else{
                        noRecordFound = true
                    }
                }

                let resulting = {}
                resulting["sections"] = new Array
                let tabularData = [
                    {
                        name:"name",
                        label:"Name"
                    },{
                        name:"score",
                        label:"Scoring Value"
                    }
                ]

                let generateDrillDownResult = (keyValue,parent="")=>{

                    if(keyValue.data && keyValue.data.length>0){
                        let eachSection = {}
                        eachSection["subSections"] = new Array

                        let data= new Array
                       

                        keyValue.data.forEach(eachKeyValue=>{
                            data.push(eachKeyValue)
                        })

                        eachSection.subSections.push({
                            graph:true,
                            parentData:parent,
                            data:data,
                            tabularData:tabularData
                        })
                        
                        resulting.sections.push(eachSection)
                    }else{

                        Object.keys(keyValue).forEach(eachKeyData=>{
                            generateDrillDownResult(keyValue[eachKeyData],eachKeyData)
                        })
                    }
                }

                Object.values(result).forEach(eachResultValue=>{
                    generateDrillDownResult(eachResultValue)
                })

                return resolve({
                    message:"Drilldown report fetched successfully",
                    result:resulting
                })
                }
            catch(err){
                return reject({message:err})
            }
        })
    }
}
