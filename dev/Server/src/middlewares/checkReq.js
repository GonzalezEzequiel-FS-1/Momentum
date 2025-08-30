const checkReq = async(req, res, next)=>{
    //console.log(`Body contents >>>>>> ${JSON.stringify(req.body)}`)
    return !req.body || Object.keys(req.body).length === 0
    ?res.status(400).json({success:false, error:'No provided Data'})
    :next()
}
module.exports = checkReq