var express = require('express');
var router = express.Router();

// localhost:3000/api/sensors
router.get('/sensors', (req, res)=>{
  dt = {
    "service_name" : "get_all_sensor"
  }
  res.json(dt)
})


// localhost:3000/api/sensors/dht-11 => has id
router.get('/sensors/:id', (req, res)=>{
  dt = {
    "service_name" : "get_sensor_by_id",
    "id" : req.params.id, // depend on params 
  }
  res.json(dt)
})

router.post("/sensors", (req, res)=>{
  console.log(req.body)
  dt = {
    "data" : req.body,
    "service_name" : "get_all_sensor_by_id",
  }
  res.json(dt)
})






module.exports = router;
