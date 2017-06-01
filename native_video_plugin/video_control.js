//以下所有方法的目标，都要是JS对象，而不是JQ对象
//限制1：color_bar 有个外层包裹的元素

var play_obj = (function() {

	//返回一个函数，执行一下，就产生了闭包，各自有各自的局部全局变量
	return function() {
			//点击音量之后的全局Pos
			var v_global_pos = null,
			v_global_rect = null,
			cur_time = 0,
			sum_time = null,
			video_play_onoff = false,
			start_bar_ball = 0;


			//时间格式函数
			function format_time( time ) {
				h = Math.floor(time / 3600),
				m = Math.floor(( time - h * 3600 ) / 60),
				s = ( time - h * 3600 ) % 60;
				if( m.toString().length === 1 ){
					m =  "0" + m;
				}
				if( s.toString().length === 1 ){
					s =  "0" + s;
				}
				return {
					h:h,
					m:m,
					s:s
				};
			}
			return {
				//设置视频时长逻辑封装，用到了时间格式函数
				//视频目标，总时间目标
				Set_src:function(video_target,sumtime_target) {
					function tempfn() {
						var time = Math.ceil(this.duration),
						time_obj = format_time(time);
						sum_time = time;
						sumtime_target.innerHTML = time_obj.m + ":" + time_obj.s;
						$(video_target).off("canplay",tempfn);
					}
					return {
						start:function(src) {
							video_target.src = src;
							$(video_target).on("canplay",tempfn);
						}
					};
				},
				//播放按钮逻辑的封装 
				//视频目标，按钮目标，当前时间目标，总时间目标，停止播放按钮类名
				Play_box:function(video_target,playbtn_target,curtime_target,sumtime_target,pause_className,play_bar,play_ball) {
					var timer = null;
					//处理函数
					function handler() {
						if( !video_play_onoff ){
							var temp_time = format_time(Math.ceil(video_target.currentTime));
							curtime_target.innerHTML = temp_time.m + ":" + temp_time.s;
							video_play_onoff = !video_play_onoff;
							video_target.play();
							playbtn_target.classList.add(pause_className);
							timer = setInterval(function() {
								cur_time = Math.ceil(video_target.currentTime);
								var temp_time = format_time(cur_time),
								play_pos = (cur_time / sum_time) * parseInt($(play_bar).parent().css("width"));
								curtime_target.innerHTML = temp_time.m + ":" + temp_time.s;
								$(play_ball).css("left",play_pos);
								$(play_bar).css("width",play_pos);
								start_bar_ball = parseInt(play_pos);
								if( video_target.ended ){
									playbtn_target.classList.remove(pause_className);
									video_play_onoff = !video_play_onoff;
									clearInterval(timer);
									timer = null;
									var st_time = setTimeout(function() {
										$(play_ball).css("left",0);
										$(play_bar).css("width",0);
										video_target.currentTime = 0;
										video_target.pause();
										curtime_target.innerHTML = "00:00";
										clearTimeout(st_time);
									}, 100);
								}
							}, 1000);	
						}else{
							video_play_onoff = !video_play_onoff;
							video_target.pause();
							playbtn_target.classList.remove(pause_className);
							clearInterval(timer);
							timer = null;
						}
					}
					//视频目标，播放按钮目标
					return {
						start:function() {
							$(playbtn_target).click(handler);
							$(video_target).click(handler);
						}
					};
				},
				//音量目标点击事件逻辑的封装
				Volume_clickBox:function(direction,control_ball_target,color_bar_target) {
					var color_bar_dir,control_ball_dir;
					if( direction === "level" ){
						color_bar_dir = "height";
						control_ball_dir = "top";
					}
					var volume_num = null,
					color_bar_num = parseInt($(color_bar_target).parent().css(color_bar_dir)),
					control_ball_num = parseInt($(control_ball_target).css(control_ball_dir));
					//音量目标，音量类名，静音类名
					return {
						start:function(video_target,volume_target,default_className,mute_className) {
							$(volume_target).click(function(e) {
								var ev = e || window.event;
								if( ev.target.classList.contains(default_className) ){
									if( ev.target.classList.contains(mute_className) ){
										ev.target.classList.remove(mute_className);
										video_target.volume = volume_num;
									}else{
										ev.target.classList.add(mute_className);
										volume_num = video_target.volume;
										video_target.volume = 0;
									}
									$(color_bar_target).css(color_bar_dir,color_bar_num * video_target.volume);
									$(control_ball_target).css(control_ball_dir,control_ball_num + color_bar_num - (color_bar_num * video_target.volume));
									v_global_pos = control_ball_num + color_bar_num - (color_bar_num * video_target.volume);
									v_global_rect = color_bar_num * video_target.volume;
								}
							});
						}
					};
				},
				//音量滑动逻辑的封装
				V_slide:function(direction,video_target,control_ball_target,color_bar_target) {
					var down_onoff = false,
					down_pos = null,
					//鼠标抬起之后的pos
					temp_Pos = null,
					temp_color_bar_h = null,
					Pos = 0,
					volume_num = 1,
					move_onoff = false,
					ball_down_t = null,
					ev_direction,control_ball_dir,color_bar_dir;
					if( direction === "level" ){
						ev_direction = "screenY";
						control_ball_dir = "top";
						color_bar_dir = "height";
					}else if( direction === "vertical" ){
						ev_direction = "screenX";
						control_ball_dir = "left";
						color_bar_dir = "width";
					}
					return {
						click:function(volume_target,mute_className,default_top) {
							$(color_bar_target).parent().click(function(e) {
								var ev = e || window.event,
								target_h = parseInt($(this).css("height")),
								downY;
								if( ev.target.classList.contains("color_bar") ){
									downY = ev.offsetY + parseInt($(control_ball_target).css("top")) - parseInt(default_top) + parseInt(default_top);
								}else if( ev.target.classList.contains("bar") ){
									downY = ev.offsetY;
								}
								video_target.volume = 1 - (downY / target_h);
								$(control_ball_target).css("top",+default_top + downY);
								$(color_bar_target).css("height",target_h - downY);
								ball_down_t = parseInt($(control_ball_target).css("top"));
								if( volume_target.classList.contains(mute_className) ){
									volume_target.classList.remove(mute_className);
								}
							});
						},
						md:function() {
							$(control_ball_target).mousedown(function(e) {
								down_onoff = true;
								var ev = e || window.event;
								down_pos = ev[ev_direction];
							});
						},
						mm:function(volume_target,mute_className,min,max,bar_height) {
							var _this = this;
							$(window).mousemove(function(e) {
								if( down_onoff ){
									move_onoff = true;
									var ev = e || window.event;
									if( v_global_pos !== null ){
										temp_Pos = v_global_pos;
										v_global_pos = null;
									}
									Pos = ev[ev_direction] - down_pos + temp_Pos;
									if( ball_down_t !== null ){
										Pos = ev[ev_direction] - down_pos + ball_down_t;
									}
									if( Pos < min ){
										Pos = min;
									}else if( Pos > max ){
										Pos = max;
									}
									$(control_ball_target).css(control_ball_dir,Pos);
									volume_num = (max - Pos) / bar_height;
									video_target.volume = (max - Pos) / bar_height;
									if( volume_num === 0 ){
										if( !volume_target.classList.contains(mute_className) ){
											volume_target.classList.add(mute_className);
										}
									}else{
										if( volume_target.classList.contains(mute_className) ){
											volume_target.classList.remove(mute_className);
										}
									}
									_this.bar_handler( color_bar_dir,color_bar_target,bar_height,temp_Pos - Pos );
								}
							});
						},
						mu:function() {
							var _this = this;
							$(window).mouseup(function() {
								if( move_onoff ){
									temp_color_bar_h = parseInt($(color_bar_target).css(color_bar_dir));
								}
								down_onoff = false;
								temp_Pos = parseInt($(control_ball_target).css(control_ball_dir));
								down_pos = Pos = 0;
								ball_down_t = null;
							});
						},
						bar_handler:function(direction,color_bar_target,bar_height,num) {
							if( temp_color_bar_h === null && move_onoff ){
								temp_color_bar_h = bar_height;
							}
							if( v_global_rect !== null ){
								temp_color_bar_h = v_global_rect;
								v_global_rect = null;
							}
							$(color_bar_target).css(direction,num + temp_color_bar_h);
						},
						clearEvent:function() {
							
						}
					};
				},
				//播放进度滑动逻辑的封装
				P_slide:function(direction,video_target,control_ball_target,color_bar_target,curtime_target) {
					var down_onoff = false,
					down_pos = 0,
					down_bar_width = null,
					down_ball_width = null,
					temp_Pos = 0,//鼠标抬起之后的pos
					temp_color_bar_h = null,
					Pos = 0,//结果距离
					move_onoff = false,
					ev_direction,control_ball_dir,color_bar_dir;
					if( direction === "level" ){
						ev_direction = "screenY";
						control_ball_dir = "top";
						color_bar_dir = "height";
					}else if( direction === "vertical" ){
						ev_direction = "screenX";
						control_ball_dir = "left";
						color_bar_dir = "width";
					}
					return {
						click:function() {
							$(color_bar_target).parent().click(function(e) {
								var ev = e || window.event,
								downX = ev.offsetX,
								target_w = parseInt($(this).css("width")),
								down_time = Math.ceil(video_target.duration * downX / target_w),
								temp_time = format_time(down_time);
								video_target.currentTime = down_time;
								curtime_target.innerHTML = temp_time.m + ":" + temp_time.s;
								$(control_ball_target).css("left",downX);
								$(color_bar_target).css("width",downX);
							});
						},
						md:function() {
							$(control_ball_target).mousedown(function(e) {
								down_onoff = true;
								var ev = e || window.event;
								down_pos = ev[ev_direction];
								down_bar_width = parseInt($(color_bar_target).css("width"));
								down_ball_width = parseInt($(control_ball_target).css("left"));
							});
						},
						mm:function(min,max) {
							var _this = this;
							$(window).mousemove(function(e) {
								if( down_onoff ){
									move_onoff = true;
									var ev = e || window.event;
									Pos = ev[ev_direction] - down_pos + temp_Pos;
									if( Pos < min - start_bar_ball ){
										Pos = min - start_bar_ball;
									}else if( Pos > max - start_bar_ball ){
										Pos = max - start_bar_ball;
									}
									$(control_ball_target).css(control_ball_dir,Pos + down_ball_width - temp_Pos);
									_this.bar_handler( color_bar_dir,color_bar_target,Pos - temp_Pos + down_bar_width);
								}
							});
						},
						mu:function(play_btn_target,pause_className) {
							var _this = this;
							$(window).mouseup(function(e) {
								var ev = e || window.event;
								if( move_onoff ){
									temp_color_bar_h = parseInt($(color_bar_target).css(color_bar_dir));
								}
								if( down_onoff ){
									down_onoff = false;
									temp_Pos = parseInt($(control_ball_target).css(control_ball_dir));
									down_pos = Pos = 0;
									video_target.currentTime = temp_Pos / parseInt($(color_bar_target).parent().css("width")) * Math.ceil(video_target.duration);
									var temp_time = format_time(Math.ceil(video_target.currentTime));
									curtime_target.innerHTML = temp_time.m + ":" + temp_time.s;
								}
							});
						},
						bar_handler:function(direction,color_bar_target,num) {
							if( direction === "width" ){
								$(color_bar_target).css(direction,num);
							}else{
								$(color_bar_target).css(direction,num + temp_color_bar_h);
							}
						},
						clearEvent:function() {

						}
					};
				},
				//缓冲处理
				again_load:function(video_target) {
					function canplay_fn() {
						// console.log("可以123123播放了");
						$(video_target).off("canplay",canplay_fn);
					}
					return {
						start:function() {
							video_target.onwaiting = function() {
								// console.log("缓冲中");
								$(video_target).on("canplay",canplay_fn);
							};
						}
					};
				},
				//切换全屏处理
				full_screen:function(video_wrap_target,video_target,control_target,toFull_target,color_bar_wrap_target,close_target,narrow_className) {
					var full_screen_onoff = false,
					//获取不同浏览器下面的全屏方法
					fullScreen_fn = video_wrap_target.requestFullscreen || video_wrap_target.oRequestFullscreen || video_wrap_target.msRequestFullscreen || video_wrap_target.mozRequestFullScreen || video_wrap_target.webkitRequestFullscreen,
					//获取不同浏览器下面的取消全屏方法
					miniScreen_fn = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.webkitExitFullscreen,
					control_h = parseInt($(control_target).css("height")),
					video_box = $($(video_wrap_target).children()[0]),



					video_box_h = parseInt(video_box.css("height")),
					video_wrap_w = parseInt($(video_wrap_target).css("width")),
					video_wrap_t = parseInt($(video_wrap_target).css("top")),
					video_wrap_l = parseInt($(video_wrap_target).css("left")),
					bar_wrap_w = parseInt($(color_bar_wrap_target).css("width")),
					//获取浏览器切换全屏时候触发的事件
					changeFullScreen_fn = null,
					changeFullScreen_fn_names = ["onfullscreenchange","onmozfullscreenchange","onwebkitfullscreenchange","onmsfullscreenchange"];
					//设置changeFullScreen_fn
					$.each(changeFullScreen_fn_names,function(i,el) {
						if( document[el] !== undefined ){
							changeFullScreen_fn = el;
							if( !!el.match(/ms/g) ){
								//倒霉IE的切换全屏事件
								changeFullScreen_fn = "onMSFullscreenChange";
							}
							return false;
						}
					});
					//切换全屏的时候，控制宽高
					function switch_fn() {
						full_screen_onoff = !full_screen_onoff;
						if( full_screen_onoff ){
							$(toFull_target).addClass(narrow_className);
							$(close_target).hide();
							video_box.css("height",screen.height - control_h);
							$(video_wrap_target).css("width",screen.width);
							$(video_wrap_target).css("top",0);
							$(video_wrap_target).css("left",1);
							$(color_bar_wrap_target).css("width",bar_wrap_w / video_wrap_w * 100 + "%");
						}else{
							$(toFull_target).removeClass(narrow_className);
							$(close_target).show();
							video_box.css("height",video_box_h);
							$(video_wrap_target).css("width",video_wrap_w);
							$(video_wrap_target).css("top",video_wrap_t);
							$(video_wrap_target).css("left",video_wrap_l);
							$(color_bar_wrap_target).css("width",bar_wrap_w);
						}
					}
					//监听document的全屏切换事件
					$(document).on(changeFullScreen_fn.slice(2),switch_fn);
					//进入全屏 or 退出全屏
					function fullOrMini_fn() {
						if( !full_screen_onoff ){
							fullScreen_fn.call(video_wrap_target);
						}else{
							miniScreen_fn.call(document);
						}
					}
					return {
						launch:function() {
							$(toFull_target).on("click",fullOrMini_fn);
							$(video_target).on("dblclick",fullOrMini_fn);
						},
					};
				},
				//关闭逻辑
				close_fn:function(close_target,video_wrap_target,video_target,playBtn_target,pause_className) {
					return {
						start:function() {
							$(close_target).click(function() {
								if( playBtn_target ){
									$(playBtn_target).removeClass(pause_className);
								}
								$(video_wrap_target).hide();
								video_play_onoff = false;
								video_target.pause();
								video_target.src = "";
							});
						}
					};
				}

			};
		};

	})();