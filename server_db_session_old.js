// set up ======================================================================
var express    = require('express');
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'myHashKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } //8 Hour : Session expiration time
}));

// routes ======================================================================

//require('./app/routes.js')(app);

//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});

app.get('/', function(req, res){

  console.log(req.session.user);
  console.log(req.session.rem);

  // Check Remember me checkbox's value
  if(req.session && req.session.rem) {
    console.log('Remember me!!');

    res.render('signin', {user: req.session.user, rem: "checked"});
  } else {
    res.render('signin', {user: "", rem: ""});
  }
});


// For Session TEST!!!
app.get('/session', function (req, res) {

  if(req.session && req.session.user){
    console.log("req.session.id: ", req.session.id)
  } else {
    req.session.user = "ungmo2";
    console.log("Hello! first connect");
  }

  res.send({
    sessionID: req.session.id,
    session: req.session
  });
});
app.get('/sessionDestroy', function (req, res) {
  req.session.destroy();
  console.log("Session Destroyed!");
  // You can't make a redirection after an AJAX
  res.send({redirect: '/'});
});


// Authorize user
app.post('/signin', function (req, res) {

  var id       = req.body.username;
  var password = req.body.password;
  var remember = req.body.remember;

  console.log("id: "+id);
  console.log("password: "+password);
  console.log("remember: "+remember);

  //query from database
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

      // Set userID & Remember me in Session
      if(req.session && req.session.user){
        console.log("req.session.user: ", req.session.user)
      } else {
        req.session.user = id;
        console.log("Hello! first connect. Session created!");
      }

      // update Always
      req.session.rem = remember;

      res.send({ auth_res : true });
    }
  });
});

app.get('/main', function(req, res){
  //Get ID from Session
  if(req.session && req.session.user ){
    console.log("req.session.user: ", req.session.user);

    res.render('main', {
      title: "main",
      msg: "Welcome",
      id: "ungmo2@gmail.com",
      logout_display: true
    });
  } else {
    console.log("This user is not allowed.. Signin again!");
    res.redirect("/");
  }
});

// launch ======================================================================
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});