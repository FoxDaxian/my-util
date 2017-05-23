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
		console.log(lastDate);
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
			sevenDay.innerHTML = "";
			date = new Date(data.year + "-" + data.month + "-" + parseInt(data.day));
			sevenDayRender();
			calenderBox.style.display = "none";

			miniCalender.innerHTML = data.year + "年" + addZero(data.month) + "月" + addZero(data.day) + "日";

			calender.now = parseInt(data.day);
			calender.month = parseInt(data.month - 1);
			calender.year = parseInt(data.year);
			calender.selectMonth = parseInt(data.month - 1);
			calender.selectYear = parseInt(data.year);
			calenderBox.innerHTML = calender.render().el.outerHTML;

			lastDate = {
				year:parseInt(data.year),
				month:parseInt(data.month - 1),
			};
			return data;
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





	//sevenDay
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

			//这里重设的，从这里入手
			calender.now = parseInt(ev.target.dataset.day);
			calender.month = parseInt(ev.target.dataset.month - 1);
			calender.year = parseInt(ev.target.dataset.year);
			calender.firstDay = (new Date( calender.year,calender.month,1 )).getDay();

			lastDate = {
				year:calender.year,
				month:calender.month,
			};

			calenderBox.innerHTML = calender.render().el.outerHTML;
		}
		// console.log(date);
	}





	// util function
	function addZero( num ) {
		return num > 9 ? num : "0" + num;
	}



}