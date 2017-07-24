const globals = {
    fault : function(err, next, customMessage){
        if(err){
            console.error({
                error : err,
                message : `ERROR! ${customMessage}`
            });
            return next() || true;
        }
        return false;
    },

    auth : {
        isLoggedIn : function(req, res, next){
            if(req.user) {
                return next();
            } else {
                res.json({
                    error : "You are not logged in."
                });
            }
        }
    },
    apiKey : "AIzaSyDq4HPlu-kYJYBK52hSVGXNIPjGTzmTtBU"
};

globals.auth.isOfficial = function(req, res, next){
    globals.auth.isLoggedIn(req, res, ()=>{
        if(req.user.role !== "Member"){
            return next();
        } else {
            res.json({
                error : "You do not meet the authorization of an official."
            });
        }
    });
};

globals.auth.isOfRole = function(role, req, res, next){
    globals.auth.isLoggedIn(req, res, ()=>{
        if(req.user.role === role){
            return next();
        } else {
            res.json({
                error : "You do not meet the authorization of the role, " + role
            });
        }
    });
};

module.exports = globals;