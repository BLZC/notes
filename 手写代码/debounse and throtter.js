
/**
 * 
 * @param {Function} fn 执行函数 
 * @param {Number} wait 时间间隔
 * @param {Boolean} immediate 是否立即执行
 */
function debounce (fn, wait, immediate) {
  let timer = null

  return function () {
    let args = arguments, context = this
    if(!timer && immediate) {
        fn.apply(context, args)
    }
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 * 
 * @param {Function} fn 执行函数 
 * @param {Number} wait 时间间隔
 * @param {Boolean} immediate 是否立即执行
 */
function throttle (fn, wait, immediate) {
  let timer = null, runNow = immediate
  return function () {
    let args = arguments, context = this
    if(runNow) {
      fn.call(context, args)
      runNow =  false
    }

    if(!timer) {
      timer = setTimeout(() => {
        fn.call(context, args)
        clearTimeout(timer)
      }, wait)
    }
  }
} 
