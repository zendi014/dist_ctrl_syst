let e = require('express');
let r = e.Router();
let md5 = require('md5');//install first -> CMD
//npm i md5 --save

let fs = require("../api/sdk/fsconn")
let sensors = fs.collection("sensors")

r.get('/sensor', (req, res)=>{
    let dt = []
    sensors.get().then((snap)=>{
        snap.forEach((s)=>{
            dt.push(s.data())
        })
        res.json(dt);
    })//res.json(dt);//HTTP Response CODE Perhaps Required
})

r.get('/sensor/:id', (req, res)=>{ // name, id, key
    sensors.doc("BOkIhLffProIKHDnvEti")
        .get().then((snap)=>{
            res.json(snap.data())
    })    
})

r.post('/sensor', (req, res)=>{
    let data = {
        "sensor_name": req.body.sensor_name,
        "status": req.body.status,
        "trigger": req.body.trigger,
        "value": req.body.value,
        "sensor_key": ""
    }
    sensors.add(data).then((snap)=>{
        snap.update({
            "sensor_key": snap.id
        })
        data.sensor_key = snap.id
        res.json(data)
    })  
})




r.put('/sensor/:id', (req, res)=>{
    let data = {
        "sensor_name": req.body.sensor_name,
        "status": req.body.status,
        "trigger": req.body.trigger,
        "value": req.body.value
    }
    sensors.doc(req.params.id).update(data).then((snap)=>{
        if(snap){
            res.status(201).json(data);
        }        
    })  
})
module.exports = r;