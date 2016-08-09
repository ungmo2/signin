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
//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});

app.get('/', function(req, res){
  res.render('signin');
});

app.post('/signin', function (req, res) {

  var id = req.body.username;
  var pw = req.body.password;

  console.log("id: "+id);
  console.log("pw: "+pw);

  // Authorize user
  if(id !== "ungmo2@gmail.com") {
    res.send({
      auth_res : false,
      msg: "등록되지 않은 아이디입니다. 아이디를 다시 확인하세요."
    });
  } else if(pw !== "1111") {
    res.send({
      auth_res : false,
      msg: "패스워드를 잘못 입력하셨습니다."
    });
  } else {
    console.log("Successfully Authenticated!");
    res.send({
      auth_res : true
    });
  }
});

app.get('/main', function(req, res){
  res.render('main', {
    title: "main",
    msg: "Welcome",
    id: "ungmo2@gmail.com",
    logout_display: false
  })
});

// launch ======================================================================
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});