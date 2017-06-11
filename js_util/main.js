/**
 * 截取字符串出省略号
 * @param  {string} str   要截取的字符串
 * @param  {number} limit 要截取的长度	
 * @return {string}       截取好的字符串
 */
 function limitLength( str, limit ) {
 	var i = 0,
 	len = str.trim().length,
 	tempLen = 0,
 	res = null,
 	s;
 	for( ; i < len; i++ ){
 		s = str.charCodeAt(i);
 		tempLen += (s >= 0 && s <= 128) ? 1 : 2;

 		if( tempLen >= limit ){
 			res = str.slice(0,i) + "...";
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
 function fn( num ) {
 	num += ~~fn.num; 
 	fn.num = num;
 	return fn;
 }
 fn.valueOf = fn.toString = function() {
 	return fn.num;
 }