var express = require('express');
var router = express.Router();
let md5 = require('md5');//install first -> CMD //npm i md5 --save


let fs = require("./sdk/connection")
let sensors = fs.collection("sensors")


// let source_key = "G1"//md5("k1");
// let destination_key = "G2"//md5("k5");


router.get('/sensor_transactions', (req, res)=>{
    sensors.doc("3A1nfVFeReL3LtluC7yP").get().then((snap)=>{
        res.json(snap.data());
    })
})



router.post('/sensor_transaction', (req, res)=>{
    let data = {
        "source_key": req.body.source_key,
        "value": req.body.value,
        "destination_key": req.body.destination_key,
    }
    sensors.doc("3A1nfVFeReL3LtluC7yP").update(data).then((snap)=>{
        res.json(data)
    })  
})


/*
//case when created
router.post('/sensor_transaction', (req, res)=>{
    let data = {
        "transaction_key": "",
        "source_key": source_key,
        "value": req.body.value,
        "destination_key": req.body.destination_key,
    }
    sensors.add(data).then((snap)=>{
        snap.update({
            "transaction_key": snap.id
        })
        data.transaction_key = snap.id
        res.json(data)
    })  
})


//get all data
router.get('/sensor_transactions', (req, res)=>{
    let dt = []
    sensors.get().then((snap)=>{
        snap.forEach((s)=>{
            dt.push(s.data())
        })
        res.json(dt);
    })
})



//get total data
router.get('/total_sensor_transactions', (req, res)=>{
    sensors.get().then((snap)=>{
        res.json(snap.size);
    });
})


//get data with key
router.get('/sensor_transaction/:transaction_key', (req, res)=>{ // name, id, key
  sensors.doc(req.params.transaction_key)
      .get().then((snap)=>{
          res.json(snap.data())
  })    
});



//case when update
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




//delete data
router.get('/clean_sensor_transaction', (req, res)=>{ // name, id, key
    sensors.get().then((snap)=>{
        snap.forEach((s)=>{
            sensors.doc(s.id).delete()
        })
        res.json("collection deleted...");
    }) 
});
  

*/



module.exports = router;