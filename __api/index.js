const ex = require("express");
const r = ex.Router();

const sensor = require('./modules/sensors')

const user = require('./modules/users')

r.get('/sensors', sensor.get_sensors)
 .get('/sensor/:id', sensor.get_sensor_by_id)
 .post('/sensor', sensor.add_sensor)
 .put('/sensor/:id', sensor.update_sensor)
 .delete('/sensor/:id', sensor.delete_sensor);



r.get('/users', user.get_users)
 .get('/user/:id', user.get_user_by_id)
 .put('/user', user.update_user)
 .post('/user', user.add_user)
 .delete('/user', user.remove_user);

module.exports = r;