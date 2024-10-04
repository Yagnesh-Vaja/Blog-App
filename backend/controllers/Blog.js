

const Create=async(req,res)=>{
    try{
        res.send('Hello from blogs')
    }
    catch(error){
         console.log(error);
    }
}

export {Create}