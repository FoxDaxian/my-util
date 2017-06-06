$(function() {
	//主要映像的一些对象
	var main_v = {
		video_wrap:$(".video")[0],
		video:$(".video .video_wrap video")[0],
		play_btn:$(".video .controls .play_btn")[0],
		sum_time:$(".video .controls .time span")[2],
		cur_time:$(".video .controls .time span")[0],
		v_color_bar:$(".video .controls .volume .volume_control .bar .color_bar")[0],
		v_control_ball:$(".video .controls .volume .volume_control .control_ball")[0],
		volume:$(".video .controls .volume")[0],
		p_color_bar:$(".video .controls .play_bar .bar .color_bar")[0],
		p_color_bar_wrap:$(".video .controls .play_bar .bar")[0],
		p_control_ball:$(".video .controls .play_bar .control_ball")[0],
		to_full:$(".video .controls .toFull")[0],
		control:$(".video .controls")[0],
		close_btn:$(".video .close_btn")[0],
	};


	

	var main_v_obj = play_obj();


	//main_image的video
	//**
	//**
	//**
	//**
	//设置video的src和设置时长
	//视频目标，总时间目标
	var main_image_src = new main_v_obj.Set_src(main_v.video,main_v.sum_time);
	main_image_src.start("http://video.119gold.com/upload/2016/banner/cctvzqbd.mp4");



	//播放按钮实例
	//视频目标，播放按钮，当前时间目标，总时间目标，暂停样式类名,播放条，播放控制球
	var main_image_play = new main_v_obj.Play_box(main_v.video,main_v.play_btn,main_v.cur_time,main_v.sum_time,"play_btn_pause",main_v.p_color_bar,main_v.p_control_ball);
	main_image_play.start();



	//音量滑块实例
	//方向，控制球，控制条
	var main_image_vSlider = new main_v_obj.V_slide("level",main_v.video,main_v.v_control_ball,main_v.v_color_bar);
	//控制球目标
	main_image_vSlider.md(main_v.v_control_ball);
	//视频目标，音量目标，静音类名，控制球Top最小最大值，bar的高
	main_image_vSlider.mm(main_v.volume,"mute",5,105,100);
	//暂停类名
	main_image_vSlider.mu();
	//控制球的初始top
	main_image_vSlider.click(main_v.volume,"mute","5");


	//播放滑块实例
	//方向，控制球，控制条
	var main_image_pSlider = new main_v_obj.P_slide("vertical",main_v.video,main_v.p_control_ball,main_v.p_color_bar,main_v.cur_time);
	//控制球目标
	// main_image_pSlider.md(main_v.p_control_ball);
	// //控制球left最小最大值，bar的宽
	// main_image_pSlider.mm(0,parseInt($(main_v.p_color_bar_wrap).css("width")));
	// //视频目标，播放按钮，暂停类名
	// main_image_pSlider.mu(main_v.play_btn,"play_btn_pause");
	main_image_pSlider.click();




	//音量点击实例
	//方向，控制球目标，控制条目标
	var main_image_volome_click_fn = new main_v_obj.Volume_clickBox("level",main_v.v_control_ball,main_v.v_color_bar);
	//视频目标，音量目标，音量类名，静音类名
	main_image_volome_click_fn.start(main_v.video,main_v.volume,"volume","mute");

	

	//显示缓冲
	var main_image_al = new main_v_obj.again_load(main_v.video);
	main_image_al.start();

	//全屏
	var main_image_fc = new main_v_obj.full_screen(main_v.video_wrap,main_v.video,main_v.control,main_v.to_full,main_v.p_color_bar_wrap,main_v.close_btn,"toMini");
	main_image_fc.launch();

	//关闭视频窗口按钮
	// var main_image_close = new main_v_obj.close_fn(main_v.close_btn,main_v.video_wrap,main_v.video);
	// main_image_close.start();


});