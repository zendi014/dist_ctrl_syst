let db = require('../databases/cloud_postgres')

const get_sensors = (req, res) => {
    db.query(`
        SELECT * FROM sensors
    `, (e, dt)=>{
       if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(dt.rows)
    })
}


const get_sensor_by_id = (req, res) => {
    let id = req.params.id
    db.query(`
        SELECT * FROM sensors
        WHERE id = $1
    `, [id], (e, dt) => {
       if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(dt.rows)
    })
}


const add_sensor = (req, res) => {
    const {name, status} = req.body;
    db.query(`
        INSERT INTO sensors (name, status)
        VALUES ($1, $2)
    `, [name, status], (e, dt) => {
       if(e){
        throw e
       } 
       res.status(201).json(
        Object.assign(req.body, {"response": "created"})
       )
    })
}


const update_sensor = (req, res) => {
    let id = req.params.id
    const {name, status} = req.body;
    db.query(`
        UPDATE sensors
        SET name = $1, status = $2
        WHERE id = $3
    `, [name, status, id], (e, dt) => {
       if(e){
            res.status(200).json(e)
       } 
       res.status(200).json(
           Object.assign(req.body, {"response": "updated"})
       )
    })
}



const delete_sensor = (req, res) => {
    let id = req.params.id
    db.query(`
        DELETE FROM sensors
        WHERE id = $1
    `, [id], (e, dt) => {
       if(e){
            res.status(200).json(e)
       } 
       res.status(200).json({
           "id": id,
           "response": "deleted"
        })
    })
}


module.exports = {
    get_sensors,
    get_sensor_by_id,
    add_sensor,
    update_sensor,
    delete_sensor
};


console.log(new Date())


//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/