let fs_adm = require("firebase-admin")
let fs_conf = require("./fsconfig.json")
//if(fs_adm.app.length > 0 ){
//    fs_adm.app()   
//}else{
    fs_adm.initializeApp({
        credential: fs_adm.credential.cert(fs_conf),
        databaseURL: "https://simple-app-103ff.firebaseio.com"
    })
//}
let db = fs_adm.firestore()
db.settings({timestampsInSnapshots: true});
module.exports = db;