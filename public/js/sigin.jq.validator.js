var Signin = function() {
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
  };

  var authUser = function() {

    $.validator.methods.email = function(value, element) {
      var regexr =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return this.optional(element) || regexr.test(value);
    };

    $('#signin-form').validate({

      rules: {
        username: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 4,
          maxlength: 10
        }
      },

      messages: {
        username: {
          required: '이메일 주소를 입력해 주세요',
          email: '이메일 주소의 형식이 유효하지 않습니다'
        },
        password: {
          required: '패스워드를 입력해 주세요',
          minlength: '4자리 이상으로 입력해 주세요',
          maxlength: '10자리 이하로 입력해 주세요'
        }
      },

      errorPlacement: function(error, element) {
        element.parent().css("margin-bottom", "5px");
        error.insertAfter(element.closest('.input-group'))
        .css({ "font-size": "0.8em", "font-weight": "500", "color": "#ff203f" });
      },

      submitHandler: function(form) {
        $.ajax({
          method: "POST",
          url: "/signin",
          data: $("#signin-form").serialize()
        })
          .done(function(data){
            if(data.auth_res){
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
      }
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