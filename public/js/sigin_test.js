$(function(){
  var btnSignin = $("#btn-signin");

  btnSignin.on("click", function(event) {

    event.preventDefault();

    $.ajax({
        url: "/signin"
      })
      .done(function (data) {
        if (data.msg) {
          // Success
          console.log(data.msg);
        }
      })
      .fail(function (err) {
        throw new Error("Signin failed", err);
      });

  });
});