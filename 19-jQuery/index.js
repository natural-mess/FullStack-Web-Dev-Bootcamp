// Wait for jQuery library finishes loading, then access h1 and change its color
// $(document).ready(function(){
//     $("h1").css("color", "red");
// })
// This way we can add below lines to begining of html file (between head tag)
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
//<script src="index.js"></script>

// $("h1").css("color", "red");

// $("h1").addClass("big-title margin-50");
// $("h1").removeClass("margin-50");
// $("h1").hasClass("big-title");

// $("h1").text("Bye");
// $("button").html("<em>Hey</em>")

// $("h1").click(function(){
//     $("h1").css("color", "purple");
// });

// $("button").click(function(){
//     $("h1").css("color", "purple");
// });

// $(document).keypress(function(event){
//     $("h1").text(event.key);
//     // console.log(event.key);
// });

// $("h1").on("mouseover", function(event){
//     $("h1").css("color", "purple");
// });

// $("h1").before("<button>New</button>");
// $("h1").after("<button>New</button>");
// $("h1").prepend("<button>New</button>");
// $("h1").append("<button>New</button>");

// $("button").remove();

// $("button").on("click", function(){
//     $("h1").hide();
// });
// $("h1").show();

// $("button").on("click", function(){
//     $("h1").toggle();
// });

// $("button").on("click", function(){
//     $("h1").fadeOut();
// });

// $("button").on("click", function(){
//     $("h1").fadeIn();
// });

// $("button").on("click", function(){
//     $("h1").fadeToggle();
// });

// $("h1").slideUp();
// $("h1").slideDown();
// $("h1").slideToggle();

// $("button").on("click", function(){
//     $("h1").animate({opacity: 0.5});
// });

$("button").on("click", function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});