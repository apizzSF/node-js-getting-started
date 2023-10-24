//const { Pool } = require('pg');
//const Cursor  = require('pg-cursor');

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const Pool = pg.Pool;
//const paramValue = req.params.param;


const app = express();

//const pool = new Pool()
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false  // For Heroku's self-signed certificates
});
//const client = await pool.connect()
//const cursor = client.query(new Cursor('select * from generate_series(0, 5)'))

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/move-standby/:externalID', async (req, res) => { // /move-standby ; Domain - https://nodejs-ohuang-a23f6d5e51d2.herokuapp.com/
	const paramValue = req.params.externalID;
	await pool.query('SELECT salesforce5.movetostandby($1)', [paramValue]);
	console.log(req.body);  // This will log the POST request payload
    res.status(200).json({ status: 'Received', data: req.body });
});

const PORT = process.env.PORT || 5000;
//const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
