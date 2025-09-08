var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// Connexion avec la base de donnees 
const { Client, Result } = require('pg');
const connectionString = new Client({
connectionString: 'postgresql://neondb_owner:npg_h7rqO3NQtpuC@ep-wild-mountain-abc0qrca-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
ssl: { rejectUnauthorized: false }
});
const client = new Client( connectionString );
client.connect();




router.post('/save/newtask', (req, res) => {
  const {name, description, priority, tags, date} = req.body;

  client.query('INSERT INTO tasks(name, description, priority, tags, date) VALUES ($1, $2, $3, $4, $5)', 
    [name, description, priority, tags, date])
      .then(data => {
        console.log(data);
        res.json({ result: true, message: 'Task saved'});
      })
      .catch(e => {
        console.error(e.stack);
        res.status(500).json({ result: false, message: 'Error saving task' });
      }
  );
});


module.exports = router;


router.get('/tasks', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM tasks');
    res.json({ result: true, tasks: rows });
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ result: false, error: "Internal error" });
  } 
});