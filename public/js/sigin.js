var Signin = function() {

  var showErrorMessage = function(msg) {
    $("#signin-alert").text(msg).show();
    //$("#username-form").addClass("has-error");
  };

  var removeErrorMessage = function() {
    $("#signin-alert").hide();
    //$("#username-form").removeClass("has-error");
  };

  var checkUsername = function() {
    var regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regexr.test($("#username").val());
  };

  var checkPassword = function() {
    return $("#password").val().length > 3;
  };

  var checkForm = function() {

    if(!checkUsername()){
      showErrorMessage('이메일 주소의 형식이 유효하지 않습니다.');
      //$('#username').focus();
      return false;
    } else {
      removeErrorMessage();
    }

    if(!checkPassword()){
      showErrorMessage('패스워드는 4자리 이상으로 입력해 주세요.');
      //$('#password').focus();
      return false;
    } else {
      removeErrorMessage();
    }

    return true;
  };

  // Initiation of views
  var handleSignin = function() {
    var signinBox = $("#signin-box");
    var signupBox = $("#signup-box");
    var forgotPasswordBox = $("#forgot-password-box");

    $("#signup-here").on("click", function () {
      signinBox.hide();
      signupBox.show();
      forgotPasswordBox.hide();
    });

    $("#goto-signin, #btn-back").on("click", function () {
      signinBox.show();
      signupBox.hide();
      forgotPasswordBox.hide();
    });

    $("#goto-forget-password").on("click", function () {
      signinBox.hide();
      signupBox.hide();
      forgotPasswordBox.show();
    });

    // Validate username & password
    $("#username").on("blur", function() {
      if(!checkUsername()){
        showErrorMessage('이메일 주소의 형식이 유효하지 않습니다.');
        //$('#username').focus();
      } else {
        removeErrorMessage();
      }
    });

    $("#password").on("blur", function () {
      if(!checkPassword()){
        showErrorMessage('패스워드는 4자리 이상으로 입력해 주세요.');
        //$('#password').focus();
      } else {
        removeErrorMessage();
      }
    });
  };

  var authUser = function() {
    // ID & Password Authentication
    var btnSignin = $("#btn-signin");

    // blur 후 click 이벤트가 발생하지 않는 문제의 해결을 위한 처리
    btnSignin.on("mousedown", function(event){
      event.preventDefault();
    });

    btnSignin.on("click", function(event) {

      event.preventDefault();

      if(!checkForm()) return;

      // form validation success, call ajax form submit
      $.ajax({
          method: "POST",
          url: "/signin",
          data: $("#signin-form").serialize()
        })
        .done(function(data){
          if(data && data.auth_res){
            // Success
            window.location.href = "/main";
          }else{
            // Failure
            $("#signin-alert").text(data.msg).show();
          }
        })
        .fail(function(err) {
          throw new Error("Signin failed", err);
        });
    });
  };

  return {
    init: function() {
      handleSignin();
      authUser();
    }
  };
}();

$(function(){
  Signin.init();
});