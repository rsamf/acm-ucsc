module.exports = {

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

    apiKey : "AIzaSyDq4HPlu-kYJYBK52hSVGXNIPjGTzmTtBU"

};