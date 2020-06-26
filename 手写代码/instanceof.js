function myInstanceof (left, right) {
  const proto = left.__proto__
  const protoType = right.prototype
  while (true) {
    if (proto !== protoType) {
      return false
    }
    if (proto === protoType) {
      return true
    }
    proto = proto.__proto__
  }
}

let obj = {}
console.log(myInstanceof(obj, Object))