var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


// Connexion avec la base de donnees 
const { Client } = require('pg');
const connectionString = new Client({
connectionString: 'postgresql://neondb_owner:npg_h7rqO3NQtpuC@ep-wild-mountain-abc0qrca-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
ssl: { rejectUnauthorized: false }
});
const client = new Client( connectionString );
client.connect();

