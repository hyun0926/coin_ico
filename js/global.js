$(function() {
	// 탭다운 게시판
		$('dl.tabDownBody dt').each(function() {
			$(this).on("click", function() {
				$('.tabDownBody dd').slideUp();
				if($(this).next().css("display") != "block") {
					$(this).next().slideDown();
				}
			});
		});	
  // popup num1
  $('.btnPopNum1').click(function(){
    $('.popNum1').show();
  })
  $('.btn_popClose').click(function(){
    $('.popNum1').fadeOut();
  });
  // popup num2
  $('.btnPopNum2').click(function(){
    $('.popNum2').show();
  })
  $('.btn_popClose').click(function(){
    $('.popNum2').fadeOut();
  });
  // popup num3
  $('.btnPopNum3').click(function(){
    $('.popNum3').show();
  })
  $('.btn_popClose').click(function(){
    $('.popNum3').fadeOut();
  });
  // popup num4
  $('.btnPopNum4').click(function(){
    $('.popNum4').show();
  })
  $('.btn_popClose').click(function(){
    $('.popNum4').fadeOut();
  });
	  // popup num5
  $('.btnPopNum5').click(function(){
    $('.popNum5').show();
  })
  $('.btn_popClose').click(function(){
    $('.popNum5').fadeOut();
  });	
	//open popup + 1
	$('.popup01').on('click', function(event){
		event.preventDefault();
		$('.popupCon01').addClass('is-visible');
	});
	//open popup + 2
	$('.popup02').on('click', function(event){
		event.preventDefault();
		$('.popupCon02').addClass('is-visible');
	});
	//open popup PIN
	$('.popupPin').on('click', function(event){
		event.preventDefault();
		$('.popupPinCon').addClass('is-visible');
	});
	//open popup Login
	$('.popupLogin').on('click', function(event){
		event.preventDefault();
		$('.popupLoginCon').addClass('is-visible');
	});	
	//open popup Login + fn/id-pw
	$('.popupFn').on('click', function(event){
		event.preventDefault();
		$('.popupFnCon').addClass('is-visible');
	});	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
		if(event.which=='27'){
			$('.cd-popup').removeClass('is-visible');
		}
	});			
});


// scroll top
$(function($){
	var backTop = document.getElementsByClassName('js-cd-top')[0],
		// browser window scroll (in pixels) after which the "back to top" link is shown
		offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offsetOpacity = 1200,
		scrollDuration = 700
		scrolling = false;
	if( backTop ) {
		//update back to top visibility on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
			}
		});
		//smooth scroll to top
		backTop.addEventListener('click', function(event) {
			event.preventDefault();
			(!window.requestAnimationFrame) ? window.scrollTo(0, 0) : scrollTop(scrollDuration);
		});
	}

	function checkBackToTop() {
		var windowTop = window.scrollY || document.documentElement.scrollTop;
		( windowTop > offset ) ? addClass(backTop, 'cd-top--show') : removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
		( windowTop > offsetOpacity ) && addClass(backTop, 'cd-top--fade-out');
		scrolling = false;
	}

	function scrollTop(duration) {
	    var start = window.scrollY || document.documentElement.scrollTop,
	        currentTime = null;

	    var animateScroll = function(timestamp){
	    	if (!currentTime) currentTime = timestamp;
	        var progress = timestamp - currentTime;
	        var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
	        window.scrollTo(0, val);
	        if(progress < duration) {
	            window.requestAnimationFrame(animateScroll);
	        }
	    };

	    window.requestAnimationFrame(animateScroll);
	}

	Math.easeInOutQuad = function (t, b, c, d) {
 		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};

	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
});

// progress indiocator
$(function($){
	var articlesWrapper = $('.cd-articles');

	if( articlesWrapper.length > 0 ) {
		// cache jQuery objects
		var windowHeight = $(window).height(),
			articles = articlesWrapper.find('article'),
			aside = $('.cd-read-more'),
			articleSidebarLinks = aside.find('li');
		// initialize variables
		var	scrolling = false,
			sidebarAnimation = false,
			resizing = false,
			mq = checkMQ(),
			svgCircleLength = parseInt(Math.PI*(articleSidebarLinks.eq(0).find('circle').attr('r')*2));
		
		// check media query and bind corresponding events
		if( mq == 'desktop' ) {
			$(window).on('scroll', checkRead);
			$(window).on('scroll', checkSidebar);
		}

		$(window).on('resize', resetScroll);

		updateArticle();
		updateSidebarPosition();

		aside.on('click', 'a', function(event){
			event.preventDefault();
			var selectedArticle = articles.eq($(this).parent('li').index()),
				selectedArticleTop = selectedArticle.offset().top;

			$(window).off('scroll', checkRead);

			$('body,html').animate(
				{'scrollTop': selectedArticleTop + 2}, 
				300, function(){
					checkRead();
					$(window).on('scroll', checkRead);
				}
			); 
	    });
	}

	function checkRead() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateArticle, 300) : window.requestAnimationFrame(updateArticle);
		}
	}

	function checkSidebar() {
		if( !sidebarAnimation ) {
			sidebarAnimation = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSidebarPosition, 300) : window.requestAnimationFrame(updateSidebarPosition);
		}
	}

	function resetScroll() {
		if( !resizing ) {
			resizing = true;
			(!window.requestAnimationFrame) ? setTimeout(updateParams, 300) : window.requestAnimationFrame(updateParams);
		}
	}

	function updateParams() {
		windowHeight = $(window).height();
		mq = checkMQ();
		$(window).off('scroll', checkRead);
		$(window).off('scroll', checkSidebar);
		
		if( mq == 'desktop') {
			$(window).on('scroll', checkRead);
			$(window).on('scroll', checkSidebar);
		}
		resizing = false;
	}

	function updateArticle() {
		var scrollTop = $(window).scrollTop();

		articles.each(function(){
			var article = $(this),
				articleTop = article.offset().top,
				articleHeight = article.outerHeight(),
				articleSidebarLink = articleSidebarLinks.eq(article.index()).children('a');

			if( article.is(':last-of-type') ) articleHeight = articleHeight - windowHeight;

			if( articleTop > scrollTop) {
				articleSidebarLink.removeClass('read reading');
			} else if( scrollTop >= articleTop && articleTop + articleHeight > scrollTop) {
				var dashoffsetValue = svgCircleLength*( 1 - (scrollTop - articleTop)/articleHeight);
				articleSidebarLink.addClass('reading').removeClass('read').find('circle').attr({ 'stroke-dashoffset': dashoffsetValue });
				changeUrl(articleSidebarLink.attr('href'));
			} else {
				articleSidebarLink.removeClass('reading').addClass('read');
			}
		});
		scrolling = false;
	}

	function updateSidebarPosition() {
		var articlesWrapperTop = articlesWrapper.offset().top,
			articlesWrapperHeight = articlesWrapper.outerHeight(),
			scrollTop = $(window).scrollTop();

		if( scrollTop < articlesWrapperTop) {
			aside.removeClass('fixed').attr('style', '');
		} else if( scrollTop >= articlesWrapperTop && scrollTop < articlesWrapperTop + articlesWrapperHeight - windowHeight) {
			aside.addClass('fixed').attr('style', '');
		} else {
			var articlePaddingTop = Number(articles.eq(1).css('padding-top').replace('px', ''));
			if( aside.hasClass('fixed') ) aside.removeClass('fixed').css('top', articlesWrapperHeight + articlePaddingTop - windowHeight + 'px');
		}
		sidebarAnimation =  false;
	}

	function changeUrl(link) {
		var pageArray = location.pathname.split('/'),
        	actualPage = pageArray[pageArray.length - 1] ;
        if( actualPage != link && history.pushState ) window.history.pushState({path: link},'',link);
	}

	function checkMQ() {
		return window.getComputedStyle(articlesWrapper.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});

