var calender = (function() {
	function resFn() {
		this.d = new Date();
		this.year = this.d.getFullYear();
		this.month = this.d.getMonth();
		this.monthArr = resFn.monthArr(resFn.isLeap(this.year));
		this.firstDay = resFn.getFirstDayWeek(this.year,this.month);
		this.now = this.d.getDate();
	}
	//工具方法
	resFn.isLeap = function( year ) {
		return (year % 100 === 0) ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0);
	};

	resFn.monthArr = function(year) {
		return [ 31,28 + year,31,30,31,30,31,31,30,31,30,31];
	};

	//获取这个月一号是周几
	resFn.getFirstDayWeek = function( year,month ) {
		return new Date( year,month,1 ).getDay();
	};

	resFn.getLastYearMonthArr = function( year ) {
		return [ 31,28 + resFn.isLeap(year),31,30,31,30,31,31,30,31,30,31];
	};
	resFn.prototype.productLis = function( year, firstDay, monthSum, month, now ) {
		var ul = document.createElement("ul"),
		i = 0,
		lastDayI = 0,
		nextDayI = 0,
		firstDay = firstDay === 0 ? 7 : firstDay,
		firstDayClone = firstDay - 1,len;
		ul.className = "cUl";
		len = 35,
		bothSidesArr = [0,6,7,13,14,20,21,27,28,34,35,41];
		switch(firstDay){
			case 5:
			if( this.monthArr[month] > 30 ){
				len = 42;
			}
			break;
			case 6:
			if( this.monthArr[month] > 29 ){
				len = 42;
			}
			break;
			case 7:
			if( this.monthArr[month] > 28 ){
				len = 42;
			}
			break;
		}

		for( ; i < len; i++ ){
			var li = document.createElement("li");
			bothSidesArr.forEach(function( el, bothSides ) {
				i === el && li.classList.add("bothSides");
			});
			if( i < firstDay ){
				li.innerHTML = month  === 0 ?  resFn.getLastYearMonthArr(year)[11] - (firstDayClone) :  monthSum[month - 1] - (firstDayClone);
				firstDayClone--;
				li.classList.add("otherMonth");
				if( this.firstDay === 0  ){
					li = false;
				}
			}
			if( i >= firstDay && i < monthSum[month] + firstDay ){
				li.innerHTML = ++lastDayI;
				li.classList.add("selectable");
				li.setAttribute("num",lastDayI);
				if( i === now + firstDay - 1 ){
					if( this.selectYear && (this.selectYear === this.year)){
						if( this.month === this.selectMonth ){
							li.classList.add("today");
						}
					}
					if( this.year === (new Date()).getFullYear()  ){
						if( this.selectMonth && (this.month === this.selectMonth) ){
							li.classList.add("today");
						}else{
							if( !this.selectMonth && this.month === (new Date()).getMonth() ){
								li.classList.add("today");
							}
						}
						
					}
				}
			}
			if( i >= monthSum[month] + firstDay ){
				li.innerHTML = ++nextDayI;
				li.classList.add("otherMonth");
			}
			!!li && ul.appendChild(li);
		}
		return ul;
	}
	resFn.prototype.render = function( btnVlue ) {
		if( !!btnVlue ){
			this.year = btnVlue.year;
			this.month = btnVlue.month;
			this.monthArr = resFn.monthArr(resFn.isLeap(this.year));
			this.firstDay = resFn.getFirstDayWeek(this.year,this.month);
		}
		var realMonth = this.month;
		//日历大容器
		var canenderWrap = document.createElement("div");
		canenderWrap.classList.add("canenderWrap");

		var closeBtn = document.createElement("div");
		closeBtn.classList.add("closeBtn");
		


		//最上面显示的标题时间
		var nowTimeTitle = document.createElement("div");
		nowTimeTitle.classList.add("nowTimeTitle");
		nowTimeTitle.innerHTML = this.year + "-" + (realMonth + 1 > 9 ? realMonth + 1 : ("0" + (realMonth + 1))) + "月";
		//按钮们

		var l_btn = document.createElement("div");
		l_btn.classList.add("l_btn");
		l_btn.innerHTML = (realMonth === 0 ? 12 : realMonth) > 9 ? (realMonth === 0 ? 12 : realMonth) + "月" : "0" + realMonth + "月";
		var r_btn = document.createElement("div");
		r_btn.classList.add("r_btn");
		r_btn.innerHTML = ((realMonth) === 11 ? 1 : (realMonth + 2)) > 9 ? (realMonth + 2) + "月" : "0" + ((realMonth) === 11 ? 1 : (realMonth + 2)) + "月";
		//包裹标题时间和按钮们的容器
		var title_btnsBox = document.createElement("div");
		title_btnsBox.classList.add("title_btnsBox");
		title_btnsBox.appendChild(l_btn);
		title_btnsBox.appendChild(r_btn);
		title_btnsBox.appendChild(nowTimeTitle);

		//日历主体内容对应周几
		var weekArr = ["日","一","二","三","四","五","六"];
		var weekBox = document.createElement("div");
		weekBox.classList.add("weekBox");
		weekArr.forEach(function( el, i ) {
			var temp = document.createElement("div");
			temp.classList.add("weekIndex");
			temp.innerHTML = el;
			weekBox.appendChild(temp);
		});

		canenderWrap.appendChild(closeBtn);
		canenderWrap.appendChild(title_btnsBox);
		canenderWrap.appendChild(weekBox);

		//日历的主体所有日子
		var lists = this.productLis( this.year,this.firstDay,this.monthArr,this.month,this.now );
		canenderWrap.appendChild(lists);
		return {
			el:canenderWrap,
			data:this
		};
	}
	return new resFn();
})();