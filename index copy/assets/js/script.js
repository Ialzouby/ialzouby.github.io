(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(1000).fadeOut(500);
		}
	}

	$( ".preloader-ring" ).each(function() {
    let text = $(this).text(),
    textArr = text.split(''),
    a = 0;
    $(this).html('');
    for (let i = 0; i <= 30; i++) {
        if (!textArr[i] || textArr[i] == " ") {
            textArr[i] = "";
        }
        $(this).append('<div class="preloader-sector" style="transform: rotateY(' +a+ 'deg) translateZ(160px)">'+textArr[i]+'</div>');
        a = a+12;
    }
});

	

// JavaScript to apply fade-out effect in outreach
let currentIndex = 0; // Adjust based on your slider's initial block
const totalBlocks = document.querySelectorAll('.slider-block').length;

function updateSlider() {
  // Remove fade-out class from all blocks
  document.querySelectorAll('.slider-block').forEach(block => {
    block.classList.remove('fade-out');
  });

  // Add fade-out class to the block that's sliding out
  let fadeOutIndex = currentIndex % totalBlocks;
  document.querySelectorAll('.slider-block')[fadeOutIndex].classList.add('fade-out');

  // Update currentIndex for next cycle (adjust logic based on your slider's direction)
  currentIndex++;
}

// Assuming you have a mechanism to trigger this function periodically
setInterval(updateSlider, 2000); // Adjust interval based on your slider's speed







	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-top');
			if (windowpos >= 110) {
				siteHeader.addClass('fixed-header');
				scrollLink.addClass('open');
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.removeClass('open');
			}
		}
	}
	
	headerStyle();

	// Rotate text

	if($('.circle-main').length){
		var text_1 = document.querySelector(".text_1 p.text_2");
		text_1.innerHTML = text_1.innerHTML.split('').map(
			(char, i) =>
			`<span style="transform:rotate(${i*10}deg)">${char}</span>`
		).join('');
		}
		

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="icon-07"></i></div>');
		
	}

	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .menu-area .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('.megamenu').slideToggle(900);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
		
	}
	function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split('/').reverse()[0];

        selector.find('li').each(function () {
            let anchor = $(this).find('a');
            if ($(anchor).attr('href') == FileName) {
                $(this).addClass('current');
            }
        });
        // if any li has .current elmnt add class
        selector.children('li').each(function () {
            if ($(this).find('.current').length) {
                $(this).addClass('current');
            }
        });
        // if no file name return 
        if ('' == FileName) {
            selector.find('li').eq(0).addClass('current');
        }
    }

    // dynamic current class        
    let mainNavUL = $('.main-menu').find('.navigation');
    dynamicCurrentMenuClass(mainNavUL);

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1000);
	
		});
	}

	// Elements Animation
	if($('.wow').length){
		var wow = new WOW({
		mobile:       false
		});
		wow.init();
	}

	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}


	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}


	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}


	//Pricing Tabs
	if($('.pricing-tabs').length){
		$('.pricing-tabs .tab-btns .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.pricing-tabs .tab-btns .tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.pricing-tabs .pr-content .pr-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}



	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}


	// brand-carousel
	if ($('.brand-carousel').length) {
        $('.brand-carousel').owlCarousel({
            loop:true,
			margin:0,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class"icon-05"></span>', '<span class"icon-06"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:2
                },
                1200:{
                    items:2
                },
                1500:{
                    items:3
                },
                1600:{
                    items:4
                }
            }
        });
    }

	// brand-carousel-two
	if ($('.brand-carousel-two').length) {
        $('.brand-carousel-two').owlCarousel({
            loop:true,
			margin:20,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<span class"icon-05"></span>', '<span class"icon-06"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1200:{
                    items:2
                },
                1500:{
                    items:2
                },
                1600:{
                    items:3
                }
            }
        });
    }

	// banner-carousel
	if ($('.banner-carousel').length) {
		$('.banner-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			autoplay: 6000,
			navText: [ '<span class"icon-05"></span>', '<span class"icon-06"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				}
			}
		});
	}

	// portfolio-carousel
	if ($('.portfolio-carousel').length) {
		$('.portfolio-carousel').owlCarousel({
			loop:true,
			margin:24,
			nav:true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			autoplay: 6000,
			navText: [ '<span class"icon-05"></span>', '<span class"icon-06"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				}
			}
		});
	}
	

	if ($('.two-item-carousel').length) {
		var twoItemCarousel = new Swiper('.two-item-carousel', {
			preloadImages: false,
			loop: true,
			grabCursor: true,
			centeredSlides: false,
			resistance: true,
			resistanceRatio: 0.6,
			slidesPerView: 4,
			speed: 400,
			spaceBetween: 45,
			parallax: false,
			effect: "slide",
			active: 'active',
			autoplay: {
				delay: 800000000000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.button_next',
				prevEl: '.button_prev',
			},
			pagination: {
				el: '.slider__pagination',
				clickable: true,
			},
			breakpoints: {
                1800: {
                  slidesPerView: 4,
                },
                1600: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 2,
                },
                991: {
                  slidesPerView: 1,
                }, 
                400: {
                  slidesPerView: 1,
                }, 
            }
		});
	}



	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav').onePageNav();
	}




    // Progress Bar
	if ($('.count-bar').length) {
		$('.count-bar').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});

	}


	// page direction
	function directionswitch() {
	  	if ($('.page_direction').length) {

	    	$('.direction_switch button').on('click', function() {
			   $('body').toggleClass(function(){
			      return $(this).is('.rtl, .ltr') ? 'rtl ltr' : 'rtl';
			  })
			});
	  	};
	}


	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-4').length){
		var scene = $('.parallax-scene-4').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-5').length){
		var scene = $('.parallax-scene-5').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-6').length){
		var scene = $('.parallax-scene-6').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-7').length){
		var scene = $('.parallax-scene-7').get(0);
		var parallaxInstance = new Parallax(scene);
	}

	if($('.paroller').length){
		$('.paroller').paroller({
			  factor: 0.1,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: 0.1,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'vertical' // vertical, horizontal  
		});
	}

	if($('.paroller-2').length){
		$('.paroller-2').paroller({
			  factor: -0.1,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: -0.1,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'vertical' // vertical, horizontal  
		});
	}

	if($('.paroller-3').length){
		$('.paroller-3').paroller({
			  factor: 0.1,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: 0.1,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'horizontal' // vertical, horizontal  
		});
	}

	if($('.paroller-4').length){
		$('.paroller-4').paroller({
			  factor: -0.1,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: -40.1,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'horizontal' // vertical, horizontal  
		});
	}


	if($('.timer').length){
	   $(function(){
		    $('[data-countdown]').each(function() {
		   var $this = $(this), finalDate = $(this).data('countdown');
		   $this.countdown(finalDate, function(event) {
		     $this.html(event.strftime('%D days %H:%M:%S'));
		   });
		 });
		});

	   $('.cs-countdown').countdown('').on('update.countdown', function(event) {
		  var $this = $(this).html(event.strftime('<div class="count-col"><span>%D</span><h6>days</h6></div> <div class="count-col"><span>%H</span><h6>Hours</h6></div> <div class="count-col"><span>%M</span><h6>Minutes</h6></div> <div class="count-col"><span>%S</span><h6>Seconds</h6></div>'));
		});
	}


	

	//Search Popup
	if($('#search-popup').length){
		
		//Show Popup
		$('.search-toggler').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		$(document).keydown(function(e){
	        if(e.keyCode === 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });
		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}


	function tabpane() {
		if($('.tab-pane').length){
			$('.tab-pane').delay(10).css("display", "none");
		}
	}



	// Scroll top button
    $('.scroll-top-inner').on("click", function () {
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });


    function handleScrollbar() {
        const bHeight = $('body').height();
        const scrolled = $(window).innerHeight() + $(window).scrollTop();

        let percentage = ((scrolled / bHeight) * 100);

        if (percentage > 100) percentage = 100;

        $('.scroll-top-inner .bar-inner').css( 'width', percentage + '%');
    }


	/* mouse cursor */
	document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
		e.style.left = n.clientX + "px", 
		e.style.top = n.clientY + "px"
    });
    var 
        e = document.getElementById("mouse-pointer");
        
	$(document).mousemove(function(e){
		
		$(".funfact-eight, .subscribe-one.home-16, .clients-one.home-7")
		.on("mouseenter", function() {	 
			$('.mouse-pointer').addClass("black")	  
		})
		.on("mouseleave", function() {	  
			$('.mouse-pointer').removeClass("black")	  
		})
		
		$(".pointer-large, .owl-prev, .owl-next, a.theme-btn ")
		.on("mouseenter", function() {	 
			$('.mouse-pointer').addClass("large")	  
		})
		.on("mouseleave", function() {	  
			$('.mouse-pointer').removeClass("large")	  
		})
		$(" a ")
		.on("mouseenter", function() {	 
			$('.mouse-pointer').addClass("transparent")	  
		})
		.on("mouseleave", function() {	  
			$('.mouse-pointer').removeClass("transparent")	  
		})
		
		$(".pointer-right, .banner-carousel, .two-item-carousel, .portfolio-carousel")
		.on("mouseenter", function() {	 
			$('.mouse-pointer').addClass("right")	  
		})
		.on("mouseleave", function() {	  
			$('.mouse-pointer').removeClass("right")	  
		})
		
	});

	function onHoverthreeDmovement() {
	    var tiltBlock = $('.js-tilt');
	    if(tiltBlock.length) {
	        $('.js-tilt').tilt({
	            maxTilt: 20,
	            perspective:700, 
	            glare: true,
	            maxGlare: 0
	        })
	    }
	}




    

    

	/*	=========================================================================
	When document is Scrollig, do
	========================================================================== */

	jQuery(document).on('ready', function () {
		(function ($) {
			// add your functions
			directionswitch();
			onHoverthreeDmovement();
		})(jQuery);
	});



	/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
		handleScrollbar();
		if ($(window).scrollTop() > 200) {
                $('.scroll-top-inner').addClass('visible');
            } else {
                $('.scroll-top-inner').removeClass('visible');
            }
	});

	
	
	/* ==========================================================================
   When document is loaded, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		tabpane();
	});

	

})(window.jQuery);
