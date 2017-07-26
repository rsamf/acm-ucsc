const fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
];
const Role = {
    Member : "Member",
    Chair : "Chair",
    ViceChair : "Vice Chair",
    Treasurer : "Treasurer",
    Secretary : "Secretary",
    Webmaster : "Webmaster",
    CRC : "Corporate Relations Chair"
};

module.exports = {
    fileTypes : fileTypes,
    validFileType : function(file) {
        for (let i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    },
    getUserColor : function(user){
        switch(user.role){
            case Role.Member:
                return "grey";
            case Role.Chair:
                return "red";
            case Role.ViceChair:
                return "orange";
            case Role.Treasurer:
                return "yellow";
            case Role.Secretary:
                return "blue";
            case Role.Webmaster:
                return "olive";
            case Role.CRC:
                return "green";
        }
    }

};
