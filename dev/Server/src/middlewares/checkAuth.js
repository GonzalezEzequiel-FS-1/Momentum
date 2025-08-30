const checkAuth = async (req,res,next) => {
    //console.log('In Middleware')
    next();
}
module.exports = checkAuth;