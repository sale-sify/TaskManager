// routes/tasks.js
const express = require('express');
const router = express.Router();


const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_h7rqO3NQtpuC@ep-wild-mountain-abc0qrca-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL (Neon)"))
  .catch(err => console.error("❌ Erreur connexion PostgreSQL:", err.stack));;



router.post('/save/newtask', async (req, res) => {
  const {name, description, priority, tags, date} = req.body;

  try {
    await client.query('INSERT INTO tasks(name, description, priority, tags, date) VALUES ($1, $2, $3, $4, $5)', 
      [name, description, priority, tags, date]
    );

          res.json({ result: true, message: 'Task saved'});
             
  } catch (e) {
          console.error(e.stack);
          res.status(500).json({ result: false, message: 'Error saving task' });
  }
});





router.get('/tasks', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM tasks');
    res.json({ result: true, tasks: rows });
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ result: false, error: "Internal error" });
  } 
});





module.exports = router; // <<< ça c'est crucial

