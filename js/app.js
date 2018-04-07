$(document).ready(function() {
  var typed = new Typed("#typed", {
    stringsElement: "#typed-strings",
    loop: true,
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 700,
    showCursor: true,
    cursorChar: "|"
  });

  //   var waypoint = new Waypoint({
  //     element: document.getElementById("px-offset-waypoint"),
  //     handler: function(direction) {
  //       notify("I am 20px from the top of the window");
  //     },
  //     offset: 20
  //   });

  $(".js--about-container").waypoint(
    direction => {
      if (direction == "down") {
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    {
      offset: "10%"
    }
  );

  /* Navigation scroll */
  $("a[href^='#']").on("click", function(e) {
    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top
      },
      1000,
      function() {
        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = hash;
      }
    );
  });

  /* Animations on scroll */
  /*   $(".js--wp-1").waypoint(
    function(direction) {
      $(".js--wp-1").addClass("animated fadeIn");
    },
    {
      offset: "50%"
    }
  ); */

  $(".arrows").click(function() {
    $("html, body").animate({ scrollTop: $("#about").offset().top }, 1000);
  });

  $(".--skill-color-fill").waypoint(
    function(direction) {
      $(".--skill-color-fill").addClass("animated flash");
    },
    {
      offset: "50%"
    }
  );

  $(".more-skills").waypoint(
    function(direction) {
      $(".more-skills").addClass("animated fadeInLeft");
    },
    {
      offset: "100%"
    }
  );

  $(".project-container").waypoint(
    function(direction) {
      $(".project-container").addClass("animated fadeInUp");
    },
    {
      offset: "100%"
    }
  );

  $(".--js-contact-section").waypoint(
    function(direction) {
      $(".--js-contact-section").addClass("animated fadeIn");
    },
    {
      offset: "100%"
    }
  );

  $(".mobile-nav-icon").click(function() {
    $(".nav-links").slideToggle(200);
  });
});
