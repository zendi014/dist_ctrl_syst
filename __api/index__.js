var ex = require("express");
var r = ex.Router();


var pgl = require("./databases/local_postgres");
var pgc = require("./databases/cloud_postgres");

var mg = require("./databases/mongo");
let db_test;
mg.connect(function (err, client){
    if(err){
        throw err;
    }
    db_test = client.db("test");
});

r.get('/mongo', async (req, res) => {
    try {
        const coll = db_test.collection("devices");
        coll.find({}).toArray((error, dt) => {
            if(error) {
                return response.status(500).send(error);
            }
            res.send(dt);
        });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});



r.get('/sensors', async (req, res) => {
    try {
      const client = await pgl.connect()
      const result = await client.query('SELECT * from sensors');
      const results = { 'results': (result) ? result.rows : null};
      
      res.json(results);

      client.release();
    } catch (err) {
      console.error(err);

      res.send("Error " + err);
    }
});


r.post('/sensor', async (req, res) => {    
    try {
        const { sensor_name, sensor_status } = req.body
        const client = await pgl.connect()
        let q = `
            INSERT 
                INTO sensors (sensor_name, sensor_status)
            VALUES ($1, $2)  
        `;
        console.log(q)
        client.query(q, [sensor_name, sensor_status], (e, r) => {
            if(e){
                res.status(201).send(e);
            }
            const results = { 'results': (r) ? r.rows : null};
            res.status(201).send(results);
        });
    } catch (err) {
        res.status(201).send(err);
    }
});


r.get('/db', async (req, res) => {
    try {
      const client = await pgc.connect()
      const result = await client.query('SELECT * from test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results)
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
});

  


//CREATE
r.post('/sensor', (req, res)=> {
    res.status(201).json({
        "stat" : "created",
        "data": req.body //handled by user input
    })
});

//READ ALL
r.get('/sensor', (req, res)=> {
    res.status(201).json({
        "stat" : "generated",
        "id" : "NULL"
    })
});

//READ BY ID
r.get('/sensor/:id', (req, res)=> {
    res.status(201).json({
        "stat" : "generated by id",
        "id" : req.params.id
    })
});

//UPDATE
r.put('/sensor/:id', (req, res)=> {
    res.status(201).json({
        "stat" : "updated",
        "id" : req.params.id,
        "data": req.body
    })
});

//DELETE
r.delete('/sensor/:id', (req, res)=> {
    res.status(201).json({
        "stat" : "deleted",
        "id" : req.params.id
    })
});


module.exports = r;