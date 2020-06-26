class eventEmiter {
  constructor () {
    this.eventLoop = {}
  }

  on (name, cb) {
    if (!this.eventLoop[name]) {
      this.eventLoop[name] = [cb]
    } else {
      this.eventLoop[name].push(cb)
    }
  }

  off (name, cb) {
    if (this.eventLoop[name]) {
      this.eventLoop[name] = this.eventLoop[name].filter(fn => {
        return fn !== cb
      })
    }
  }

  emit (name, ...arg) {
    if (this.eventLoop[name]) {
      this.eventLoop[name].forEach(fn => {
        fn.call(this, ...arg)
      })
    }
  }

  once (name, fn) {
    const onlyOnce = () => {
      fn.apply(this, arguments)
      this.off(name, onlyOnce)
    }

    this.on(name, onlyOnce)
    return this
  }
}

let event = new eventEmiter()
event.on('show', () => {
  console.log('on')
})

event.emit('show', '11111')