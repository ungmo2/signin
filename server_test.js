// set up ======================================================================
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

// configuration ===============================================================
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: false }));

// routes ======================================================================
app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('signin');
});

app.get('/signin', function (req, res) {

  //var id = req.body.username;
  //var pw = req.body.password;
  //
  //console.log("id: " + id);
  //console.log("pw: " + pw);

  res.send({ msg: 'Hello World!' });
});

// launch ======================================================================
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
