/*--------------------------------------------------------------
	## Variables
--------------------------------------------------------------*/
var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

/*--------------------------------------------------------------
	## UI
--------------------------------------------------------------*/
var ui = {
	init: function(){
		/* Layout */
		ui.layout();		/* 레이아웃 공통 */

		/* Common */
		ui.gnb();			/* GNB */
		ui.mnb();			/* GNB */
		ui.datepicker();	/* Datepicker */
		ui.subCateSticky();
		ui.productSticky();
		ui.aniScroll();		/* Animate Scroll */
		ui.videoPop();
	},

	/*--------------------------------------------------------------
		Layout
	--------------------------------------------------------------*/
	layout: function(){
		function action(){
			var $eleContainer = $('.container');
			var $eleHeader = $('.footer');
			var h_ele = $eleContainer.outerHeight() + $eleHeader.outerHeight();
			var h_win = $(window).height();

			if (h_win > h_ele){ $eleHeader.addClass('is-fixed') }
			else { $eleHeader.removeClass('is-fixed') }
		}
		action()
		$(window).on('resize', function(){ action() });
	},
	/*
		호출함수: Sidebar
	*/
	gnb: function(){
		setTimeout(function(){
			var setTimeLeave = null, setTimeEnter = null, setTimeChild = null;
			var $gnb = $('.gnb');
			var $gnb_menu = $('.node2-menu');

			//Node1 Event
			$gnb.not('.is-entered').on('mouseenter focusin', function(){
				var $this = $(this);
				clearTimeout(setTimeLeave);
				setTimeEnter = setTimeout(function(){
					$this.find('> ul > li').addClass('is-active').find('> a').attr({'aria-expended':'true'});
					$('.header').addClass('is-active');
				}, 300);
			}).addClass('is-entered');
			$gnb.not('.is-leaved').on('mouseleave focusout', function(){
				var $this = $(this);
				clearTimeout(setTimeEnter);
				setTimeLeave = setTimeout(function(){
					$this.find('> ul > li').removeClass('is-active').find('> a').attr({'aria-expended':'false'});
					$('.header').removeClass('is-active');
				});
			}).addClass('is-leaved');

			//Node2 Event
			$gnb_menu.not('.is-entered').on('mouseenter focusin', function(){
				clearTimeout(setTimeChild);
				$(this).parent().siblings().find('.node2-menu').removeClass('is-active');
				$(this).parent().addClass('has-active').siblings().removeClass('has-active');
				$(this).addClass('is-active');
				$(this).parent().next().each(function(){
					console.log($(this).index());
					$('.node2-menu > ul').removeClass('bdr-none');
					$(this).find('.node2-menu > ul').addClass('bdr-none');
				});
			}).addClass('is-entered');
			$gnb_menu.not('.is-leaved').on('mouseleave focusout', function(){
				var $this = $(this);
				setTimeChild = setTimeout(function(){
					$this.removeClass('is-active');
					$this.parent().removeClass('has-active');
					$gnb_menu.find('> ul').removeClass('bdr-none');
				},100);
			}).addClass('is-leaved');
		}, 200);
	},
	gnbSet: function(n1, n2){
		$('.gnb > ul > li').eq(n1).addClass('is-current').siblings().removeClass('is-current');
	},
	/*
		호출함수: MNB
	*/
	mnb: function(){
		$(document).on('click', '.mnb > ul > li > a', function(e){
			e.preventDefault();
			$(this).parent().addClass('is-active').siblings().removeClass('is-active');
		})
	},
	/*
		호출함수: ui.sidebar(id, action, callback)
		호출예시: onclick="ui.sidebar('sidebar', 'open')" / onclick="ui.sidebar('sidebar', 'close')"
	*/
	sidebar: function(id, action, callback){
		var eleModule = '.sidebar',
			eleOpener = '.sidebar-opener',
			eleCloser = '.sidebar-closer',
			eleFocus = 'a, button, [tabindex=0]',
			clsActive = 'is-sidebar-overed', // 덮기 -overed, 밀기 -pushed
			breakpoint = {'min-width':'960'};

		if (action == 'open'){
			var _this = this;
			var $module = $('#'+id);
			$module.show(0, function(){
				$('body').addClass(clsActive);
				$module.one(transitionend, function(){
					$module.find(eleFocus).first().focus();
					if (typeof(callback) === 'function'){ callback }
				});
			});
			dimmer($module, 'dimmer-sidebar', 'open');
		}
		if (action == 'close'){
			var $module = $('#'+id);
			$('body').removeClass(clsActive);
			$module.one(transitionend, function(){
				if (!$('body').hasClass(clsActive)){
					$module.hide(); $(eleOpener).focus();
					console.log('transitionend');
					if (typeof(callback) === 'function'){ callback }
				}
			});
			dimmer($module, 'dimmer-sidebar', 'close');
		}
	},

	/*--------------------------------------------------------------
		Common
	--------------------------------------------------------------*/
	/*
		Datepicker
	*/
	datepicker: function() {
		$('.form-datepicker').each(function(){
			var options = {
				selectYears: true,
				selectMonths: true,
				format: 'yyyy/mm/dd',
				formatSubmit: 'yyyy/mm/dd',
				// min: [2015, 7, 14],
				container: 'body',
				// editable: true,
				closeOnSelect: false,
				closeOnClear: false,
			};
			var $input = $(this).pickadate(options);
			var picker = $input.pickadate('picker');
		})
	},

	/*
		호출함수: ui.tab(id, action)
		호출예시: onclick="ui.tab('tabContent11')"
	*/
	tab: function(id, obj, callback){
		var $button = $('[aria-controls='+id+']'),
			$content = $('#' + id);

		if ($(obj).parent('.swiper-slide').length){
			$(obj).parent().addClass('is-selected').siblings().removeClass('is-selected');
			$(obj).attr({'aria-selected':'true'}).parent().siblings().children().attr({'aria-selected':'false'});
		} else {
			$button.siblings().removeClass('is-selected').removeClass('is-preved').removeClass('is-nexted').attr({'aria-selected':'false'});
			$button.attr({'aria-selected':'true'}).addClass('is-selected');
			$button.next().addClass('is-nexted');
			$button.prev().addClass('is-preved');
		}
		$content.removeAttr('hidden').attr({'aria-hidden':'false'}).siblings().attr({'hidden':'hidden', 'aria-hidden':'true'});
		if (typeof(callback) === 'function'){ callback }
		return false;
	},

	/*
		호출함수: ui.acco(id)
		호출예시: onclick="ui.acco('accoContent11')"
		옵션예시: data-sync="true" data-toggle="true"
	*/
	accordion: function(id, callback){
		var eleModule  = '.acco',
			eleItem = '.acco-item',
			eleButton = '.acco-toggle',
			eleTitle = '.acco-title',
			eleContent = '.acco-content',
			clsActive = 'is-active',
			duration = 300;

		$('.acco-style1').attr({'data-sync':'true', 'data-toggle':'true'});

		var $buttonActive = $('[aria-controls="'+id+'"]'),
			$module = $buttonActive.closest(eleModule),
			$itemActive = $buttonActive.closest(eleItem),
			$itemSiblings = $itemActive.siblings(),
			$contentActive = $('#'+id),
			$contentSiblings = $itemActive.siblings().find(eleContent);

		// Toggle 접기
		if ($module.attr('data-toggle') == 'true' && $itemActive.hasClass(clsActive)){
			$itemActive.removeClass(clsActive);
			$buttonActive.attr({'aria-expanded':'false'});
			//$contentActive.stop().slideUp(duration, function(){ $(this).attr('aria-hidden', 'true') });
			$contentActive.attr('aria-hidden', 'true');
			console.log('1');
			return 'Accordion Toggle Active';
		}
		// Syncroize 펼치기
		else if ($module.attr('data-sync') == 'true' && !$itemActive.hasClass(clsActive)){
			$itemActive.addClass(clsActive).find(eleButton).attr('aria-expanded','true');
			$itemSiblings.removeClass(clsActive).find(eleButton).attr('aria-expanded','false');
			//$contentActive.stop().slideDown(duration, function(){ $(this).attr('aria-hidden', 'false') });
			$contentActive.attr('aria-hidden', 'false');
			//$contentSiblings.stop().slideUp(duration, function(){ $(this).attr('aria-hidden', 'true') });
			$contentSiblings.attr('aria-hidden', 'true');
			console.log('2');
			return 'Accordion Syncroize Active';
		}
		// Default 펼치기
		else if ($module.attr('data-sync') == 'false' && !$itemActive.hasClass(clsActive)){
			$itemActive.addClass(clsActive).find(eleButton).attr('aria-expanded','true');
			//$contentActive.stop().slideDown(duration, function(){ $(this).attr('aria-hidden', 'false') });
			$contentActive.attr('aria-hidden', 'false');
			console.log('3');
			return 'Accordion Default Active';
		} else {
		}
		// Callback
		if (typeof(callback) === 'function'){ callback }
	},

	subCateSticky: function(){
		var $head = $('.sub-body .header');
		var $ele = $('.sub-cate');
		var $eleArea = $('.sub-cate-area');
		var $eleButton = $('.sub-cate .mo-sub .select-cate .btn');
		var $eleListbox = $eleButton.next();

		var reset = function(){
			var ele_top = $eleArea.offset().top;
			var gut_top = $('.header').outerHeight();
			$eleArea.height($ele.outerHeight());
			if ($(window).scrollTop() + gut_top > ele_top){
				$eleArea.addClass('is-sticky');
			} else {
				$eleArea.removeClass('is-sticky');
				$ele.removeAttr('style');
			}
			if($('.sub-body .wrapper').hasClass('scrolled')){
				$head.css({'top':'-100px'});
				$ele.css({'top':'0'});
			}else{
				$head.css({'top':'0'});
				$ele.css({'top':'0'});
			}
			console.log('subcate resized');
		}
		$ele.each(function(){
			$(window).on('resize scroll', function(){ reset() });
		});

		// 클릭이벤트
		$eleButton.on('click', function(){
			$(this).next().show();
			$(this).toggleClass('is-active');

			// 열기
			if ($(this).hasClass('is-active')){
				$eleListbox.removeAttr('hidden');
				$eleButton.attr({'aria-expanded':'true'});
			}

			// 닫기
			else if (!$(this).hasClass('is-active')){
				$eleListbox.attr('hidden', 'hidden');
				$eleButton.attr({'aria-expanded':'false'});
			}

		});

		// 트랜지션이벤트
		$eleListbox.on(transitionend, function(){
			if (!$eleButton.hasClass('is-active')){
				$eleListbox.hide();
			}
		})
	},

	productSticky: function(){
		var $ele = $('.product-wrap .tab-sticky');
		var $eleButton = $ele.find('.tab-item');
		var $eleArea = $ele.closest('.tab-area');
		var reset = function(){
			var ele_top = $eleArea.offset().top;
			var gut_top = $('.header').outerHeight();
			$eleArea.height($ele.outerHeight());
			if ($(window).scrollTop() + gut_top > ele_top){
				$eleArea.addClass('is-sticky');
				if($('.sub-body .wrapper').hasClass('scrolled')){
					$ele.css({'top':0});
				}else{
					$ele.css({'top':gut_top});
				}
			} else {
				$eleArea.removeClass('is-sticky');
				$ele.removeAttr('style');
			}
			console.log('product resized');
		}
		$ele.each(function(){
			$eleButton.on('click', function(e){
				var $eleSection = $($(this).attr('href'));
				var eleTop = $eleSection.offset().top;
				var gutTop = $('.header').height() + $ele.height();
				TweenMax.to($('html, body'), 0.8, {scrollTop:eleTop - gutTop});
				console.log(eleTop + gutTop);
				e.preventDefault();
			});
			$(window).on('resize scroll', function(){ reset() });
		});
	},

	/*
		호출함수: ui.popover(id, action, callback)
		호출예시: onclick="ui.popover('popover1', 'close')"
	*/
	popover: function(id, action, callback){
		var eleWrap = '.popover-area',
			eleModule = '.popover',
			eleOpener = '.popover-opener',
			eleCloser = '.popover-closer';

		if (action == 'open'){
			//초기화
			var $wrapActive = $(eleWrap).find(eleModule).filter('.is-active');
			var idActive = $wrapActive.find(eleButton).attr('aria-controls');
			close(idActive);

			//활성화
			var $popover = $('#'+id);
			var $opener = $(eleOpener+'[aria-controls='+id+']');
			$popover.show(0, function(){
				$(this).addClass('is-active')
				$(this).one(transitionend, function(){
					if ($(this).hasClass('is-active')){
						$(this).removeAttr('hidden').attr({'aria-hidden':'false'}).removeAttr('style');
						$opener.attr({'aria-expanded':'true'});
					}
				})
			});
		}

		else if (action == 'close'){
			var $popover = $('#'+id);
			var $opener = $(eleOpener+'[aria-controls='+id+']');
			$popover.removeClass('is-active');
			$popover.one(transitionend, function(){
				if (!$(this).hasClass('is-active')){
					$(this).attr({'hidden':'hidden', 'aria-hidden':'true'});
					$opener.attr({'aria-expanded':'false'});
				}
			})
		}
	},

	/*
		호출함수: ui.popup(id, obj, action, callback)
		호출예시: onclick="ui.popup('popupCustom1', this, 'close')"
	*/
	popup: function(id, obj, action, callback){
		var eleModule = '.popup-wrap',
			eleOpener = '.popup-opener',
			eleCloser = '.popup-closer',
			eleFocus = '.popup-focus',
			zindex = 1000;

		//열기
		if (action == 'open'){
			var $id = $('#'+id);
			$(obj).attr({'data-popup': id});
			$id.removeAttr('hidden');
			setTimeout(function(){ $id.addClass('is-active'); });
			$id.one(transitionend, function(){
				if ($(this).hasClass('is-active')){
					$(this).find(eleFocus).attr('tabindex','0').focus();
					if (callback){ callback; console.log(callback);}
				}
			});
			dimmer($id, 'dimmer-popup', 'open');
			return console.log('Popup Opened');
		}

		//닫기
		else if (action == 'close'){
			var $id = $('#'+id);
			var $opner = $('[data-popup='+id+']');
			$id.removeClass('is-active');
			$id.one(transitionend, function(){
				if (!$(this).hasClass('is-active')){
					$id.attr('hidden', 'hidden');
					$opner.focus().removeAttr('data-popup');
					if (callback){ callback }
				}
			});
			dimmer($id, 'dimmer-popup', 'close');
			return console.log('Popup Closed');
		}
	},
	videoPopAction: function(fra, $this){
		var wid;
		if ($(window).width() > 768){ wid = $(window).width() * 0.6 }
		else { wid = $(window).width() * 0.8 }
		$(".video-pop").attr("src",fra);
		$('.popup-click').one("click", function(){
			$(".video-pop").attr("src","");
			ui.popup('popupVideo', $this, 'close');
		})
	},
	videoPop: function(){
		$(".video-btn").each(function(){
			var fra;
			var pop_go = function($this){
				ui.popup('popupVideo', $this, 'open', ui.videoPopAction(fra, $this));
			}

			$(this).on("click", function(){
				fra = $(this).find(".src").text();
				pop_go($(this));
			})
		})
	},

	aniScroll: function(){
		/*
		$('.ani-section').each(function(){
			var $this = $(this);
			var action = function(){
				var obj_top = $this.offset().top;
				var dis_gut = $(window).height()/3;
				var win_top = $(document).scrollTop();
				if (win_top + dis_gut > obj_top){
					$this.addClass('is-animated');
				}
			}
			$(window).on('resize scroll', function(){ action() });
			action();
		})
		*/
	},

	/*--------------------------------------------------------------
		Main
	--------------------------------------------------------------*/
	/*
		호출함수: _Object
		호출예시: aria-controls, id 연결방식
	*/
	theme: function(n){
		// 섹션별 테마적용 (수동으로 테마를 지정)
		var name = '';
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 0 ){ name = 'theme-dark' } //메인1 - 스와이프1 배경(가상요소)
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 1 ){ name = 'theme-dark' } //메인1 - 스와이프2 배경
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 2 ){ name = 'theme-dark' } //메인1 - 스와이프3 배경
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 3 ){ name = 'theme-dark' } //메인1 - 스와이프3 배경
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 4 ){ name = 'theme-dark' } //메인1 - 스와이프4 배경
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 5 ){ name = 'theme-dark' } //메인1 - 스와이프5 배경(가상요소)
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 6 ){ name = 'theme-dark' } //메인1 - 스와이프5 배경(가상요소)
		if (n == 0 && $('.main-sec1 .swiper-slide-active').index() == 7 ){ name = 'theme-dark' } //메인1 - 스와이프5 배경(가상요소)
		if (n == 1){ name = 'theme-light' } //메인2 (제품정보)
		if (n == 2){ name = 'theme-dark' } //메인3 (무엇을 도와드릴까요)
		if (n == 3){ name = 'theme-light' } //메인4 (브랜드)
		if (n == 4){ name = 'theme-dark' } //메인5 (기술력)
		if (n == 5){ name = 'theme-light' } //메인5 (에브리봇이야기)

		$('body').removeClass('theme-light').removeClass('theme-dark');
		$('body').addClass(name);

	},
	fullpage: function() {
		var animate = false;
		var sx, ex, sy, ey, direction;
		var $sectionArea = $('.section-area');
		var $content = $('.content');
		var $section = $('.section');

		function event(){
			// 마우스휠
			$('body').on('mousewheel DOMMouseScroll', function(e){
				var E = e.originalEvent;
				if (E.deltaY > 0){ direction = 'down' }
				else if (E.deltaY < 0) { direction = 'up' }
				if ($('body').hasClass('is-sidebar-overed') == false){
					scrolled(direction);
				}
			});

			// 모바일터치
			$sectionArea.on('touchstart', function(e){
				sx = ex = e.originalEvent.touches[0].clientX;
				sy = ey = e.originalEvent.touches[0].clientY;
			});
			$sectionArea.on('touchmove', function(e){
				ex = e.originalEvent.touches[0].clientX;
				ey = e.originalEvent.touches[0].clientY;
			});
			$sectionArea.on('touchend', function(e){
				//console.log('Y:'+ (sy - ey), 'X:'+ (sx - ex));
				if (sy > ey  && sy > ey + 40 && Math.abs(sy - ey) > Math.abs(sx - ex)){ scrolled('down') }
				else if (sy < ey  && sy < ey - 40 && Math.abs(sy - ey) > Math.abs(sx - ex)){ scrolled('up') }
			});
			$('.paging-area .paging-item .paging-point').on('click', function(e){
				$content.removeClass('is-active');
				TweenMax.to($content, 0.3, {y:0})
				action($(this).parent().index());
				e.preventDefault();
			})
		};
		$(document).keydown(function (event) {
		    if (event.keyCode == 38) {
		        console.log('up');
		        scrolled('up');

		    } else if (event.keyCode == 40) {
		        
		        console.log('down');
		        scrolled('down');
		    }
		});
		function scrolled(d){
			var $sec_current = $('.section.is-active'),
				idx_current = $sec_current.index(),
				h_win = $(window).height();

			// 위방향 and 정지상태 and 이전섹션이 있을때
			if (d == 'up' && animate == false){ action(idx_current-1) }

			// 아래방향 and 정지상태 and 다음섹션이 있을때
			if (d == 'down' && animate == false){ action(idx_current+1) }
		}
		function action(n){
			// 섹션 슬라이드인 경우(5개인경우 0~4까지)
			if (n > -1 && n < $section.length && $content.hasClass('is-active') == false){
				//console.log('섹션 슬라이드인 경우', n);
				animate = true;
				$section.eq(n).attr({'aria-selected':'true'}).addClass('is-active').siblings('.section').attr({'aria-selected':'false'}).removeClass('is-active'); //상태값 초기화
				$section.eq(n).addClass('is-animated');
				ui.theme(n); ui.pagination(n);
				setTimeout(function(){ animate = false; $section.eq(n).siblings('.section').removeClass('is-animated') }, 600);
				if (n == 1 && $('.main-sec2').hasClass('is-swipe') == false){
					//console.log(n);
					ui.swiper.mainItem();
					$('.main-sec2').addClass('is-swipe');
				}
			}
			// 푸터 활성화인 경우 (마지막섹션보다클때 and 푸터비활성상태)
			else if (n == $section.length && $content.hasClass('is-active') == false){
				//console.log('마지막섹션 다음 푸터활성화 하는 경우', n);
				/*
				animate = true;
				var h_footer = $('.footer').outerHeight() * -1;
				TweenMax.to($content, 0.3, {y:h_footer, onComplete:function(){
					animate = false;
					$content.addClass('is-active');
					$('.footer').css('z-index','103');
				}})
				*/
			}
			// 푸터 비활성화인 경우
			else if (n > -1 && n < $section.length && $content.hasClass('is-active') == true){
				//console.log('푸터활성화 다음 섹션활성화 하는 경우', n);
				/*
				$('.footer').css('z-index','0');
				animate = true;
				TweenMax.to($content, 0.3, {y:0, onComplete:function(){
					animate = false;
					$content.removeClass('is-active');	
				}})
				*/
			}
		}
		event();
	},
	pagination: function(n){
		var total = $('.paging-area .paging-item').length;
		var $item = $('.paging-area .paging-item').eq(n);
		var $lineH = 100 / (total - 1);
		var lineLens = ($lineH * n) - 100;
		$item.addClass('is-current').addClass('is-active').siblings().removeClass('is-active');
		$item.prevAll().addClass('is-current');
		$item.nextAll().removeClass('is-current');
		$('.paging-area .paging-line span').css('transform', 'translateY('+lineLens+'%)');
	},
	swiper: {
		mainProfile: function(){
			var swiper;
			var mySswiper = '.swiper-main-profile ';
			var swiperContent = function(idx){
				var $active = $(mySswiper + '.swiper-content').eq(idx);
				//console.log(idx);
				$active.addClass('is-active').siblings('.swiper-content').removeClass('is-active');
			}
			$(mySswiper+ '.swiper-pagination').addClass('is-active');
			setTimeout(function(){
				swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 1,
					speed: 1000,
					loop: true,
					followFinger: false,
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					keyboard: {
					    enabled: true,
					    onlyInViewport: false,
					},
					navigation: {
						nextEl: mySswiper+ '.swiper-button-next',
						prevEl: mySswiper+ '.swiper-button-prev',
					},
					on: {
						slideChangeTransitionStart: function(){
							// 테마에서 클래스설정 (배경 스와이프는 기본값으로 호출)
							var idx = $(mySswiper).find('.swiper-slide-active').index();
							ui.theme($('.main-wrap .section.is-active').index());
							swiperContent(idx);
							$(mySswiper+ '.swiper-pagination').removeClass('is-active');
							setTimeout(function(){ $(mySswiper+ '.swiper-pagination').addClass('is-active') },50);
						},
					}
				});
			},900)
		},
		mainItem: function(){
			var swiper;
			var mySswiper = '.swiper-main-item ';
			var bgArea = function(idx){
				var $active = $('.main-sec2 .bg-area .bg').eq(idx);
				$active.addClass('is-active').siblings().removeClass('is-active');
				$active.stop().fadeIn(300, function(){
					$active.siblings().stop().fadeOut();
				});

			}
			$(mySswiper+ '.swiper-pagination').addClass('is-active');
			setTimeout(function(){
				swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 1,
					followFinger: false,
					autoplay: {
						delay: 6000,
						disableOnInteraction: false,
					},
					on: {
						init: function(){
							//$(".main-sec2 .btn-more").addClass("is-hide");
						},
						slideChangeTransitionStart: function(){
							var idx = $(mySswiper).find('.swiper-slide-active').index();
							$(mySswiper).find('.tab-nav button').eq(idx).trigger('click');
							$(mySswiper+ '.swiper-pagination').removeClass('is-active');
							setTimeout(function(){ $(mySswiper+ '.swiper-pagination').addClass('is-active') },100);
							bgArea(idx);
							/*
							if (swiper.activeIndex == 0) {
								$(".main-sec2 .btn-more").addClass("is-hide");
							} else {
								$(".main-sec2 .btn-more").removeClass("is-hide");
							}
							*/
						},
						resize: function(){
							setTimeout(function(){ swiper.update() }, 300);
						}
					},
				});
			}, 200);
			$(mySswiper).find('.tab-nav button').off('click').on('click', function(){
				var idx = $(this).index();
				$(this).addClass('is-selected').siblings().removeClass('is-selected').removeClass('is-preved').removeClass('is-nexted');
				$(this).next().addClass('is-nexted');
				$(this).prev().addClass('is-preved');
				swiper.slideTo(idx);
				bgArea(idx);
			});
		},
		mainBrand: function(){
			var mySswiper = '.swiper-main-brand ';
			var swiper = new Swiper(mySswiper+ '.swiper-container', {
				slidesPerView: 1,
				pagination: {
					el: mySswiper+ '.swiper-pagination',
				},
				on: {
					slideChangeTransitionStart: function(){
						// 테마에서 클래스설정 (배경 스와이프는 기본값으로 호출)
						ui.theme($('.main-wrap .section.is-active').index());
					},
				}
			});
		},
		mainStory: function(){
			var swiper;
			var setTime;
			var swiping = function(){
				// 스와이프 플러그인
				swiper = new Swiper('.swiper-main-story .swiper-container', {
					slidesPerView:'auto',
					slidesPerGroup: 1,
					loop: true,
					//effect: 'fade',

					speed: 800,
					spaceBetween: 10,
					//watchSlidesVisibility: true,
					navigation: {
						nextEl: '.main-sec6 .swiper-button-next',
						prevEl: '.main-sec6 .swiper-button-prev',
					},
					
					// breakpoints: {
					// 	768: {
					// 		slidesPerView:2,
					// 	},
					// 	769: {
					// 		slidesPerView:'auto',
					// 	},
					// },
					
					on: {

						resize: function(){
							setTimeout(function(){ swiper.update() }, 300);
						},
						
					}
				});
			}
			swiping();
		},
		mainPop: function(){
			var swiping = function(){
				var mySswiper = '.swiper-pop';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					autoplay: true,
					spaceBetween: 20,
					speed: 800,
					pagination: {
					   el: '.swiper-pagination',
					   clickable: true,
					},
					navigation: {
				        nextEl: '.swiper-button-next',
				        prevEl: '.swiper-button-prev',
				    },
				});
			}
			swiping();
		},
		csItems: function(){
			var swiping = function(){
				var mySswiper = '.swiper-guide';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 4,
					loop: false,
					speed: 800,
					spaceBetween: 0,
					navigation: {
				        nextEl: '.swiper-button-next',
				        prevEl: '.swiper-button-prev',
				    },
					breakpoints: {
						768: {
							slidesPerView: 3,
						},
						769: {
							slidesPerView: 4,
						},
					},
				});
			}
			swiping();
		},
		faqItems: function(){
			var swiping = function(){
				var mySswiper = '.swiper-faq';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 6,
					loop: false,
					speed: 800,
					spaceBetween: 1,
					navigation: {
				        nextEl: '.swiper-button-next',
				        prevEl: '.swiper-button-prev',
				    },
					breakpoints: {
						768: {
							slidesPerView: 3,
						},
						769: {
							slidesPerView: 6,
						},
					},
				});

			}
			swiping();
		},
		investItems: function(){
			var swiping = function(){
				var mySswiper = '.swiper-invest';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 5,
					loop: false,
					speed: 800,
					spaceBetween: 1,
					breakpoints: {
						768: {
							slidesPerView: 3,
						},
						769: {
							slidesPerView: 5,
						},
					},
				});

			}
			swiping();
		},
		cleaner3i: function(){
			var galleryThumbs = new Swiper('.page-3i', {
				  spaceBetween: 0,
				  slidesPerView: 5,
				  loop: false,
				  touchRatio: 0,
				  freeMode: true,
				  loopedSlides: 5, //looped slides should be the same
				  watchSlidesVisibility: true,
				  watchSlidesProgress: true,
			});
			var galleryTop = new Swiper('.swiper-3i', {
				  effect: 'fade',
				  spaceBetween: 0,
				  loop:false,
				  loopedSlides: 5, //looped slides should be the same
				  thumbs: {
				    swiper: galleryThumbs,
				  },
			});
		},
		cleaner3iPop: function(){
			var itemHeader = new Swiper('.swiper-item-header', {
				  effect: 'fade',
				  spaceBetween: 0,
				  loop:false,
				  loopedSlides: 2, //looped slides should be the same
					pagination: {
					   el: '.swiper-pagination',
					   clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
			});
		
		},
		tblItems2: function(){
			var swiping = function(){
				var mySswiper = '.swiper-tbl-2';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 2,
					loop: false,
					speed: 800,
					spaceBetween: 0,
				});

			}
			swiping();
		},
		tblItems3: function(){
			var swiping = function(){
				var mySswiper = '.swiper-tbl-3';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 3,
					loop: false,
					speed: 800,
					spaceBetween: 0,
					breakpoints: {
						768: {
							slidesPerView: 2,
							pagination: {
						        el: '.swiper-pagination',
						        type: 'progressbar',
						      },
						},
						769: {
							slidesPerView: 3,
						},
					},
				});

			}
			swiping();
		},
		tblItems5: function(){
			var swiping = function(){
				var mySswiper = '.swiper-tbl-5';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 5,
					loop: false,
					speed: 800,
					spaceBetween: 0,
					breakpoints: {
						768: {
							slidesPerView: 2,
							pagination: {
						        el: '.swiper-pagination',
						        type: 'progressbar',
						      },
						},
						769: {
							slidesPerView: 5,
						},
					},
				});

			}
			swiping();
		},
		cleanerItems: function(){
			var swiping = function(){
				var mySswiper = '.swiper-cleaner';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 2,
					loop: false,
					speed: 800,
					pagination: {
						el: mySswiper+ ' .swiper-pagination',
					},
					breakpoints: {
						768: {
							slidesPerView: 1,
						},
						769: {
							slidesPerView: 2,
						},
					},
				});
			}
			swiping();
		},
		everybotTech51: function(){
			var swiping = function(){
				var mySswiper = '.swiper-tech51 ';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 1,
					loop: false,
					autoplay: true,
					speed: 800,
					/*
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					*/
					pagination: {
						el: mySswiper+ '.swiper-pagination',
					},
					navigation: {
						nextEl: mySswiper+ ' .swiper-button-next',
						prevEl: mySswiper+ ' .swiper-button-prev',
					},
					on: {
						init: function(){
							//$('.swiper-slide-active').addClass('is-animated');
						},
						slideChangeTransitionStart: function(){
							//$('.swiper-slide-active').addClass('is-animated');
						},
						slideChangeTransitionEnd: function(){
							//$('.swiper-slide-active').siblings('.swiper-slide').removeClass('is-animated');
						},
					}
				});
				$(mySswiper+' .swiper-pagination-bullet').append('<span>');
			}
			swiping();
		},
		everybotTech52: function(){
			var swiping = function(){
				var mySswiper = '.swiper-tech52 ';
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 1,
					loop: false,
					speed: 800,
					autoplay: true,
					/*
					autoplay: {
						delay: 4000,
						disableOnInteraction: false,
					},
					*/
					pagination: {
						el: mySswiper+ '.swiper-pagination',
					},
					navigation: {
						nextEl: mySswiper+ ' .swiper-button-next',
						prevEl: mySswiper+ ' .swiper-button-prev',
					},
					on: {
						init: function(){
							//$('.swiper-slide-active').addClass('is-animated');
						},
						slideChangeTransitionStart: function(){
							//$('.swiper-slide-active').addClass('is-animated');
						},
						slideChangeTransitionEnd: function(){
							//$('.swiper-slide-active').siblings('.swiper-slide').removeClass('is-animated');
						},
					}
				});
				$(mySswiper+' .swiper-pagination-bullet').append('<span>');
			}
			swiping();
		},
		productAll: function(){
			var swiping = function(){
				var mySswiper = '.swiper-pdtAll ';
				var swiperReset = function(){
					$(mySswiper+ '.swiper-slide').each(function(){
						$(this).css('height', 'auto');
						var h = $(this).height();
						setTimeout(function(){ $(this).css({height: h}) }, 0);
					});
				}
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 3,
					spaceBetween: 30,
					pagination: {
						el: mySswiper+ '.swiper-pagination',
					},
					breakpoints: {
						599: {
							slidesPerView: 1,
							followFinger: true,
						},
						600: {
							slidesPerView: 2,
							followFinger: true,
						},
						1023: {
							slidesPerView: 2,
							followFinger: true,
						},
						1024: {
							slidesPerView: 3,
							followFinger: false,
						},
					},
					on: {
						init: function(){
							swiperReset();
						},
						resize: function(){
							swiperReset();
						}
					}
				});
			}
			swiping();
		},
		productAll_robot: function(){
			var swiping = function(){
				var mySswiper = '.robot-pdtAll ';
				var swiperReset = function(){
					$(mySswiper+ '.swiper-slide').each(function(){
						$(this).css('height', 'auto');
						var h = $(this).height();
						setTimeout(function(){ $(this).css({height: h}) }, 0);
					});
				}
				var swiper = new Swiper(mySswiper+ '.swiper-container', {
					slidesPerView: 1,
				});
			}
			swiping();
		}
	}
}

$(document).ready(function(){
	dv.init();   // 기기체크 - pub_device.js
	ui.init();   // 모듈공통 - pub_ui.js

});
$(window).on('resize', function(){
	if ($('body').hasClass('is-sidebar-overed') && $(window).width() > 1024){
		ui.sidebar('sidebar', 'close');
	}
});
$(document).on("click focusin", function(e){
	var $subCateMobile = $('.sub-cate .mo-sub');
	if ($subCateMobile.has(e.target).length == 0){
		$subCateMobile.find('.select-cate .btn').removeClass('is-active');
	}
});

//layer popup close, cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function couponClose() {
//    if ($("input[name='popCheck']").is(":checked") == true) {
//        setCookie("close", "Y", 1);
//    }
    $(".layerPopup").hide();
}
function coupondayClose() {
    setCookie("close", "Y", 1);
    $(".layerPopup").hide();
}
$(document).ready(function () {
    cookiedata = document.cookie;
    if (cookiedata.indexOf("close=Y") < 0) {
        $(".layerPopup").show();
    } else {
        $(".layerPopup").hide();
    }
    $(".btn-popupClose").click(function () {
        couponClose();
    });
    $(".btn-popupdayClose").click(function () {
        coupondayClose();
    });
});

$(document).ready(function () {
	//window.onload = function () {
		$('#loading').hide();  
	//}
	coreSkipTop();
});

//Top 버튼 노출
function coreSkipTop() {

	var bodyHeight = $('body').height();
	var bodyOffset = bodyHeight * 0.2;

	var skipTopHTML = '<div class="skip_topBtn" style="display:none"><button type="button" class="btn-tv-schedule popup-opener" aria-controls="popupSchedule" aria-haspopup="dialog" title="홈쇼핑일정"></button><a href="#" id="btnSkipTop" title="상단으로 이동" class="top">상단으로 이동</a></div>';
	var skipTopMainHTML = '<div class="skip_topBtn"><button type="button" class="btn-tv-schedule popup-opener" aria-controls="popupSchedule" aria-haspopup="dialog" title="홈쇼핑일정"></button></div>';



	if ( !$('body').find('.skip_topBtn').length )
	{	
		if ($('body').hasClass('main-body')){
				$('body').append(skipTopMainHTML);
		} else {
				$('body').append(skipTopHTML);
		}

	}


	var skipTopBtn = $('.skip_topBtn');

	$(window).scroll(function(){
		var windowY = $(window).scrollTop(); 
		if (bodyOffset < windowY){
			$(skipTopBtn).fadeIn();
		}
		else {
			$(skipTopBtn).hide();
		}
	});

	$('#btnSkipTop').bind('click', function(){
		$('body, html').animate({ scrollTop: 0 }, 200);
		return false;
	});

	
	$('.btn-tv-schedule').bind('click', function(){
		$('#popupSchedule').css('z-index','');
	});
}

//유튜브 레이어 팝업
$(document).ready(function () {
	/*$(".popupVideo a").click(function() {
	  $(".video-popup").addClass("reveal"),
	  $(".video-popup .video-wrapper").remove(),
	  $(".video-popup").append("<div class='video-wrapper'><iframe width='560' height='315' src='https://youtube.com/embed/" + $(this).data("video") + "?rel=0&playsinline=1&autoplay=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>")
	});*/
	$(".video-popup-closer").click(function() {
	  $(".video-popup .video-wrapper").remove(),
	  $(".video-popup").removeClass("reveal")
	});
	
	
	//ThumbName Click Event
	$(".video-list a").on('click', function(e){
		var $this = $(this),
			dataVideo = $this.attr("data-video"),
			$text = $this.next("input").attr("value"),
			$li = $this.parent(),
			$mainVideo = $this.closest(".video-area").prev(".main-video").find("a"),
			$mainText = $this.closest(".video-area").prev(".main-video").find(".tit-subject");
		
		$mainVideo.attr("data-video",dataVideo);
		$mainText.text($text);
		var $mainImg = $this.closest(".video-area").prev(".main-video").find("img");
		$mainImg.attr('src','https://img.youtube.com/vi/' + dataVideo + '/maxresdefault.jpg');
				
		
		$li.addClass("is-active").siblings().removeClass("is-active");
	})
	
	// pop movie Click Event
	$(".video-img a, .ex-video-list a").on('click', function(e){
		var dataVideo = $(this).attr("data-video");
		$(".video-popup").addClass("reveal"),
		$(".video-popup .video-wrapper").remove(),
		$(".video-popup").append("<div class='video-wrapper'><iframe width='560' height='315' src='https://youtube.com/embed/" + dataVideo + "?rel=0&playsinline=1&autoplay=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>")

	})

	
});

//홈쇼핑 레이어팝업
$(document).ready(function () {

	$(".btn-tv-schedule").on('click', function(e){
		ui.popup('popupSchedule', this, 'open');
	})
	
});
//MNB active depth1 (active subMenu)
var mnbNum;
function setMnb(mn){
	$('.mnb li.has-expand').removeClass('is-active');
	$('.mnb li.has-expand').eq(mn).addClass('is-active');
	
	mnbNum = $('.mnb li.has-expand.is-active').index('.lnb li.has-expand');
	console.log('mnbNum is ' + mnbNum);
}

//sub Header Toggle
$(document).ready(function () {
	function hn() {
		// hide nav on scroll
		//$('.navbar-over, .navbar').removeClass('open');
		$('.wrapper').addClass('scrolled');
	}
	function sn() {
		// show nav on scroll
		$('.wrapper').removeClass('scrolled');
	}
	function hasScrolled(){
		var prevSc = 0, 
			navHeight = $('.header').height();
		$(window).on({
			scroll: function() {
				var documentHeight = $(document).height(),
					winHeight = $(window).height(),
					st = $(window).scrollTop();
				
				// calculate up-scroll and hide / show nav
				if ( st < navHeight + 250 || st + winHeight >= documentHeight + 10 ) {
				// either we're past the height of the nav, or 200px off the bottom
					sn();
				}
				else {
					if ( st > prevSc ) {
						hn(); 
						return false;
					}
					else {
						sn();
						return false;
					}
				}
				prevSc = st;
			},
			resize: function() {

			}
		});
		//console.log("hasScrolled");
	}
	var ww = $(window).width();
	 //if (ww < 768){
      hasScrolled();
     //}
		
});

// Change Input File Path
function setFilePath(el) {
	var $el = $(el);
	
	$(".input_filePath").val($el.val());
}