// set up ======================================================================
var express    = require('express');
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));

// routes ======================================================================
//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});

app.get('/', function(req, res){
  res.render('signin');
});

app.post('/signin', function (req, res) {

  var id       = req.body.username;
  var password = req.body.password;

  console.log("id: "+id);
  console.log("pw: "+password);

  // Authorize user
  // Query from database
  connection.query('SELECT password FROM USERS WHERE email= ?', [id], function(err, rows) {
    if(err) throw err;

    if(!rows.length) {
      console.log('Incorrect email.');
      res.send({
       auth_res : false,
       msg: "등록되지 않은 아이디입니다. 아이디를 다시 확인하세요."
      });
    } else if(rows[0].password !== password){
      console.log('Incorrect password: %s != %s', rows[0].password, password);
      res.send({
        auth_res : false,
        msg: "패스워드를 잘못 입력하셨습니다."
      });
    } else {
      console.log('Successfully authenticated!!');
      res.send({
        auth_res : true
      });
    }
  });
});

app.get('/main', function(req, res){
  res.render('main', {
    title: "main",
    msg: "Welcome",
    id: "ungmo2@gmail.com",
    logout_display: true
  })
});

// launch ======================================================================
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});