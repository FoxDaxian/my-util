window.onload = function() {
	//calender show
	document.querySelector('.tabs .calender .showCalenderBtn span').onclick = function() {
		calenderBox.style.display = "block";
	}
	//calender
	var calenderBox = document.querySelector('.tabs .calender .showCalenderBtn .calenderBox');
	//init calender
	calenderBox.innerHTML = calender.render().el.outerHTML;
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
			return data;
		}

		if( ev.target.classList.contains("closeBtn")){
			calenderBox.style.display = "none";
		}

	}





	//sevenDay
	var sevenDay = document.querySelector('.tabs .calender .oneWeek .sevenDay'),
	prev_btn = document.querySelector('.tabs .calender .oneWeek .prev_btn'),
	next_btn = document.querySelector('.tabs .calender .oneWeek .next_btn'),
	date = new Date(),
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
			( date.getDay() >= 5 ) && ( i === 5 ) && (i = -4);
			( date.getDay() >= 6 ) && ( i === 6 ) && (i = -5);

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
				elementArr[tempDate.getDay()] = "<div class='day dayActive'>周" + weeks + " " + month + "/" + day + "</div>";
			}else{
				elementArr[tempDate.getDay()] = "<div class='day'>周" + weeks + " " + month + "/" + day + "</div>";
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






	// util function
	function addZero( num ) {
		return num > 9 ? num : "0" + num;
	}



}