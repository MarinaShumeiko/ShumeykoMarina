$(function() {

  "use strict";

  /*===============================================
    Preloader
  ===============================================*/
  $(window).load(function () {
    $("body").addClass("loaded");
  });

  /*===============================================
    Scroll Spy
  ===============================================*/
  $('body').scrollspy({ 
    target: '.menu', 
    offset: 50 
  });

  /*===============================================
    Smooth Scrolling
  ===============================================*/
  var htmlBody = $("html,body");

  $(document).ready(function(e) {
    $(".menu li a, .arrow-down a").on("click", function(e) {
        htmlBody.animate({scrollTop: $(this.hash).offset().top}, 800, "easeInOutQuart");  
      e.preventDefault();
    });
  });

  /*===============================================
    Toggle Menu
  ===============================================*/
  var menu = $(".menu");
  var toggleBtn = $(".toggle-btn");

  toggleBtn.on("click", function(e) {
    if (menu.hasClass("show-menu")) {
      menu.removeClass("show-menu");
    }
    else {
      menu.addClass("show-menu");
    }
    e.stopPropagation();
  });

  // Navicon transform into X //
  toggleBtn.on("click", function() {
    if (toggleBtn.hasClass("toggle-close")) {
      toggleBtn.removeClass("toggle-close");
    }
    else {
      toggleBtn.addClass("toggle-close");
    }
  });

  /*===============================================
    Parallax
  ===============================================*/
  $(".parallax-section").parallax({ 
    speed : 0.3 
  });

  /*===============================================
    Owl Carousel
  ===============================================*/

  // Blog Slider
  $("#blogSlider").owlCarousel({
    items: 2,
    itemsDesktop: [1199,2], // Show 2 items on Desktop
    itemsDesktopSmall: [979,2], // 2 items on Small Deskktop
    itemsTablet: [768,1], // 1 item on Tablet
    itemsMobile: [479,1], // 1 item on Mobile
    slideSpeed: 500, // 0.5 seconds
    pagination: false,
    navigation: false,
    rewindSpeed: 700
  });

  // Custom Navigation
  var blogNavigation = $("#blogSlider");
 
  // Events
  $("#next").on("click", function(){
    blogNavigation.trigger('owl.next');
  })
  $("#prev").on("click", function(){
    blogNavigation.trigger('owl.prev');
  })
  // end Custom Navigation

  // Blog Page
  $("#postSlider").owlCarousel({
    slideSpeed: 500, // 0.5 seconds
    pagination: false,
    navigation: true,
    navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    rewindSpeed: 700,
    singleItem: true
  });

  /*===============================================
    Counter
  ===============================================*/
  $("#skills [data-to]").each(function() {
    var $this = $(this);
    $this.appear(function() {
      $this.countTo({
        speed: 1500
      });
    }, {accX: 0, accY: -10});
  });

  /*===============================================
    Isotope
  ===============================================*/
  var $masonryGrid = $("#masonryGrid").isotope({itemSelector: '.portfolio-box'});

  // Layout Isotope after each image loads
  $masonryGrid.imagesLoaded().progress( function() {
    $masonryGrid.isotope('layout');
  });

  // bind filter button
  var btnGroup = $("#button-group");

  btnGroup.on('click', 'li', function() {
    var filterValue = $(this).attr('data-filter');

    $masonryGrid.isotope({filter: filterValue});
  });

  // Change active class on buttons
  btnGroup.each( function( i, buttonGroup ) {
    var $buttonGroup = $(buttonGroup);

    $buttonGroup.on( 'click', 'li', function() {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });

  /*===============================================
    Magnific Popup
  ===============================================*/
  $('.lightbox').magnificPopup({ 
    type:'inline',
    fixedContentPos: false,
    removalDelay: 100,
    closeBtnInside: true,
    preloader: false,
    mainClass: 'mfp-fade'
  });

  /*===============================================
    Contact Form
  ===============================================*/
  $("#contactform").on('submit',function(e) {
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();
    if (name == '') {
      $("#name").css('border-color','rgba(255, 0, 0, 0.5)');
    }
    if (email == '') {
      $("#email").css('border-color','rgba(255, 0, 0, 0.5)');
    }
    if (phone == '') {
      $("#phone").css('border-color','rgba(255, 0, 0, 0.5)');
    }
    if (message == '') {
      $("#message").css('border-color','rgba(255, 0, 0, 0.5)');
    }
    else {
      $.ajax({
        url:'contact_form.php',
        data:$(this).serialize(),
        type:'POST',
        success:function(data){
          $("#success").show().fadeIn(1000); //=== Show Success Message==
          $('#contactform').each(function(){
            this.reset();
          });
        },
        error:function(data){
          $("#error").show().fadeIn(1000); //===Show Error Message====
        }
      });
    }
    e.preventDefault();
  });

  /*===============================================
    Google Maps
  ===============================================*/
  var markerIcon = "images/marker.png";
  // Map Initial Location
  var initLatitude = 55.851442; // <- Latitude here
  var initLongitude = 12.330302; // <- Longitude here
  
  var map = new GMaps({
    el: '#map-canvas',
    lat: initLatitude,
    lng: initLongitude,
    zoom: 16,
    scrollwheel: false
  });
  map.addMarker({
    lat : initLatitude,
    lng : initLongitude,
    icon: markerIcon
  });
  /*===============================================
    end Google Maps
  ===============================================*/

});