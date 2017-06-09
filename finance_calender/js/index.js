window.onload = function() {

	// record the last date to reset calender
	var lastDate = null;//一个是点开的时候没选择记录一下，一个是选择之后记录一下
	//calender mini box
	var miniCalender = document.querySelector('.tabs .calender .showCalenderBtn span');
	//calender show
	document.querySelector('.tabs .calender .showCalenderBtn span').onclick = function(e) {
		var ev = e || window.event;
		if( lastDate ){
			calender.month = parseInt(lastDate.month);
			calender.year = parseInt(lastDate.year);
			calender.firstDay = (new Date( calender.year, calender.month, 1 )).getDay();
			calenderBox.innerHTML = calender.render().el.outerHTML;
		}
		calenderBox.style.display = "block";
		lastDate = {
			year:calender.year,
			month:calender.month,
		};
		ev.stopPropagation();
		return false;
	}
	//calender
	var calenderBox = document.querySelector('.tabs .calender .showCalenderBtn .calenderBox');
	//init calender
	calenderBox.innerHTML = calender.render().el.outerHTML;

	miniCalender.innerHTML = calender.year + "年" + addZero(calender.month + 1) + "月" + addZero(calender.now) + "日";
	
	//click function of calender
	calenderBox.onclick = function( e ) {
		var ev = e || window.event;
		var clickObj;
		if( ev.target.classList.contains("l_btn")){
			var arg = {
				year : (calender.month - 1) < 0 ? (calender.year - 1) : calender.year,
				month : (calender.month - 1) < 0 ? 11 : calender.month - 1,
			}

			clickObj = calender.render(arg);
			calenderBox.innerHTML = clickObj.el.outerHTML;
		}
		if( ev.target.classList.contains("r_btn")){
			var arg = {
				year : (calender.month + 1) > 11 ? (calender.year + 1) : calender.year,
				month : (calender.month + 1) > 11 ? 0 : calender.month + 1,
			}
			clickObj = calender.render(arg);
			calenderBox.innerHTML = clickObj.el.outerHTML;
		}
		if( ev.target.tagName.toLowerCase() === "li" && ev.target.classList.contains('selectable') ){
			var data = {
				year:calender.year,
				month:calender.month + 1,
				day:ev.target.innerHTML
			};

			//for normal switching with sevenDay, so initialize Index
			Index = 0;

			//change sevenDay
			sevenDay.innerHTML = "";
			date = new Date(data.year + "-" + (data.month) + "-" + parseInt(data.day));
			sevenDayRender();
			calenderBox.style.display = "none";
			
			//change calender
			calender.now = parseInt(data.day);
			calender.month = parseInt(data.month - 1);
			calender.year = parseInt(data.year);
			calender.selectMonth = parseInt(data.month - 1);
			calender.selectYear = parseInt(data.year);
			calenderBox.innerHTML = calender.render().el.outerHTML;

			//save last date
			lastDate = {
				year:parseInt(data.year),
				month:parseInt(data.month - 1),
			};

			// change miniCalender
			miniCalender.innerHTML = data.year + "年" + addZero(data.month) + "月" + addZero(data.day) + "日";
			console.log(data);
		}
		if( ev.target.classList.contains("closeBtn")){
			calenderBox.style.display = "none";
		}
		ev.stopPropagation();
		return false;
	}

	//click event to close calender by window trigger
	window.addEventListener("click", function(e) {
		var ev = e || window.event;
		calenderBox.style.display = "none";
	});





	//sevenDay part
	var sevenDay = document.querySelector('.tabs .calender .oneWeek .sevenDay'),
	prev_btn = document.querySelector('.tabs .calender .oneWeek .prev_btn'),
	next_btn = document.querySelector('.tabs .calender .oneWeek .next_btn'),
	date = new Date(),//sevenDay main date, change other by this
	weekArr = ["周日","周一","周二","周三","周四","周五","周六"],
	Index = 0,
	element;

	var elementArr = [null,null,null,null,null,null,null];
	
	sevenDayRender()
	
	/**
	 * generation seven day
	 * @param  {number} index up or low date
	 * @return {object}       current time
	 */
	 function sevenDayRender( index ) {
	 	index = index || 0;
	 	weekArr.forEach(function( el, i ) {
	 		if( el === null ){
	 			return false;
	 		}

	 		var tempDate;

			// to change the order of dates, make sure it's always Sunday to Monday
			( date.getDay() >= 2 ) && ( i === 6 ) && (i = -1);
			( date.getDay() >= 3 ) && ( i === 5 ) && (i = -2);
			( date.getDay() >= 4 ) && ( i === 4 ) && (i = -3);
			( date.getDay() >= 5 ) && ( i === 3 ) && (i = -4);
			( date.getDay() >= 6 ) && ( i === 2 ) && (i = -5);

			//generation date
			tempDate = (new Date(date.getTime() + i  * 24 * 60 * 60 * 1000 + index * 7  * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000))

			var weeks = tempDate.getDay(),
			year = tempDate.getFullYear(),
			month = addZero(tempDate.getMonth() + 1),
			day = addZero(tempDate.getDate());
			element = document.createElement("div");
			element.classList.add("day");

			weeks = judgeWeek(weeks);

			if( date.getTime() === tempDate.getTime() ){
				elementArr[tempDate.getDay()] = "<div class='day dayActive' data-year='" + year + "' data-month='" + (tempDate.getMonth() + 1) + "' data-day='" + tempDate.getDate() + "'>周" + weeks + " " + month + "/" + day + "</div>";
			}else{
				elementArr[tempDate.getDay()] = "<div class='day' data-year='" + year + "' data-month='" + (tempDate.getMonth() + 1) + "' data-day='" + tempDate.getDate() + "'>周" + weeks + " " + month + "/" + day + "</div>";
			}
			
			if( date.getTime() === tempDate.getTime() ){
				element.classList.add("dayActive");
			}
			
		});
	 	elementArr.forEach(function( el, i ) {
	 		sevenDay.innerHTML += el;
	 	});
	 }

	 prev_btn.onclick = function() {
	 	sevenDay.innerHTML = "";
	 	sevenDayRender(--Index);
	 }
	 next_btn.onclick = function() {
	 	sevenDay.innerHTML = "";
	 	sevenDayRender(++Index);;
	 }

	// sevenDay click event 
	sevenDay.onclick = function(e) {
		var ev = e || window.event;
		if( ev.target.classList.contains("day") ){
			var day = ev.target.dataset.day,
			month = ev.target.dataset.month,
			year = ev.target.dataset.year;

			//change sevenDay
			sevenDay.innerHTML = "";
			//in IE must use "/" to join year month and day
			date = new Date(year + "/" + month + "/" + parseInt(day));
			sevenDayRender();

			//change calender
			calender.now = parseInt(day);
			calender.month = parseInt(month - 1);
			calender.year = parseInt(year);
			calender.firstDay = (new Date( calender.year,calender.month,1 )).getDay();
			calender.selectMonth = parseInt(month - 1);
			calender.selectYear = parseInt(year);

			//save last time date
			lastDate = {
				year:calender.year,
				month:calender.month,
			};

			// change miniCalender
			miniCalender.innerHTML = year + "年" + addZero(month) + "月" + addZero(day) + "日";

			calenderBox.innerHTML = calender.render().el.outerHTML;
			console.log({
				year:year,
				month:month,
				day:day,
			});
		}
	}


	//filter show/hidden
	document.querySelector('.tabs .calender .filterBtn').onclick = function() {
		document.querySelector('.tabs .filter').style.height = "41px";
		document.querySelector('.tabs .filter').style.color = "#f0f0f0";
	}



	


	//calender detail render
	
	//fixed data
	var detailTitleData = [{
		className:"date",
		text:"时间"
	},{
		className:"country",
		text:"国家"
	},{
		className:"event",
		text:"事件"
	},{
		className:"important",
		text:"重要性"
	},{
		className:"todayValue",
		text:"今值"
	},{
		className:"expect",
		text:"预期"
	},{
		className:"preValue",
		text:"前值"
	},{
		className:"tempShowDiv",
		text:""
	}];

	//ajax data, the total amount of data is constant to three
	var ajaxData = [{
		date:"xxx时间",
		data:[{
			date:"待定",
			country:"imgs/nationalFlag.png",
			event:"韩国  |  休市一日韩国  |韩国  |  休市一日韩国  |韩国  |  休市一日韩国",
			important:"imgs/starLevel0.png",
			todayValue:"--",
			expect:"56.70",
			preValue:"89.70",
			tempShowDiv:""
		}]
	},{
		date:"xxx时间",
		data:[{
			date:"待定",
			country:"imgs/nationalFlag.png",
			event:"韩国  |  休市一日韩国  |韩国  |  休市一日韩国  |韩国  |  休市一日韩国",
			important:"imgs/starLevel0.png",
			todayValue:"--",
			expect:"56.00",
			preValue:"89.70",
			tempShowDiv:""
		},{
			date:"待定",
			country:"imgs/nationalFlag.png",
			event:"韩国  |  休市一111111111日韩国  |韩国  |  休市一日韩国  |韩国  |  休市一日韩国",
			important:"imgs/starLevel0.png",
			todayValue:"--",
			expect:"56.71",
			preValue:"89.70",
			tempShowDiv:""
		}]
	},{
		date:"xxx时间",
		data:[{
			date:"待定",
			country:"imgs/nationalFlag.png",
			event:"韩国  |  休市一日韩国  |韩国  |  休市一日韩国  |韩国  |  休市一日韩国",
			important:"imgs/starLevel0.png",
			todayValue:"--",
			expect:"56.72",
			preValue:"89.70",
			tempShowDiv:""
		}]
	}];


	//calender detail lists ajax data
	var listAjaxData = [{
		date:new Date( Date.now() - 24  * 60 * 60 * 1000 ),
		calEvent:9,
		holidayNotice:2
	},{
		date:new Date(),
		calEvent:9,
		holidayNotice:2
	},{
		date:null,
		calEvent:0,
		holidayNotice:0
	}];

	//可以让 currentCalenderIndex 固定不变， 然后点击时候去获取数据， 改变数据，这样就会保持居中了	
	//不好搞动画效果，不然就别搞动画效果了，点击跳转刷新吧
	//还差echars图表

	//current calender index
	var currentCalenderIndex = 1;
	

	//calender detail lists
	//API 生成calender选择的tab 并 调用 renderCalenderDetail方法
	//参数：所有的tab元素  数据
	function renderCalenderTabs( tabsEl, data ) {
		[].slice.call(tabsEl).forEach(function( el, i ) {

			var timeEl = document.createElement("div");
			timeEl.classList.add("time");

			var spanEl = document.createElement("span");
			//below for click function 
			spanEl.classList.add("forClick");
			spanEl.setAttribute("data-id",i)
			//stop here
			if( data[i].date === null ){
				spanEl.innerHTML =  "暂无数据";
				spanEl.setAttribute("data-click",false)
			}else{
				var m = data[i].date.getMonth() + 1,
				d = data[i].date.getDate(),
				w = data[i].date.getDay();
				
				spanEl.innerHTML = "周" + judgeWeek(w) + " " + addZero(m) + "/" + addZero(d);
			}

			//assignment time
			spanEl.setAttribute("data-date",data[i].date);
			
			var clickShowContentEl = document.createElement("div");
			clickShowContentEl.classList.add("clickShowContent");


			if( currentCalenderIndex !== i ){
				clickShowContentEl.classList.add("clickShowNone");
			}else{
				el.classList.add("threeListActive");
			}
			var calEventEl = document.createElement("div");
			calEventEl.classList.add("calEvent");
			calEventEl.innerHTML = "财经大事: <span>" + data[i].calEvent + "</span>";

			var holidayNoticeEl = document.createElement("div");
			holidayNoticeEl.classList.add("holidayNotice");
			holidayNoticeEl.innerHTML = "假期预告: <span>" + data[i].holidayNotice + "</span>";

			//append to clickShowContentEl
			clickShowContentEl.appendChild(calEventEl);
			clickShowContentEl.appendChild(holidayNoticeEl);

			//append to timeEl
			timeEl.appendChild(spanEl);
			timeEl.appendChild(clickShowContentEl);

			//preappend to tabsEl[i]
			el.insertBefore(timeEl,el.childNodes[0]);

		});

		// current select date element 当前选择日期的详细列表，包含图表的
		var calenderDetailBox = document.querySelector('.calenderDetail .threeListActive .calenderDetailBox');
		renderCalenderDetail( calenderDetailBox, ajaxData );
	}
	
	var threeLists = document.querySelectorAll('.calenderDetail .threeList');
	renderCalenderTabs( threeLists, listAjaxData );


	// click to rerender charts
	var chartsBox = document.querySelector('.calenderDetail');
	chartsBox.onclick = function( e ) {
		var ev = e || window.event;
		if( ev.target.classList.contains("forClick") ){
			if( ev.target.dataset.click === "false" ){
				return false;
			}
			currentCalenderIndex = parseInt(ev.target.dataset.id);


			[].slice.call(threeLists).forEach(function( el, i ) {
				el.classList.contains("threeListActive") && el.classList.remove("threeListActive");
				var lineEl = document.createElement("div");
				lineEl.classList.add("line");
				var calenderDetailBoxEl = document.createElement("div");
				calenderDetailBoxEl.classList.add("calenderDetailBox");

				el.innerHTML = "";

				el.appendChild(lineEl);
				el.appendChild(calenderDetailBoxEl);


			});
			renderCalenderTabs( threeLists, listAjaxData );

			console.log({
				year: (new Date(ev.target.dataset.date)).getFullYear(), 
				month: (new Date(ev.target.dataset.date)).getMonth() + 1, 
				day: (new Date(ev.target.dataset.date)).getDate()
			});
		}
	}





	//规定的API：要渲染的元素，数据（数据格式数组内嵌对象）
	function renderCalenderDetail( targetEl, data ) {
		//title part
		var detailTitleElement = document.createElement("div");
		detailTitleElement.classList.add("detailTitle");
		var calenderDetailWrapElement = document.createElement("div");
		calenderDetailWrapElement.classList.add("calenderDetailWrap");
		detailTitleData.forEach(function( el, i ) {
			var tempEl = document.createElement("div");
			tempEl.classList.add(el.className);
			tempEl.innerHTML = el.text;
			detailTitleElement.appendChild(tempEl);
		});
		calenderDetailWrapElement.appendChild(detailTitleElement);

		//content part
		data.forEach(function( el, i ) {
			if( i === currentCalenderIndex ){
				el.data.forEach(function( el, i ) {
					var detailContentElement = document.createElement("div");
					detailContentElement.classList.add("detailContent");
					for( var index in el ){
						var tempEl = document.createElement("div");
						tempEl.classList.add(index);
						if( index === "country" || index === "important" ){
							var img = document.createElement("img");
							img.src = el[index];
							tempEl.appendChild(img);
						}else{
							tempEl.innerHTML = el[index];
						}
						detailContentElement.appendChild(tempEl);
					}
					calenderDetailWrapElement.appendChild(detailContentElement);
				});
			}
		});


		targetEl.appendChild(calenderDetailWrapElement);
	}

	

	// util function
	function addZero( num ) {
		return num > 9 ? num : "0" + num;
	}

	function judgeWeek( getDay ) {
		var weeks = getDay;
		switch( weeks ){
			case 0:
			weeks = "日";
			break;
			case 1:
			weeks = "一";
			break;
			case 2:
			weeks = "二";
			break;
			case 3:
			weeks = "三";
			break;
			case 4:
			weeks = "四";
			break;
			case 5:
			weeks = "五";
			break;
			case 6:
			weeks = "六";
			break;
		}
		return weeks;
	}


}