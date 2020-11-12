// getDate(Date.parse(new Date()));
export function getDate(time, tomorrow, shi, fen) {
    let formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    };
    let dd = new Date(time);
    let y = dd.getFullYear();
    let m = formatNumber(dd.getMonth() + 1);
    if (tomorrow == 1 || tomorrow == 0) {
        console.log('明天');
        var h = shi
        var mm = fen
        var d = formatNumber(dd.getDate()) + Number(tomorrow)
    } else {
        var d = formatNumber(dd.getDate());
        var h = formatNumber(dd.getHours());
        var mm = formatNumber(dd.getMinutes());
    }
    let ss = formatNumber(dd.getSeconds());
    let newD = y + '-' + m + '-' + d + ' ' + h + ':' + mm
    return newD;
}
//获取当前的时间时和分
export function getHours(time) {
    let formatNumber = function (n) {
        return n < 10 ? "0" + n : n;
    };
    let dd = new Date(time);
    let y = dd.getFullYear();
    let m = formatNumber(dd.getMonth() + 1);
    var d = formatNumber(dd.getDate());
    var h = formatNumber(dd.getHours());
    var mm = formatNumber(dd.getMinutes());
    let ss = formatNumber(dd.getSeconds());
    let newD = h + ':' + mm + ':' + ss
    return newD;
}



//判断是否在时间范围内
export function timeRrange(beginTime, endTime) {
    var strb = beginTime.split(":")
    console.log(strb.length);
    if (strb.length !== 3) {
        console.log('ASA');
        return false;
    }
    var stre = endTime.split(":");
    if (stre.length !== 3) {
        return false;
    }
    var b = new Date();
    var e = new Date();
    var n = new Date();
    b.setHours(strb[0]);//开始时间
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);//结束时间
    e.setMinutes(stre[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        return false;

    }
}
//判断距离
export function getDistance(lng1, lat1, lng2, lat2) {
    console.log(lng1);
    console.log(lat1);
    console.log(lng2);
    console.log(lat2);
    var EARTH_RADIUS = 6378.137; //地球半径  
    //将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
    function rad(d) {
        return d * Math.PI / 180.0;
    }
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = parseInt(Math.round(s * 10000) / 10000);
    console.log(s);
    return s;
}  
