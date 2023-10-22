const validateJson = (json)=>{
    try{
        JSON.parse(json)
        return 1
    }
    catch(err){
        return 0
    }
}

export {validateJson}