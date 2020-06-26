const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isFunction = function (handle) {
  return typeof handle === 'function'
}

class myPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('handle is not a function')
    }
    this._status = PENDING
    this._value = undefined
    this._fulfilledQueues = []
    this._rejectedQueues = []
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }

  // 添加resovle时执行的函数
  _resolve (val) {
    const run = () => {
      if (this._status !== PENDING) return
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof myPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFulfilled(val)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }

  // 添加reject时执行的函数
  _reject (err) { 
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }


  then (onFulfilled, onRejected) {
    const { _status, _value } = this
    return new myPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res =  onFulfilled(value);
            if (res instanceof myPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
              let res = onRejected(error);
              if (res instanceof myPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }

      switch (_status) {
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break;
        case FULFILLED:
          fulfilled(_value)
          break;
        case REJECTED:
          rejected(_value)
          break;
      }
    })
  }

  // 添加catch方法
  catch (onRejecteded) {
    // debugger
    return this.then(undefined, onRejecteded)
  }

  // 添加静态resolve方法
  static resolve (value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof myPromise) return value
    return new myPromise(resolve => resolve(value))
  }

  // 添加静态reject方法
  static reject (value) {
    return new myPromise((resolve ,reject) => reject(value))
  }

  // 添加静态all方法
  static all (list) {
    return new myPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }

  // 添加静态race方法
  static race (list) {
    return new myPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  finally (cb) {
    return this.then(
      value  => myPromise.resolve(cb()).then(() => value),
      reason => myPromise.resolve(cb()).then(() => { throw reason })
    );
  };

}

const p1 = new myPromise((resolve, reject) => {
  resolve('p1')
})

const p2 = new myPromise((resolve, reject) => {
  reject('p2')
})

const pall = myPromise.race([p1, p2])

pall.then(res => {
  console.log(res)
}).finally(res => {
  console.log(res)
})
