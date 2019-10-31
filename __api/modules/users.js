var mg = require("../databases/mongo");

const ObjectId = require("mongodb").ObjectID;

let col;
mg.connect(function (err, client){
    if(err){
        throw err;
    }
    col = client.db("public").collection("users");
});


const add_user = (req, res) => {
    col.insert(req.body, (e, r) => {
        if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(r)
    })
}


const get_users = (req, res) => {
    col.find({}).toArray( (e, r) => {
        if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(r)
    })
}



const get_user_by_id = (req, res) => {
    // 5dbac81585425613ec81c720
    col.find({
        '_id': req.params.id
    }).toArray( (e, r) => {
        if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(r)
    })
}



const update_user = (req, res) => {
    console.log(req.body)
    col.updateOne({
        'user_name': req.body.user_name
    }, { $set: {"owner": req.body.owner} }, (e, r) => {
        if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(r)
    })
}




const remove_user = (req, res) => {
    col.deleteOne({
        'user_name': req.body.user_name
    }, (e, r) => {
        if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(r)
    })
}








module.exports = {
    add_user,
    get_users,
    get_user_by_id,
    update_user,
    remove_user
}

//console.log(new ObjectId('5dbac81585425613ec81c720'))
//https://www.npmjs.com/package/mongodb