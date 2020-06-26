/**
 * 实现一个lazyMan, 支持链式调用一些动作
 */

class lazyMan {

  constructor (name) {
    this.eventQueue = []
    this.name = name
    this.eventQueue.push(() => {
      console.log(`Hi my name is ${this.name}`)
      this.next()
    })
    setTimeout(()=>{
      this.next()
    },0)
  }

  next () {
    let fn = this.eventQueue.shift()
    fn && fn()
  }

  sleep (time) {
    this.eventQueue.push(() => {
      setTimeout(() => {
        console.log(`weak up after ${time} s`)
        this.next()
      }, time * 1000)
    })
    return this
  }

  eat (food) {
    this.eventQueue.push(() => {
      console.log(`eat ${food}`)
      this.next()
    })
    return this
  }
}

const pp = new lazyMan('lzc')

pp.sleep(1).eat('ff').sleep(2).sleep(3).eat('apple')