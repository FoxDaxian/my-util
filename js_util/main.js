/**
 * 截取字符串出省略号
 * @param  {string} str   要截取的字符串
 * @param  {number} limit 要截取的长度    
 * @return {string}       截取好的字符串
 */
function limitLength(str, limit) {
    var i = 0,
        len = str.trim().length,
        tempLen = 0,
        res = null,
        s;
    for (; i < len; i++) {
        s = str.charCodeAt(i);
        tempLen += (s >= 0 && s <= 128) ? 1 : 2;

        if (tempLen >= limit) {
            res = str.slice(0, i) + "...";
            break;
        }

    }
    return res !== null ? res : str;
}

/**
 * 柯粒化函数，用法：~~fn(10)(100)
 * @param  {Number}   num 计算的数
 * @return {Number}     结果咯
 */
function fn(num) {
    num += ~~fn.num;
    fn.num = num;
    return fn;
}
fn.valueOf = fn.toString = function() {
    return fn.num;
}


//获取域名主机(host)
function getHost(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url) {
        url = window.location.href;
    }
    //匹配xxx://这里的内容，直到遇到第一/
    var regex = /^\w+\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    console.log(match);
    if (typeof match != "undefined" && null != match) {
        host = match[1];
    }
    return host;
}

//转译html标签
function htmlEncode(text) {
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g,
        '&lt;').replace(/>/g, '&gt;');
}

//反转译html标签
function htmlDecode(text) {
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(
        /&lt;/g, '<').replace(/&gt;/g, '>');
}

//判断滚动条是否到底部的几个函数
// 可视区高度
function getWindowHeight() {
    let windowHeight = 0
    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
    } else {
        windowHeight = document.body.clientHeight
    }
    return windowHeight
}

//滚动加上可视区总高度
function getScrollHeight() {
    let scrollHeight = 0
    let bodyScrollHeight = 0
    let documentScrollHeight = 0
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
    return scrollHeight
}

//当前滚动高度
function getScrollTop() {
    let scrollTop = 0
    let bodyScrollTop = 0
    let documentScrollTop = 0
    if (document.body) {
        bodyScrollTop = document.body.scrollTop
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
    return scrollTop
}

// 判断函数
function scrollFn() {
    if (getScrollTop() + getWindowHeight() + 50 >= getScrollHeight()) {
        this.footerSwitch = true
    } else {
        this.footerSwitch = false
    }
}

//去除html标签
function clearTag(str) {
    return str.replace(/<[^>]+>/g, "")
}

//textarea 自适应高度
/**
 * textarea 自适应高度 不出现滚动条
 * @param  {HTMLElement} elem      textarea元素
 * @param  {Number} extra     设置光标与输入框保持的距离（默认为0）
 * @param  {Number} maxHeight 设置最大高度，可选
 * @return {none}           无返回值
 */
function autoTextarea(elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function(type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function(name) {
            var val = elem.currentStyle[name];
            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };
            return val;
        } : function(name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'none';
    var change = function() {
        var scrollTop, height,
            padding = 0,
            style = elem.style;
        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
}

/**
 * 用来复制input/textarea中的内容
 * @param  {HTMLElement} element input/textarea元素
 * @return {none}         无返回值
 * 需要的时候去擦插画execComand的一系列操作:http://blog.csdn.net/kntao/article/details/4543123
 * 元素上使用readonly，不要使用disabled
 */
function copyFn(element) {
    element.select()
    //execCommand 有很多操作
    document.execCommand("Copy")
    alert('复制成功')
}

/**
 * url上添加动画
 * @return {[type]} [description]
 */
function urlAnimation() {
    ~function() {
        var round = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'],
        i = 0, 
        len = round.length;
        setInterval(function() {
            history.replaceState({}, '', '#' + round[i % len]); i++;
        }, 120);
    }();
}

/**
 * 检测浏览器类型终极大法
 */
function BrowserType () {
    const userAgent = navigator.userAgent //取得浏览器的userAgent字符串 
    const isOpera = userAgent.indexOf('Opera') > -1 //判断是否Opera浏览器 
    // //判断是否IE浏览器 
    const isIE = window.ActiveXObject || 'ActiveXObject' in window
    const isEdge = userAgent.indexOf('Edge') > -1 //判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf('Firefox') > -1 //判断是否Firefox浏览器 
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1 //判断是否Safari浏览器 
    const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && !isEdge //判断Chrome浏览器

    if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        const fIEVersion = parseFloat(RegExp.$1)
        if (userAgent.indexOf('MSIE 6.0') !== -1) {
            return 'IE6'
        } else if (fIEVersion === 7) {
            return 'IE7'
        } else if (fIEVersion === 8) {
            return 'IE8'
        } else if (fIEVersion === 9) {
            return 'IE9'
        } else if (fIEVersion === 10) {
            return 'IE10'
        } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
            return 'IE11'
        }
        //IE版本过低
        return '0'
    }

    if (isFF) {
        return 'FF'
    }
    if (isOpera) {
        return 'Opera'
    }
    if (isSafari) {
        return 'Safari'
    }
    if (isChrome) {
        return 'Chrome'
    }
    if (isEdge) {
        return 'Edge'
    }
}
