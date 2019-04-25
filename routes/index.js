module.exports = function(app){
    const applicationBaseUrl = process.env.APPLICATION_BASE_URL

    let router = async function(req,res,next){
        req.params.controller += "Controller";

        if(!controllers[req.params.controller]) return next()

        else{
            try{
                var result = await controllers[req.params.controller][req.params.method](req);

                res.status(result.status?result.status:200).json({
                    message:result.message,
                    status:result.status?result.status:200,
                    result:result.result
                })

                if(process.env.ENABLE_CONSOLE_LOGGING == "ON"){
                    console.log("-------Response STARTS Here ----------------")
                    console.log(result)
                    console.log("-------Response ENDs Here ----------------")
                }
            } catch(error){
            
                console.log("-------Response STARTS Here ----------------")
                console.log(error)
                console.log("-------Response ENDs Here ----------------")
            }
        }
        
    }

    app.all(applicationBaseUrl +"/api/:controller/:method",router)
    app.all(applicationBaseUrl +"/api/:controller/:method/:id",router)
}