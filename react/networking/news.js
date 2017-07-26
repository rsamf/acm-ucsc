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
            contentType : false,
            processData : false,
            dataType : "json",
            success : callback,
            error : console.error
        });
    },
    deleteArticle : function(id, callback){
        $.ajax({
            method : "DELETE",
            url : "/articles/"+id,
            dataType : "json",
            success : callback,
            error : console.error
        });
    }
};