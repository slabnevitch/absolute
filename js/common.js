jQuery(function() {
	jQuery(document).ready(function() {
		svg4everybody();

		$('[data-src]').Lazy();

		$( "select" ).selectmenu({
			width: $(this).closest('.abs-select-wrap').width(),
			 create: function( event, ui ) {
			 	console.log(event);
			 	console.log(ui);
			 	console.log(this);
			 }
		});

		// submit-to-thanks
			$(".submit-to-thanks").submit(function(e) { //Change
				e.preventDefault();
				var th = $(this);
				
				$.magnificPopup.open({
						items: {
							src: $('#regard-popup')
						},
						type: 'inline',
						preloader: true,
						focus: '#name',

						// When elemened is focused, some mobile browsers in some cases zoom in
						// It looks not nice, so we disable it:
						callbacks: {
							beforeOpen: function() {
								if($(window).width() < 700) {
									this.st.focus = false;
								} else {
									this.st.focus = '#name';
								}
							}
						}
					});
				});
		
		// end submit-to-thanks

		// HEADER

			$('ul.header-menu').superfish({
				// pathLevels: 0,
				onBeforeShow: function() {
					if(!this.context.classList.contains('header-menu__item')){
						console.log('dont contains class!');
						this.context.querySelector('.sf-with-ul').classList.add('opened');
					}
				},
				onBeforeHide: function() {

					// this.context.querySelector('.sf-with-ul').classList.remove('opened');
					$('.sf-with-ul').removeClass('opened');
				}

			});

			$(".header-top .toggle-mnu").click(function() {
				// $(this).toggleClass("on");
				$(".header-hd-menu").stop(true, true).fadeIn(150);
				// $('html').toggleClass('freeze');
				return false;
			});

			$(".header-hd-menu .toggle-mnu").click(function() {
				$(".header-hd-menu").stop(true, true).fadeOut(150);
				return false;
			});
		

		// END HEADER

		// magnific-popup
			$('.to-popup').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',

				// When elemened is focused, some mobile browsers in some cases zoom in
				// It looks not nice, so we disable it:
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 700) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}
					}
				}
			});
		// end magnific-popup


		//  hidden menu hover detect
			var isMobile = {
				Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
				BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
				iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
				Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
				any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
			};

			
				var touchHover = function() {
					$('[data-hover]').click(function(e){
						e.preventDefault();
						var $this = $(this);
						var onHover = $this.attr('data-hover');
						var linkHref = $this.attr('href');
						if (linkHref && $this.hasClass(onHover)) {
							location.href = linkHref;
							return false;
						}
						$this.toggleClass(onHover);
						$this
							.closest('.header-hd-menu__left')
							.find('.header-hd-menu__block')
							.siblings()
							.find('[data-hover]')
							.removeClass(onHover);

					});
				};

				if ( isMobile.any() ) {
					 touchHover();
	  		}


	  		$(".header-hd-menu__list").hoverIntent({
	  			over: function() {
	  				console.log(this);
	  				// $(this).addClass('hover');
	  				this.classList.add('hover');
	  			},
	  			out: function() {
	  				this.classList.remove('hover');
	  			},
	  			selector: 'li',
	  			timeout: 300
	  		});

		// hidden menu end hover detect


		// section MAIN-SLIDER
			$('.main-slider__slider').slick({
				arrows: false,
				dots: true,
				fade: true
			});
		// end section MAIN-SLIDER


		// section SERVICES
			function servicesToggler() {
				var _self = this,
						$marks = $('.services-mark'),
						$features = $('.services-feature');
						console.log('$marks = ' + $marks.length);
						console.log('$features = ' + $features.length);

				this.init =	function() {
					console.log('toggler');
					this.events();
				},

				this.events = function() {
					$marks.hover(this.markOver, this.markOut);
					$features.hover(this.featureOver, this.featureOut);
				},

				this.markOver = function() {
					var $th = $(this),
							index = $th.index();
					
							console.log("mark index " + index);
					$th.addClass('active')
							.siblings()
							.removeClass('active');

					_self.featuresHandler(index, true);
				},

				this.markOut = function() {
					// $marks.removeClass('active');
					// _self.featuresHandler(false, false);
				},

				this.featureOver = function() {
					var $th = $(this),
							index = $th.index();
					
					$th.addClass('active')
							.siblings()
							.removeClass('active');

					_self.markHandler(index, true);
				}

				this.featureOut = function() {
					// $features.removeClass('active');
					// _self.markHandler(false, false);
				}

				this.markHandler = function(index, activity) {
					console.log("feature index " + index);
					if(activity == true){
						$marks.eq(index).addClass('active')
							.siblings()
							.removeClass('active');
					}else{
						$marks.removeClass('active');
						
					}
				},

				this.featuresHandler = function(index, activity) {
					
					if(activity == true){
						$features.eq(index - 1).addClass('active')
							.siblings()
							.removeClass('active');
					}else{
						$features.removeClass('active');
						
					}
					
				} 
			}

			var servToggle = new servicesToggler();
			servToggle.init();
		// end section SERVICES

	});

	
});

