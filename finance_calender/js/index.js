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
			sevenDayRender(data);
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
	
	sevenDayRender(Index)
	function sevenDayRender( index ) {
		weekArr.forEach(function( el, i ) {
			if( el === null ){
				return false;
			}
			var tempDate = (new Date(date.getTime() + i  * 24 * 60 * 60 * 1000 + index * 7  * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000)),

			year = tempDate.getFullYear(),
			month = addZero(tempDate.getMonth() + 1),
			day = addZero(tempDate.getDate());
			element = document.createElement("div");
			element.classList.add("day");
			if( date.getTime() === tempDate.getTime() ){
				element.classList.add("dayActive");
			}
			element.innerHTML = el + " " + month + "/" + day;
			sevenDay.appendChild(element);
			return {
				
			}
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