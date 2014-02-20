var titles = $("h2, h3");

// Voeg link met 'Inhoud' toe bovenaan affix
$('#page-map').append(
  $('<li>').append(
    $('<a>').attr({href: '#top', id: 'page-map-inhoud-link'}).append(
      'Inhoud'
)));

titles.each( function(index) {
  
  if ( $(this).prop("tagName") == "H2" ) {
    $('#page-map').append(
    $('<li>').append(
      $('<a>').attr('href', '#' + $(this).attr('id')).append(
        $(this).text()
    )));
  } else {
    $('#page-map').append(
    $('<li>').append(
      $('<a>').attr('href', '#' + $(this).attr('id')).append(
        "&nbsp;&nbsp;" + $(this).text()
    )));
  }
});

// Maak link naar de bovenste H2 actief in de affix
$('#page-map li:nth-child(2)').addClass('active');


$('body').scrollspy({ target: '.page-map-sidebar' });

/* From application.js on bootstrap docs */
!function ($) {

  $(function(){

    var $window = $(window)

    // Disable certain links in docs
    $('section [href^=#]').click(function (e) {
      e.preventDefault()
    })

    // side bar
    $('.page-map-sidebar').affix({
      offset: {
        top: 284
      , bottom: 270
      }
    })          
  })
}(window.jQuery)

jQuery(document).ready(function() {
  var offset = 0;
  var duration = 500;
  // jQuery(window).scroll(function() {
  //   // 992 is @screen-md-min
  //   if ($(window).width() > 992) {
  //     if (jQuery(this).scrollTop() > offset) {
  //         jQuery('.page-map-sidebar').fadeIn(duration);
  //     } else {
  //         jQuery('.page-map-sidebar').fadeOut(duration);
  //     }
  //   } else {
  //     jQuery('.page-map-sidebar').fadeOut(duration);
  //   }
  // });
  if ($(window).width() > 992) {
    // 992 is @screen-md-min
    jQuery('.page-map-sidebar').delay(600).fadeIn(duration);
  }

  $('a[href*=#]').on('click', function(event){     
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
  });
});

$( window ).resize(function() {
  var duration = 500;
  if ($(window).width() > 992) {

    // alert("Resize!");
    // 992 is @screen-md-min
    jQuery('.page-map-sidebar').delay(600).fadeIn(duration);
  } else {
    jQuery('.page-map-sidebar').hide();
  }
});