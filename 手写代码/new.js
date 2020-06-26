class Parent {}

const obj = new Parent()


/**
 * new 的过程相当于下面
 */


const obj = {}
obj.__proto__ = Parent.prototype
let result = Parent.call(obj)
return typeof result === 'object' ? result : obj