module.exports = {
    getEvents : function(callback){
        $.ajax({
            method : "GET",
            url : "/events",
            dataType : "json",
            success : callback,
            error : console.error
        });
    },
    postEvent : function(data, callback){
        $.ajax({
            method : "POST",
            url : "/events",
            data : data,
            dataType : "json",
            success : callback,
            error : console.error
        });
    }
};