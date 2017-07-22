module.exports = {
    getNews : function(callback){
        $.ajax({
            method : "GET",
            url : "/articles",
            dataType : "json",
            success : callback,
            error : console.error
        });
    },
    postArticle : function(data, callback){
        $.ajax({
            method : "POST",
            url : "/articles",
            data : data,
            dataType : "json",
            success : callback,
            error : console.error
        });
    }
};