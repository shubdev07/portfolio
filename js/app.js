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
  // to add sticky class to navbar
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

  /* Navigation smooth scroll */
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

  //   handle arrow click
  $(".arrows").click(function() {
    $("html, body").animate({ scrollTop: $("#about").offset().top }, 1000);
  });

  //   adding animations to various sections --

  // for skill bars
  $(".--skill-color-fill").waypoint(
    function(direction) {
      $(".--skill-color-fill").addClass("animated flash");
    },
    {
      offset: "70%"
    }
  );

  //   for more skills container
  $(".more-skills").waypoint(
    function(direction) {
      $(".more-skills").addClass("animated fadeInLeft");
    },
    {
      offset: "100%"
    }
  );

  //   for project container
  $(".project-container").waypoint(
    function(direction) {
      $(".project-container").addClass("animated fadeInUp");
    },
    {
      offset: "100%"
    }
  );

  //   for contact form
  $(".--js-contact-section").waypoint(
    function(direction) {
      $(".--js-contact-section").addClass("animated fadeInUp");
    },
    {
      offset: "100%"
    }
  );

  //   to handle mobile nav icon
  $(".mobile-nav-icon").click(function() {
    $(".nav-links").slideToggle(200);
  });
}); // end of ready function
