const express = require('express');
const bodyParser = require('body-parser');
//const { use } = require('express/lib/application');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//const { database } = require('pg/lib/defaults');
//const { response } = require('express');
//const { user } = require('pg/lib/defaults');


const { pg } = require('pg');

const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pg.connect();

pg.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> {res.send('it is working!')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post ('/imageurl', (req, res) => {image.handleApiCall(req, res)})

// Load hash from your password DB.


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})



