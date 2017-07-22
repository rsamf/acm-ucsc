module.exports = {
    getQR : function(callback){
        $.ajax({
            method : "GET",
            url : "/qr",

        })
    }
}