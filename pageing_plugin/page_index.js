var pageSet = function(sum, now) {
    var pageSum = sum,
    pageNow = now;
    if (pageSum < pageNow) {
        console.log("%c总页数应该比当前页数大!", "color:red");
        return false;
    }
    var fsy_page_plugin = document.createElement("div");
    fsy_page_plugin.id = "fsy_page_plugin";
    var last_num = null;
    var pages = document.createElement("div");
    //上一页按钮
    var prev_page = document.createElement("span");
    prev_page.className = "l_btn";
    prev_page.innerHTML = "上一页";
    //下一页按钮
    var next_page = document.createElement("span");
    next_page.className = "r_btn";
    next_page.innerHTML = "下一页";
    //...
    var points = document.createElement("a");
    points.innerHTML = "...";
    //...前面的
    var prev_points = document.createElement("a");
    prev_points.innerHTML = "...";
    //第一页
    var first_page = document.createElement("a");
    first_page.className = "page";
    first_page.innerHTML = "1";
    //最后一页
    var last_page = document.createElement("a");
    last_page.className = "page";
    last_page.innerHTML = pageSum;
    //生成页的span
    function main(start, end) {
        for (var i = start; i < end; i++) {
            var page = document.createElement("a");
            page.className = "page";
            page.innerHTML = (i + 1);
            pages.appendChild(page);
            (pageNow === (i + 1)) && (page.className += " pageNow");
        }
    }

    function page_init() {
        if (pages.children.lenth !== 0) {
            for (var i = 0, len = pages.children.length; i < len; i++) {
                pages.children[0].parentNode.removeChild(pages.children[0]);
            }
        }
        if (fsy_page_plugin.children.length !== 0) {
            for (var i = 0, len = fsy_page_plugin.children.length; i < len; i++) {
                fsy_page_plugin.children[0].parentNode.removeChild(fsy_page_plugin.children[0]);
            }
        }
        if (pageSum < 8 && pageSum > 0) {
            var page_last = document.createElement("a");
            page_last.className = "page";
            page_last.innerHTML = "第" + pageSum + "页";
            main(0, pageSum);
        } else if (pageSum >= 8) {
            if (pageNow < 6) {
                if (pageSum > 9) {
                    main(0, 7);
                    pages.appendChild(points);
                    pages.appendChild(last_page);
                } else if (pageSum == 8 || pageSum == 9) {
                    main(0, pageSum);
                }
            } else if (pageNow >= 6 && pageNow != pageSum) {
                if (pageSum > 9) {
                    pages.appendChild(first_page);
                    pages.appendChild(prev_points);
                    if ((pageSum - pageNow) > 4) {
                        main((pageNow - 3), (pageNow + 2));
                        pages.appendChild(points);
                        pages.appendChild(last_page);
                    } else {
                        last_num == null ? (last_num = pageSum - 7) : last_num = last_num;
                        main(last_num, pageSum);
                    }
                } else if (pageSum == 8 || pageSum == 9) {
                    main(0, pageSum);
                }
            } else if (pageNow == pageSum) {
                pages.appendChild(first_page);
                if (pageSum > 9) {
                    pages.appendChild(points);
                }
                console.log(pageSum);
                (pageSum === 10) &&  main((pageSum - 7), pageSum);
                (pageSum === 9) &&  main((pageSum - 8), pageSum);
            }
        } else {
            alert('不能为负数');
        }
        ( sum !== 1 ) && fsy_page_plugin.appendChild(prev_page);
        fsy_page_plugin.appendChild(pages);
        ( sum !== 1 ) && fsy_page_plugin.appendChild(next_page);
        var page = pages.children;
        for (var i = 0; i < page.length; i++) {
            (function(index) {
                page[index].onclick = function() {
                    var click_index = parseInt(this.innerHTML.match(/\d/g).join(""), 10);
                    console.log(click_index);
                    if (click_index !== 1 && click_index !== pageSum) {
                        l_btn.classList.remove("btn_font_color");
                        r_btn.classList.remove("btn_font_color");
                    }
                    if (click_index === 1) {
                        l_btn.classList.add("btn_font_color");
                        r_btn.classList.remove("btn_font_color");
                    }
                    if (click_index === pageSum) {
                        r_btn.classList.add("btn_font_color");
                        l_btn.classList.remove("btn_font_color");
                    }
                    pageNow = click_index;
                    page_init();
                };
            })(i);
        }
    }
    page_init();
    //切换按钮
    var l_btn = prev_page,
    r_btn = next_page;
    l_btn.classList.add("btn_font_color");
    r_btn.onclick = function() {
        if( pageNow === pageSum ){
            return false;
        }
        pageNow++;
        if( pageNow >= pageSum ){
            pageNow = pageSum;
            this.classList.remove("btn_hover");
            this.classList.add("btn_font_color"); 
        }
        l_btn.classList.contains("btn_font_color") &&  l_btn.classList.remove("btn_font_color");
        page_init();
        console.log(pageNow);
    };
    r_btn.onmouseover = function() {
        (pageNow != pageSum) && (this.classList.add("btn_hover"));
    };
    r_btn.onmouseout = function() {
        this.classList.remove("btn_hover");
    };
    l_btn.onclick = function() {
        if( pageNow === 1 ){
            return false;
        }
        pageNow--;
        if( pageNow <= 1 ){
            pageNow = 1;
            this.classList.remove("btn_hover");
            this.classList.add("btn_font_color");
        }
        r_btn.classList.contains("btn_font_color") &&  r_btn.classList.remove("btn_font_color");
        page_init();
        console.log(pageNow);
    };
    l_btn.onmouseover = function() {
        (pageNow != 1) && (this.classList.add("btn_hover"));
    };
    l_btn.onmouseout = function() {
        this.classList.remove("btn_hover");
    };
    return fsy_page_plugin;
};
