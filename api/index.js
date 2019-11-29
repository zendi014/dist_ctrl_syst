var express = require('express');
var router = express.Router();
let md5 = require('md5');//install first -> CMD //npm i md5 --save


let fs = require("./sdk/connection")
let sensors = fs.collection("sensors")


let source_key = md5("k1");
let destination_key = md5("k5");

router.get('/sensor_transactions', (req, res)=>{
    let dt = []
    sensors.get().then((snap)=>{
        snap.forEach((s)=>{
            dt.push(s.data())
        })
        res.json(dt);
    })
})


router.post('/sensor_transaction', (req, res)=>{
    let data = {
        "transaction_key": "",
        "source_key": source_key,
        "value": req.body.value,
        "destination_key": md5(req.body.destination_key),
    }
    sensors.add(data).then((snap)=>{
        snap.update({
            "transaction_key": snap.id
        })
        data.transaction_key = snap.id
        res.json(data)
    })  
})



router.get('/sensor_transaction/:transaction_key', (req, res)=>{ // name, id, key
  sensors.doc(req.params.transaction_key)
      .get().then((snap)=>{
          res.json(snap.data())
  })    
});




router.put('/sensor_transaction/:transaction_key', (req, res)=>{
    let data = {
        "transaction_key": req.params.transaction_key,
        "source_key": req.body.source_key,
        "value": req.body.value,
        "destination_key": req.body.destination_key,
    }
    sensors.doc(req.params.transaction_key).update(data).then((snap)=>{
        if(snap){
            res.status(201).json(data);
        }        
    })  
});


module.exports = router;