// 防抖 delay可以给默认值this.debouce(this.函数名,3000)() this.debouce(this.函数名.bind(this),3000)()
export function debouce(func, delay = 50) {
    console.log(func);
    console.log(delay);
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export function formatDate(date, fmt) {
    //   1.获取年份
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    // 2.获取
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};
export const url = "http://lotus.mgtx-tech-dev.mgtx.com.cn/"

export function screenHeight(num) {
    let h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    return h - num;
}
//防抖函数
export function debounce (func, wait, immediate = true) {
    let timeout
    return function () {
      if (timeout) clearTimeout(timeout)
      if (immediate) {
        var callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(this, arguments)
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait)
      }
    }
  }