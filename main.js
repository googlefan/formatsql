$(function(){
  $("p").click(function(){
    $(this).hide();
  });
  $("#fb").click(function(){
    var sqlinStr = $("#sqlin").val();
    sqlinArr = sqlinStr.split("VALUES");
    var sql = sqlinArr[0];
    var value =sqlinArr[1];
    sqlArr = sql.split(",");
    valArr = value.split(",");
    valArr[0] = "VALUES" + valArr[0];
    for (i =0; i < sqlArr.length;i++) {
      sqlArr[i] = sqlArr[i].trim();
      valArr[i] = valArr[i].trim();
      if (sqlArr[i].length > valArr[i].length){
        valArr[i] = addleftwhite(valArr[i],sqlArr[i].length - valArr[i].length);
        // valArr[i] = addleftwhite(valArr[i],getStringLengthForChinese(sqlArr[i])- getStringLengthForChinese(valArr[i]));
      } else {
        sqlArr[i] = addleftwhite(sqlArr[i],valArr[i].length - sqlArr[i].length);
        // sqlArr[i] = addleftwhite(sqlArr[i],getStringLengthForChinese(valArr[i])- getStringLengthForChinese(sqlArr[i]));
      }
    }
    $("#sqlout").val(sqlArr + "\n" + valArr);
  });
});

function addleftwhite(str,length){
  var white = "";
  for (var i = 0;i<length ;i++) {
    white = white + " ";
  }
  return white+str;
}

/**
 * 获取字符串的特殊长度，一个汉字算单位一个长度，两个数字或字符算一个单位长度
 * @param val
 * @returns
 */
function getStringLengthForChinese(val) {
	var str = new String(val);
	var bytesCount = 0;
	for (var i = 0 ,n = str.length; i < n; i++) {
		var c = str.charCodeAt(i);
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
			bytesCount += 1;
		} else {
			bytesCount += 2;
		}
	}
	return (bytesCount/2).toFixed(0);
}