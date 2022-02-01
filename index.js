const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const port = 3001;
//Iniciamos en app el servidore web
const app = express()
//Agregamos CORS (politicas de seguridad)
// PAra que otros dominios (react localhost:3000) puedan acceder a nuestros datos
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

app.get('/enfermera', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM enfermera', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})


// Obtener solo un profesor
app.get('/enfermera/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM enfermera WHERE idenfermeras = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

                    //REquest peticion     response  response
app.post('/enfermera', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO ENFERMERA     
                (idenfermeras,nombre, apellido,direccion) VALUES
                 (?,?,?,?)`;

    cn.execute(
        query, [body.idenfermeras, body.nombre, body.apellido, body.direccion],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//update
app.put('/enfermera', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE ENFERMERA     
                SET nombre=?, apellido=?, direccion=?
                WHERE idenfermeras = ?`;
    cn.execute(
        query, [body.nombre, body.apellido, body.direccion,body.idenfermeras],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

app.get('/paciente', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM paciente', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

//Habilitamos el servidor en el puerto indicado
//En esta caso sera 3001 porque el 3000 ya es usado por React
app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})