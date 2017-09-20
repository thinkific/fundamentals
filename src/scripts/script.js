$(window).load(function() {
  // FastClick
  // prevents hover interference and 300ms delay on click for touch devices
  if ("addEventListener" in document) {
    document.addEventListener("DOMContentLoaded", function() {
      FastClick.attach(document.body);
    });
  }

  // Smooth Scroll
  // https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*="#"]')
  // Ignore skip-to & empty anchors
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href="#content"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
});
